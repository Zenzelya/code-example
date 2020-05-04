'use strict'

export const MOBILE_BREACK_POINT = 960;
const ubermenuMain = document.getElementById("ubermenu-main-8-menu-main-menu-2");

let curentItems;
let prevCustomItems = [];

export function getParentElement(currentNode, parentClass) {
    if (currentNode.classList.contains('ubermenu-main')) {
        return false
    }
    if (currentNode.classList.contains(parentClass)) {
        return currentNode;
    } else {
        return getParentElement(currentNode.parentNode, parentClass)
    }
}

export function isDesktop() {
    if ($(window).width() >= MOBILE_BREACK_POINT) {
        return true;
    } else {
        return false;
    }
}

export function menuIsOpen() {
    if (ubermenuMain.getElementsByClassName("ubermenu-item-level-0 ubermenu-active").length) {
        return true;
    } else {
        return false;
    }
}

