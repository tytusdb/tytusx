var id_n = 1;
class Tree_tour {
    constructor() {

    }

    tour(node) {
        var concat = '';

        if (node.id == 0) {
            node.id = id_n;
            id_n++;
        }

        if (node.value.includes('"')) {
            var aux = node.value.replace(/"/gi, '');
            concat += node.id + '[label="' + aux + '" fillcolor="#ad85e4" shape="circle"];\n';
        } else {
            concat += node.id + '[label="' + node.value + '" fillcolor="#ad85e4" shape="circle"];\n';
        }

        node.childs.forEach(element => {
            concat += node.id + '->' + id_n + ';\n';
            concat += this.tour(element);
        });

        return concat;
    }
}

module.exports = Tree_tour;