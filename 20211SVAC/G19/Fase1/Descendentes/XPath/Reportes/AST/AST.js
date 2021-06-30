class TreeXPathDesc {
    constructor() {
        this.auxNumber = 1;
        this.auxString = "digraph G{\n ";
    }

    graphXPathDescendente(treeNode) {

        if (treeNode.nodeNumber == 0) {
            treeNode.nodeNumber = this.auxNumber;
            this.auxNumber++;
        }

        treeNode.value = treeNode.value.toString();
        treeNode.value = treeNode.value.replace('"', '');
        treeNode.value = treeNode.value.replace('"', '');
        this.auxString += treeNode.nodeNumber + '[label = "' + treeNode.value + '"];\n';
        treeNode.childList.forEach((child) => {
            this.auxString += treeNode.nodeNumber + "->" + this.auxNumber + ";\n";
            this.graphXPathDescendente(child);
        });
        this.auxString = this.auxString.replace("undefined", "");
        return this.auxString;
    }


    rasverse(treeNode) {
        treeNode.childList.forEach((child) => {
            this.trasverse(child);
        });
    }
}