/*=========================================================
    LabSphere Documentation Script
    Version 2.0
=========================================================*/

const frame = document.getElementById("page_frame");

/*==========================================
      OPEN DEFAULT PAGE
==========================================*/

window.onload = function () {

    if (frame && frame.getAttribute("src") === "") {

        frame.src = "Shell_Program_1.html";

    }

    initializeTree();

};

/*==========================================
      CHANGE PAGE
==========================================*/

function changeFrame(page){

    if(!frame) return;

    frame.style.opacity = "0";

    setTimeout(function(){

        frame.src = page;

        highlightCurrent(page);

    },150);

}

/*==========================================
      AFTER PAGE LOAD
==========================================*/

frame.addEventListener("load",function(){

    frame.style.opacity="1";

});

/*==========================================
      INITIALIZE TREE
==========================================*/

function initializeTree(){

    document.querySelectorAll(".subtree").forEach(function(tree){

        tree.style.display="block";

    });

}

/*==========================================
      TOGGLE SUBTREE
==========================================*/

function toggleSubTree(button){

    let subtree = button.parentElement.nextElementSibling;

    if(!subtree) return;

    if(subtree.style.display==="none"){

        subtree.style.display="block";

        button.innerHTML="-";

    }

    else{

        subtree.style.display="none";

        button.innerHTML="+";

    }

}

/*==========================================
      EXPAND ALL
==========================================*/

function expandAllSubtrees(){

    document.querySelectorAll(".subtree").forEach(function(tree){

        tree.style.display="block";

    });

    document.querySelectorAll("li>button").forEach(function(btn){

        btn.innerHTML="-";

    });

}

/*==========================================
      COLLAPSE ALL
==========================================*/

function collapseAllSubtrees(){

    document.querySelectorAll(".subtree").forEach(function(tree){

        tree.style.display="none";

    });

    document.querySelectorAll("li>button").forEach(function(btn){

        btn.innerHTML="+";

    });

}

/*==========================================
      ACTIVE LINK
==========================================*/

function highlightCurrent(page){

    document.querySelectorAll(".tree a").forEach(function(link){

        link.classList.remove("active");

    });

    document.querySelectorAll(".tree a").forEach(function(link){

        let onclick = link.getAttribute("onclick");

        if(onclick && onclick.includes(page)){

            link.classList.add("active");

            expandParents(link);

        }

    });

}

/*==========================================
      EXPAND PARENT TREE
==========================================*/

function expandParents(link){

    let current = link.parentElement;

    while(current){

        let previous = current.previousElementSibling;

        if(previous && previous.tagName==="LI"){

            let btn = previous.querySelector("button");

            if(btn){

                btn.innerHTML="-";

            }

        }

        if(current.classList && current.classList.contains("subtree")){

            current.style.display="block";

        }

        current = current.parentElement;

    }

}

/*==========================================
      KEYBOARD SHORTCUTS
==========================================*/

document.addEventListener("keydown",function(e){

    if(e.ctrlKey && e.key==="ArrowRight"){

        expandAllSubtrees();

    }

    if(e.ctrlKey && e.key==="ArrowLeft"){

        collapseAllSubtrees();

    }

});

/*==========================================
      SMOOTH SIDEBAR SCROLL
==========================================*/

document.querySelectorAll(".tree a").forEach(function(link){

    link.addEventListener("click",function(){

        setTimeout(function(){

            link.scrollIntoView({

                behavior:"smooth",

                block:"nearest"

            });

        },200);

    });

});

/*==========================================
      IFRAME TRANSITION
==========================================*/

if(frame){

    frame.style.transition="opacity .25s ease";

    frame.style.opacity="1";

}