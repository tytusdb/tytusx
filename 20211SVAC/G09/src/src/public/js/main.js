var abriendoTabEditor = true;
var abriendoTabEditor4D = true;
var toggler = document.getElementsByClassName("caret");
for (i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
    });
}

function openTab(evt, tabname) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabname).style.display = "block";
    evt.currentTarget.className += " active";
}

function openTabEditor(evt, tabname) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabEditor");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabname).style.display = "block";
    evt.currentTarget.className += " active";
    if (abriendoTabEditor && tabname.toLowerCase() == "doside") {
        //editorActual.setValue(editorActual.getValue());
        setTimeout(function() {
            editor.refresh();
        }, 1);
        abriendoTabEditor = false;
    } else if (abriendoTabEditor4D && tabname.toLowerCase() == "cuadruplos") {
        //editorActual.setValue(editorActual.getValue());
        setTimeout(function() {
            editor4D.refresh();
        }, 1);
        abriendoTabEditor4D = false;
    }

    if (tabname.toLowerCase() == "doside") {
        document.getElementById('buttonTranslate').style.display = "unset"
    } else if (tabname.toLowerCase() == "cuadruplos") {
        document.getElementById('buttonTranslate').style.display = "none";
    }
}