class NodeDescXML {
    constructor(value, type) {
        this.value = value;
        this.type = type;
        this.childList = [];
    }

    setChild(value) {
        this.childList.push(value);
    }
}