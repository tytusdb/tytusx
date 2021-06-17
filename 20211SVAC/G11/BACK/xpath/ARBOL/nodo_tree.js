class Node_tree {
    constructor(value, type) {
        this.id = 0;
        this.value = value;
        this.type = type;
        this.childs = [];
    }
    getvalue() {
        this.value;
    }
    gettype() {
        this.type
    }
    addChild(child) {
        this.childs.push(child);
    }
}

module.exports = Node_tree;