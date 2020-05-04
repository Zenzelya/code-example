'use strict'

function isLevelLi(e) {
    if (e.target.classList.contains('ubermenu-item-level-1')
        || e.target.classList.contains('ubermenu-item-level-3')
        || e.target.classList.contains('ubermenu-item-level-5')
        || e.target.classList.contains('ubermenu-item-level-7')) {
        return true;
    }
    return false;
}