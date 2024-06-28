export default class Select {
  list = []
  store

  constructor (store) {
    this.store = store
  }

  addNode (node) {
    let has = this.list.findIndex(v => v.id === node.id)
    if (has === -1) {
      node.dom&&node.dom.classList.add('selected')
      this.list.push(node)
    } else {
      node.dom&&node.dom.classList.remove('selected')
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
    });
    let endNode = this.list[this.list.length - 1];
    if (!endNode)return;
    let endIndex = this.store.nodes.findIndex(v => {
      return v.id === endNode.id
    });
    this.list.push(node);
    this.clear();
    if (startIndex === -1 || endIndex === -1 || startIndex === endIndex) {
      return
    }

    for (let i = Math.min(startIndex, endIndex); i <= Math.max(endIndex, startIndex); i++) {
      let node = this.store.nodes[i]
      node.dom&&node.dom.classList.add('selected')
      this.list.push(node)
    }
  }

  has(node){
    return this.list.findIndex(v=>v.id===node.id)>-1;
  }
  moveTo (node) {

  }

  clear () {
    this.list.map(node => {
      node.dom&&node.dom.classList.remove('selected')
    })
    this.list.length = 0
  }
}

