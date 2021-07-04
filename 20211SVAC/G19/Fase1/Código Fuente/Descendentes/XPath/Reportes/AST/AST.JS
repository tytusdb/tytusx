class Tree {
    constructor() {
        this.auxNumbre = 1;
        this.auxString = "digraph G{\n ";
    }

    graph(treeNode) {
        if (treeNode.nodeNumber == 0) {
            treeNode.nodeNumber = this.auxNumber;
            this.auxNumber++;
        }
        treeNode.value = treeNode.value.toString();
        treeNode.value = treeNode.value.replace('"','');
        treeNode.value = treeNode.value.replace('"','');
        this.auxString += node.nodeNumber + '[label = "' + treeNode.value + '"];\n';
        treeNode.childList.forEach((child) => {
        this.auxString += treeNode.nodeNumber + "->" + this.auxNumber + ";\n";
        this.graph(child);
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
