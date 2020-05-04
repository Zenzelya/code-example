'use strict'

const uContainer = document.getElementById("pusher");
const uContainerClone = uContainer.cloneNode(false);
uContainerClone.removeAttribute("id");
uContainerClone.classList.add('d-n', 'empty-menu-box');
uContainerClone.setAttribute("style", "visibility: hidden;");
document.body.insertBefore(uContainerClone, document.getElementById("pusher"));
let uContainerPosition = uContainer.offsetTop;


export default window.addEventListener("scroll", function () {
    let scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollPos >= uContainerPosition) {
        uContainer.setAttribute("style", "position: fixed;");
        uContainerClone.classList.remove('d-n')
    } else {
        uContainer.setAttribute("style", "position: relative;");
        uContainerClone.classList.add('d-n')
    }
}, true);


