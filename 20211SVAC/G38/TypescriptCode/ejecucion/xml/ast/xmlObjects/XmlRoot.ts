class XmlRoot extends XmlElement{

    constructor(element: XmlObjectInt) {
        super(null, null , null, null , null , null, null);
        let childs:Array<XmlObjectInt>=[];
        childs.push(element);
        this.childs = childs ;
    }
}