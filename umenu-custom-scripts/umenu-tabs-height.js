export default document.addEventListener('DOMContentLoaded', setTabHeight)

function setTabHeight(event) {
    const BREAKPOINT = 960;
    const uMenuL0 = document.querySelectorAll('#ubermenu-nav-main-8-menu-main-menu .ubermenu-item-level-0');
    const menuItems = $("li.ubermenu-item:not(.custom-menu-item):not(.ubermenu-item-level-0):not(.ubermenu-item-level-1):not(.ubermenu-item-level-3):not(.ubermenu-item-level-5):not(.ubermenu-item-level-7):not(.ubermenu-item-level-0 > .ubermenu-target)");
    const ALL_OPEN_TABS = '.ubermenu-item-level-1 li.ubermenu-active > ul.ubermenu-submenu, .ubermenu-item-level-1 > ul.ubermenu-submenu';

    let model = {
        first_column_element: [],
        first_column_element_default_height: 0,
        submenu_opened: [],
        submenu_elemets_height: [],
        l0_element: [],
        l0_element_id: '',
        li_item_id: '',
        submenu_custom_items: []
    };

    [].forEach.call(uMenuL0, item => {
        item.addEventListener('click', getNewModel);
        item.addEventListener('touchstart', getNewModel);

    });

    [].forEach.call(menuItems, item => {
        item.addEventListener('mouseover', manageTabHeight);
        item.addEventListener('touchstart', manageTabHeight);
    });

    function getNewModel(event) {
        if ($(window).width() >= BREAKPOINT) {
            if (this.id !== model.l0_element_id) {
                resetElementsHeight(model.submenu_opened);
                model.first_column_element = this.querySelector('.ubermenu-item-level-1 > ul.ubermenu-submenu');
                model.first_column_element_default_height = 0;
                model.submenu_custom_items = this.querySelectorAll('ul.ubermenu-submenu > .custom-menu-item');
                model.submenu_opened = [];
                model.submenu_elemets_height = [];
                model.l0_element = this;
                model.l0_element_id = this.id;
                model.li_item_id = '';

                const $element = $(model.first_column_element);
                $element.css({'height': 'min-content'});
                model.first_column_element_default_height = $element.outerHeight() + 0;
                $element.removeAttr("style");
            }



            if (model.submenu_custom_items.length > 0) {
                const maxHeight = getElementsMaxHeight(getElementsHeight(model.submenu_custom_items));
                if (maxHeight > model.first_column_element_default_height) {
                    model.first_column_element_default_height = maxHeight;
                    model.first_column_element.style.height = maxHeight + 'px';
                }
            }

        }
    }

    /*
     * Manage Tab height when new tabs opens
     * */
    function manageTabHeight(event) {
        if ($(window).width() >= BREAKPOINT) {
            event.stopPropagation();
            if (model.li_item_id !== this.id) {
                model.li_item_id = this.id;
                resetElementsHeight(model.submenu_opened);
                model.submenu_opened = model.l0_element.querySelectorAll(`#${this.id} > ul.ubermenu-submenu, ${ALL_OPEN_TABS}`);
                model.submenu_elemets_height = getElementsHeight(model.submenu_opened);
                const maxHeight = getElementsMaxHeight(model.submenu_elemets_height);
                setElementsHeight(model.submenu_opened, maxHeight)
            }
        }
    }

    function getElementsMaxHeight(elements) {
        let maxHeight = 0;
        [].forEach.call(elements, item => {
            if (item > maxHeight) {
                maxHeight = item;
            }
        });
        return maxHeight
    }

    function getElementsHeight(elements) {
        const elemetsHeight = [];

        if (elements.length > 0) {
            [].forEach.call(elements, element => {
                elemetsHeight.push($(element).outerHeight() + 0);
            });
        }
        return elemetsHeight;
    }

    function setElementsHeight(elements, height) {
        [].forEach.call(elements, item => {
            item.style.height = height + 'px';
        });
    }

    function resetElementsHeight(elements = []) {
        if (elements.length > 0) {
            [].forEach.call(elements, item => {
                item.removeAttribute('style');
            });
            model.first_column_element.style.height = model.first_column_element_default_height + 'px';
        }
    }
}

