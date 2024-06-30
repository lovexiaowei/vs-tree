export default class Select {
  list = []
  store

  constructor (store) {
    this.store = store
  }

  addNode (node) {
    let has = this.list.findIndex(v => v.id === node.id)
    if (has === -1) {
      node.dom && node.dom.classList.add('selected')
      this.list.push(node)
    } else {
      node.dom && node.dom.classList.remove('selected')
      this.list.splice(has, 1)
    }
  }

  //在按住shift 之后，添加的数据
  shiftAdd (node, pre) {
    if (!this.list.length) {
      if (pre) {
        //如果有一个选中的数据
        this.list.push(pre)
      }
    }
    // debugger;
    //那么要求出当前和最后一次单击的那个对象,比较一次顺序
    let startIndex = this.store.nodes.findIndex(v => {
      return v.id === node.id
    })
    let endNode = this.list[this.list.length - 1]
    if (!endNode) return
    let endIndex = this.store.nodes.findIndex(v => {
      return v.id === endNode.id
    })
    this.list.push(node)
    this.clear()
    if (startIndex === -1 || endIndex === -1 || startIndex === endIndex) {
      return
    }

    for (let i = Math.min(startIndex, endIndex); i <= Math.max(endIndex, startIndex); i++) {
      let node = this.store.nodes[i]
      node.dom && node.dom.classList.add('selected')
      this.list.push(node)
    }
  }

  has (node) {
    let ids = this.dig(this.list)
    return ids.findIndex(v => v === node.id) > -1
  }

  moveTo (node) {

  }

  //获取真正要拖动的元素,在多选的时候，比如选择了 a 如果把a-1 也选择了，那么要去掉a-1;只认上级
  getTrueDrag () {
    let idsMapping = {};
    //先求出当前的多选包含的子集
    this.list.map(v => {
      if (v.childNodes&&v.childNodes.length){
        this.dig(v.childNodes).map(id=>{
          idsMapping[id]=1;
        });
      }
    });
    return  this.list.filter(v=>!idsMapping[v.id]);
  }

  //注意，这个dig 方法返回的是node.id ,并不是data.data.id ,这两个值是不一样的，node.id 是系统的一个自增主键。data.data.id 是用户的数据
  dig (nodes) {
    let son = []
    nodes.map(v => {
      son.push(v.id)
      if (v.childNodes && v.childNodes.length) {
        son.push(...this.dig(v.childNodes))
      }
    })
    return son
  }

  clear () {
    this.list.map(node => {
      node.dom && node.dom.classList.remove('selected')
    })
    this.list.length = 0
  }
}

