class NodeDesc {
    constructor(value, type) {
        this.value = value;
        this.type = type;
        this.childList = [];
        this.nodeNumber = 0;
    }

    setChild(value) {
        this.childList.push(value);
    }
}