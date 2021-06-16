"use strict";
class XmlRoot extends XmlElement {
    constructor(element) {
        super(null, null, null, null, null, null, null);
        let childs = [];
        childs.push(element);
        this.childs = childs;
    }
}
