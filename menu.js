'use strict'

import {createCustomMenuImages, setImgBlockWidth} from './umenu-custom-scripts/custom-items-images';

import './umenu-custom-scripts/sticky-menu';
import './umenu-custom-scripts/menu-btns-managment';
import './umenu-custom-scripts/umenu-tabs-height';

export default document.addEventListener('DOMContentLoaded', ready)

function ready() {
    const ubermenuMain = document.getElementById("ubermenu-nav-main-8-menu-main-menu");
    const l0Links = document.querySelectorAll('.ubermenu-item-level-0 > .ubermenu-target');
    const BACKGROUND_GRAY = document.getElementsByClassName("sc-header__nav-background-cover")[0];
    const menu_items = $(".ubermenu-item:not(.custom-menu-item):not(.ubermenu-item-level-0):not(.ubermenu-item-level-1):not(.ubermenu-item-level-3):not(.ubermenu-item-level-5):not(.ubermenu-item-level-7):not(.phone-ico):not(.user-ico)");
    const BREAKPOINT = 960;
    let timer_id = null;
    let timer_id_second = null;
    let prevElement = {};

    // Off uber hover actions to implement custom logic for opening
    $('.ubermenu-tab').off('mouseenter.ubermenu-submenu-toggle');

    // Desktop menu icons
    $('.user-ico').find('.ubermenu-target').addClass('icon-user');
    $('.phone-ico').find('.ubermenu-target').addClass('icon-call-back');
    $('.shop-ico').children('.ubermenu-target').addClass('icon-shop');

    // Load promo image
    createCustomMenuImages();

    const process_custom_images = function ($element, isRemove) {
        const current_promo_items = $element.children('.custom-menu-item');
        const all_promo_items = $('.custom-menu-item');

        all_promo_items.removeClass('custom-menu-item--show');

        if (!isRemove) {
            setImgBlockWidth(current_promo_items.toArray());
            current_promo_items.addClass('custom-menu-item--show');
        }
    };

    const process_links_color = function ($elements, isRemove) {
        $elements.each(function (i, item) {
            isRemove ? $(item).removeClass('item-unselected') : $(item).addClass('item-unselected');
        });
    };

    // Remove inner active elements
    $(ubermenuMain).find('.ubermenu-active').removeClass('ubermenu-active');

    /*
    * Listener for top menu
    * */
    $('.ubermenu-item-level-0 > .ubermenu-target').on('click touchstart', function (ev) {
        // Show L0 promo images
        process_custom_images($(this).next('ul'), false);

        // Remove inner active elements
        $(this).find('.ubermenu-active').removeClass('ubermenu-active');
    });

    /*
    * Listener to the external menu area
    * */
    $('.ubermenu-item-level-1 > .ubermenu-submenu').on('mouseleave', function (ev) {
        process_custom_images($(this).closest('.ubermenu-submenu-type-mega'), false);
    });

    /*
    * Toggle submenus
    * Menu items (not l1, l0 and not custom images)
    * */
    menu_items.on('mouseenter', function (ev) {
        if ($(window).width() < BREAKPOINT) {
            ev.preventDefault();
            ev.stopPropagation();
        } else {
            clearTimeout(timer_id);

            process_links_color($(this).siblings());

            timer_id = setTimeout(() => {
                $(this).addClass('ubermenu-active');
            }, 300);
        }

    });

    menu_items.on('mouseleave', function (ev) {
        if ($(window).width() > BREAKPOINT) {
            clearTimeout(timer_id);
            clearTimeout(timer_id_second);

            $(this).removeClass('ubermenu-active');
            $(this).find('ubermenu-active').removeClass('ubermenu-active');
            process_links_color($(this).siblings(), true);
        }
    });

    /*
    * Toggle custom images
    * Menu items (not l1, l0 and not custom images)
    * */
    menu_items.children('.ubermenu-target').on('mouseenter', function (ev) {
        if ($(window).width() > BREAKPOINT) {
            timer_id_second = setTimeout(() => {
                process_custom_images($(this).next('ul'), false);
            }, 300);
        } else {
            ev.preventDefault()
            ev.stopPropagation()
        }

    });


    // close the MM desktop by clicking outside
    $(document).on('click touchstart', closeMenu);

    function closeMenu() {
        if (!$(".ubermenu-item-level-0").hasClass('ubermenu-active')) {
            BACKGROUND_GRAY.classList.remove('sc-header__nav-background-cover--visible');
            document.body.classList.remove('h-scroll--off');
            const btn = this.querySelector('.js-search-btn > .ubermenu-target > .ubermenu-icon');
            if (btn.classList.contains('icon-close2')) {
                btn.classList.remove('icon-close2');
                btn.classList.add('icon-search');
            }
            prevElement = {};
        }

    }

    // EVENTS FUNCTIONS :
    function setBackground(e) {
        if (!document.body.classList.contains('h-scroll--off')) {
            document.body.classList.add('h-scroll--off');
            BACKGROUND_GRAY.classList.add('sc-header__nav-background-cover--visible');
        }
        if (this === prevElement) {
            document.body.classList.remove('h-scroll--off');
            BACKGROUND_GRAY.classList.remove('sc-header__nav-background-cover--visible');
            prevElement = {};
            return this
        }
        prevElement = this;
    }

    $('.scroll-to-top').click(function () {
        $('html,body').animate({scrollTop: 0}, 500);
        return false;
    });

    [].forEach.call(l0Links, item => {
        item.addEventListener('click', setBackground);
        item.addEventListener('touchstart', setBackground);
    });

}
