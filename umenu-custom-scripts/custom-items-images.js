'use strict'

// create img from data-rel source

export let curentItems;
export let prevCustomItems = document.querySelectorAll('.custom-menu-item--show');

export function createCustomMenuImages() {
    const customMenuItemList = document.querySelectorAll('.custom-menu-item');
    const customMenuItemListArr = Array.from(customMenuItemList);
    customMenuItemListArr.forEach(element => {
        const link = element.querySelector('.ubermenu-target');
        const imgSrc = link.dataset.rel;
        const img = document.createElement('img');
        img.classList.add('custom-menu-item__image');
        img.setAttribute('src', imgSrc);
        $(link).prepend(img);
    })
}

export function hidePrevCustomItems() {
    if (prevCustomItems.length) {
        const prevCustomItemsArr = Array.from(prevCustomItems);
        prevCustomItemsArr.forEach(item => {
            item.classList.remove('custom-menu-item--show');
        })
    }
}

export function setImgBlockWidth(customItems) {
    if (customItems.length) {
        const firstColumn = document.querySelector(".ubermenu-item-level-0 .ubermenu-column-1-4");
        const columnWidth = firstColumn.offsetWidth;
        const columnPosition = firstColumn.getBoundingClientRect().left;
        const customItemsArr = Array.from(customItems);
        customItemsArr.forEach(item => {
            item.style.width = columnWidth + 'px';
            let crutchesStep = item.classList.contains('ubermenu-item-level-3') ? columnWidth : 0;
            let crutchesStart = item.classList.contains('ubermenu-item-level-3') ?  0 : columnPosition;

            if (item.classList.contains('place-1')) {
                item.style.left = crutchesStart + columnWidth + 'px';
            }
            if (item.classList.contains('place-2')) {
                item.style.left = crutchesStart + 2 * columnWidth - crutchesStep  + 'px';
            }
            if (item.classList.contains('place-3')) {
                item.style.left = crutchesStart + 3 * columnWidth - crutchesStep  + 'px';
            }
            if (crutchesStep > 0) {
                item.style.top = 0;
            }
        });
    }
}

