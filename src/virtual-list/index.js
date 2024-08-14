/**
 * virtual list default component
 */

import Virtual from './virtual'

export default class Vlist {
  constructor (opts) {
    this.range = null

    this.$el = opts.root

    this.$el.style.maxHeight = typeof opts.maxHeight === 'number' ? opts.maxHeight + 'px' : opts.maxHeight
    this.$el.style.minHeight = typeof opts.minHeight === 'number' ? opts.minHeight + 'px' : opts.minHeight
    this.$el.style.overflowY = 'auto'

    this.dataSources = opts.data

    this.wrapper = document.createElement('div')
    this.wrapper.className = 'vs-virtual-list'
    this.$el.appendChild(this.wrapper)

    this.$el.addEventListener('scroll', this.onScroll.bind(this), {
      passive: false
    })

    this.keeps = opts.keeps || 20

    this.estimateSize = opts.estimateSize || 26

    this.dataKey = 'id'
    this.installVirtual()
  }

  // return current scroll offset
  getOffset () {
    const root = this.$el
    return root ? Math.ceil(root.scrollTop) : 0
  }

  // return client viewport size
  getClientSize () {
    const root = this.$el
    return root ? Math.ceil(root.clientHeight) : 0
  }

  // return all scroll size
  getScrollSize () {
    const root = this.$el
    return root ? Math.ceil(root.scrollHeight) : 0
  }

  // set current scroll position to a expectant index
  scrollToIndex (index) {
    // scroll to bottom
    if (index >= this.dataSources.length - 1) {
      this.scrollToBottom()
    } else {
      const offset = this.virtual.getOffset(index)
      this.scrollToOffset(offset)
    }
  }

  scrollToNode (node) {
    if (!node) return
    let index = this.dataSources.findIndex(v => node === v)
    if (index === -1) {
      //如果是-1，表示没有获取到，此时表示这个node没有显示，比如在
      let p = []
      let tmp = node
      for (let i = 0; i <= 20; i++) {
        //这里使用循环，假设最多有20级
        if (tmp.parent) {
          tmp = tmp.parent
          if (tmp.data._vsroot) break
          p.unshift(tmp)
        } else {
          break
        }
      }
      p.map(v => v.setExpand(true))
      index = this.dataSources.findIndex(v => node === v)
      if (index === -1) return
      setTimeout(()=>{
        this.scrollToOffset(index * this.estimateSize);
      },70);
    } else {
      setTimeout(()=>{
        this.scrollToOffset(index * this.estimateSize)
      },50);
    }
    return true
  }

  scrollToBottom () {
    let dom = this.$el
    if (!dom) return
    const offset = dom.scrollTop
    this.scrollToOffset(offset)

    // check if it's really scrolled to the bottom
    // maybe list doesn't render and calculate to last range
    // so we need retry in next event loop until it really at bottom
    setTimeout(() => {
      if (this.getOffset() + this.getClientSize() + 1 < this.getScrollSize()) {
        this.scrollToBottom()
      }
    }, 3)
  }

  scrollToOffset (offset) {
    if (this.pageMode) {
      document.body[this.directionKey] = offset
      document.documentElement[this.directionKey] = offset
    } else {
      let root = this.$el
      if (!root) return
      root.scrollTop = offset
    }
  }

  // reset all state back to initial
  reset () {
    this.virtual.destroy()
    this.scrollToOffset(0)
    this.installVirtual()
  }

  // ----------- public method end -----------

  installVirtual () {
    this.virtual = new Virtual({
      slotHeaderSize: 0,
      slotFooterSize: 0,
      keeps: this.keeps,
      estimateSize: this.estimateSize,
      buffer: Math.round(this.keeps / 3), // recommend for a third of keeps
      uniqueIds: this.getUniqueIdFromDataSources()
    }, this.onRangeChanged.bind(this))

    // sync initial range
    this.range = this.virtual.getRange()
    this.render()
  }

  getUniqueIdFromDataSources () {
    const { dataKey } = this
    return this.dataSources.map((dataSource) => typeof dataKey === 'function' ? dataKey(dataSource) : dataSource[dataKey])
  }

  // here is the rerendering entry
  onRangeChanged (range) {
    this.range = range
    this.render()
  }

  onScroll () {
    const offset = this.getOffset()
    const clientSize = this.getClientSize()
    const scrollSize = this.getScrollSize()
    //iOS scroll-spring-back behavior will make direction mistake
    if (offset < 0 || (offset + clientSize > scrollSize + 1) || !scrollSize) {
      return
    }

    this.virtual.handleScroll(offset)
  }

  getRenderSlots () {
    const { start, end } = this.range
    const { dataSources, dataKey } = this
    this.wrapper.innerHTML = ''
    for (let index = start; index <= end; index++) {
      const dataSource = dataSources[index]
      if (dataSource) {
        const uniqueKey = typeof dataKey === 'function' ? dataKey(dataSource) : dataSource[dataKey]
        if (typeof uniqueKey === 'string' || typeof uniqueKey === 'number') {
          const dom = dataSource.createNode()
          if (dataSource.store.onlySearchLeaf) {
            dom.classList.add('vs-search-only-leaf')
          } else {
            dom.classList.remove('vs-search-only-leaf')
          }

          if (dataSource.store.isSearch && dataSource.store.searchRender) {
            const searchNode = dataSource.store.searchRender(dataSource, dom.cloneNode(true))
            if (!(searchNode instanceof HTMLElement)) {
              throw Error('searchRender must return HTMLElement')
            }
            this.wrapper.appendChild(searchNode)
          } else {
            this.wrapper.appendChild(dom)
          }
        } else {
          console.warn(`Cannot get the data-key '${dataKey}' from data-sources.`)
        }
      } else {
        console.warn(`Cannot get the index '${index}' from data-sources.`)
      }
    }
  }

  update (data) {
    this.dataSources = data
    this.wrapper.innerHTML = ''
    this.virtual.updateParam('uniqueIds', this.getUniqueIdFromDataSources())
    this.virtual.handleDataSourcesChange()
  }

  render () {
    const { padFront, padBehind } = this.range

    const paddingStyle = `${padFront}px 0px ${padBehind}px`

    this.wrapper.style.padding = paddingStyle

    this.getRenderSlots()
  }
}
