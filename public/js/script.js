function openSideBar()
{
    document.getElementById("nav-menu").style.width = "250px";
}

function closeSideBar()
{
    document.getElementById("nav-menu").style.width = "0px";
}

var state=true;

document.getElementById("nav-menu-button").onclick = function() {sideBar(state)};

function sideBar(open)
{
    if(open)
    {
        document.getElementById("side-menu").style.width = "250px";
    }
    else
    {
        document.getElementById("side-menu").style.width = "0px";
    }
    state=!open;
}