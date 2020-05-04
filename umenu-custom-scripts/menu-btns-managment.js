'use strict'

// Menu Icons and BTN manager
// Mobile menu has ubermenu-responsive-collapse class when closed

export default document.addEventListener('DOMContentLoaded', ready)

function ready() {
    const BREAKPOINT = 960;
    const toggleBtns = {
        search: 'ubermenu-main-search-mobile',
        shop: 'ubermenu-main-shop-mobile',
        mmenu: 'ubermenu-main-8-menu-main-menu-2'
    };

    //Move mobile menu toglers:
    $($('.ubermenu-responsive-toggle').get().reverse()).detach().insertAfter($('.menu-buttons'));
    $(document).find(`[data-ubermenu-target='${toggleBtns.search}']`).find('.fas').removeClass('fa-bars').addClass('icon-search');
    $(document).find(`[data-ubermenu-target='${toggleBtns.search}']`).addClass('right-border');
    $(document).find(`[data-ubermenu-target='${toggleBtns.shop}']`).find('.fas').removeClass('fa-bars').addClass('icon-shop').attr('id', 'shop-mobile-icon');
    $(document).find(`[data-ubermenu-target='${toggleBtns.shop}']`).addClass('menu-buttons__shop right-border').attr('id', 'shop-mobile-btn');
    $('.fas.fa-search').removeClass('fa-search').addClass('icon-search');

    $('#ubermenu-main-search-mobile').find('form').css({'width': '100%'});

    const uMenuBlock = $('#ubermenu-main-8-menu-main-menu-2');
    const shopBlock = $('#ubermenu-main-shop-mobile');
    const searchBlock = $('#ubermenu-main-search-mobile');

    const uMenuBtn = $(document).find(`[data-ubermenu-target='ubermenu-main-8-menu-main-menu-2']`);
    const searchBtn = $(document).find(`[data-ubermenu-target='ubermenu-main-search-mobile']`);
    const shopBtn = $(document).find(`[data-ubermenu-target='ubermenu-main-shop-mobile']`);

    const searchIco = searchBtn.find('.icon-search');
    const shopIco = shopBtn.find('.icon-shop');
    const mmenuIco = uMenuBtn.find('.fas.fa-bars');

    searchBtn.on('click touchstart', function () {
            if ($(window).width() < BREAKPOINT) {
                searchIco.toggleClass('icon-close2');
                searchIco.toggleClass('icon-search');
                if (!uMenuBlock.hasClass('ubermenu-responsive-collapse') && searchBlock.hasClass('ubermenu-responsive-collapse')) {
                    uMenuBtn.trigger('click');
                }
                if (!shopBlock.hasClass('ubermenu-responsive-collapse') && searchBlock.hasClass('ubermenu-responsive-collapse')) {
                    shopBtn.trigger('click');
                }
            }
        }
    );

    shopBtn.on('click touchstart', function (ev) {
        if ($(window).width() < BREAKPOINT) {
            shopIco.toggleClass('icon-close2');
            shopIco.toggleClass('icon-shop');
            if (!searchBlock.hasClass('ubermenu-responsive-collapse') && shopBlock.hasClass('ubermenu-responsive-collapse')) {
                searchBtn.trigger('click');
            }
            if (!uMenuBlock.hasClass('ubermenu-responsive-collapse') && shopBlock.hasClass('ubermenu-responsive-collapse')) {
                uMenuBtn.trigger('click');
            }
        }
    });

    uMenuBtn.on('click touchstart', function (ev) {
        if ($(window).width() < BREAKPOINT) {
            ev.preventDefault();
            mmenuIco.toggleClass('fas fa-bars');
            mmenuIco.toggleClass('icon-close2');
            if (!searchBlock.hasClass('ubermenu-responsive-collapse') && uMenuBlock.hasClass('ubermenu-responsive-collapse')) {
                searchBtn.trigger('click');
            }
            if (!shopBlock.hasClass('ubermenu-responsive-collapse') && uMenuBlock.hasClass('ubermenu-responsive-collapse')) {
                shopBtn.trigger('click');
            }
        }
    });

    $(document).on('click touchstart', function (e) {
        if ($(window).width() < BREAKPOINT) {
            if (e.target.id !== 'shop-mobile-btn' && e.target.id !== 'shop-mobile-icon') {
                if (!shopBlock.hasClass('ubermenu-responsive-collapse')) {
                    shopBtn.trigger('click');
                }

            }
        }
    });


    /*
    * Desktop Search Btn manager
    * */
    const desktopSearchBtn = document.querySelector('.js-search-btn');
    const searchIconTag = desktopSearchBtn.querySelector('.ubermenu-icon');
    const l0LiItems = document.querySelectorAll('.ubermenu-item-level-0:not(.js-search-btn)');

    desktopSearchBtn.addEventListener('click', toggleSearchBtn);
    desktopSearchBtn.addEventListener('touchstart', toggleSearchBtn);

    [].forEach.call(l0LiItems, item => {
        item.addEventListener('click', removeCloseIcon);
        item.addEventListener('touchstart', removeCloseIcon);
    });

    function toggleSearchBtn(e) {
        if (e.target.classList.contains('ubermenu-target-with-icon') ||
            e.target.classList.contains('ubermenu-icon')) {
            searchIconTag.classList.toggle('icon-search');
            searchIconTag.classList.toggle('icon-close2');
        }
    }

    function removeCloseIcon(e) {
        if (searchIconTag.classList.contains('icon-close2')) {
            searchIconTag.classList.remove('icon-close2');
            searchIconTag.classList.add('icon-search');
        }
    }


}
