// burger-menu.js
console.log('Burger menu - FINAL WORKING VERSION');

document.addEventListener('DOMContentLoaded', function() {
    let burger = document.getElementById('burgerMenu');
    let menu = document.getElementById('navMenu');
    let overlay = document.getElementById('overlay');

    console.log('Elements found:', {
        burger: !!burger,
        menu: !!menu,
        overlay: !!overlay
    });

    if (!burger || !menu) {
        console.error('Elements not found!');
        return;
    }

    function isMenuOpen() {
        return menu.classList.contains('active');
    }

    function openMenu() {
        console.log('OPEN MENU');

        burger.classList.add('active');
        menu.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.classList.add('no-scroll');
        document.documentElement.classList.add('no-scroll');
        
        console.log('📌 После добавления классов - menu classes:', menu.className);
        console.log('📌 Has active?', menu.classList.contains('active'));
        
        menu.style.position = 'fixed';
        menu.style.top = '0';
        menu.style.width = '320px';
        menu.style.height = '100vh';
        menu.style.padding = '80px 0 0 0';
        menu.style.zIndex = '100';
        menu.style.display = 'block';
        menu.style.visibility = 'visible';
        menu.style.opacity = '1';
        menu.style.transition = 'right 0.3s ease';
        menu.style.setProperty('right', '0px', 'important');
        
        console.log('После установки стилей - menu classes:', menu.className);
        console.log('Has active?', menu.classList.contains('active'));
        
        if (overlay) {
            overlay.style.cssText = `
                display: block !important;
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                background: rgba(0, 0, 0, 0.5) !important;
                z-index: 99 !important;
                pointer-events: auto !important;
            `;
        }
        
        document.body.style.cssText = `
            overflow: hidden !important;
            height: 100% !important;
            position: fixed !important;
            width: 100% !important;
            top: 0 !important;
            left: 0 !important;
            overflow-x: hidden !important;
            overflow-y: hidden !important;
        `;
        
        document.documentElement.style.cssText = `
            overflow: hidden !important;
            height: 100% !important;
        `;
        
        setTimeout(function() {
            menu.style.setProperty('right', '0px', 'important');
            console.log('Принудительно установлен right: 0px');
            console.log('После setTimeout - menu classes:', menu.className);
            console.log('Has active?', menu.classList.contains('active'));
        }, 10);
        
        console.log('Menu opened');
        console.log('Menu right (computed):', getComputedStyle(menu).right);
        console.log('Overlay display:', overlay ? getComputedStyle(overlay).display : 'no overlay');
    }

    function closeMenu() {
        console.log('CLOSE MENU');
        
        burger.classList.remove('active');
        menu.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
        document.documentElement.classList.remove('no-scroll');
        
        console.log('📌 После удаления классов - menu classes:', menu.className);
        console.log('📌 Has active?', menu.classList.contains('active'));
        

        menu.style.position = 'fixed';
        menu.style.top = '0';
        menu.style.right = '-320px';
        menu.style.width = '320px';
        menu.style.height = '100vh';
        menu.style.padding = '80px 0 0 0';
        menu.style.zIndex = '100';
        menu.style.display = 'block';
        menu.style.visibility = 'visible';
        menu.style.opacity = '1';
        menu.style.transition = 'right 0.3s ease';
        
        if (overlay) {
            overlay.style.display = 'none';
        }
        
        document.body.style.overflow = '';
        document.body.style.height = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.overflowX = '';
        document.body.style.overflowY = '';
        
        document.documentElement.style.overflow = '';
        document.documentElement.style.height = '';
        
        console.log('Menu closed');
        console.log('Menu right:', getComputedStyle(menu).right);
    }

    // ===== ОБРАБОТЧИКИ =====
    burger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🔄 BURGER CLICKED!');
        
        if (isMenuOpen()) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (overlay) {
        overlay.addEventListener('click', function(e) {
            console.log('🔄 OVERLAY CLICKED!');
            console.log('Menu has active class?', menu.classList.contains('active'));
            console.log('Menu classes:', menu.className);
            
            closeMenu();
        });
    }

    // Закрытие по ссылкам
    menu.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link) {
            console.log('🔄 LINK CLICKED!');
            if (isMenuOpen()) {
                closeMenu();
            }
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen()) {
            console.log('🔄 ESC PRESSED!');
            closeMenu();
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isMenuOpen()) {
            console.log('🔄 WINDOW RESIZE!');
            closeMenu();
        }
    });

    window.openMenu = openMenu;
    window.closeMenu = closeMenu;
    window.isMenuOpen = isMenuOpen;
    
    console.log('Burger menu initialized');
    console.log('Для отладки: openMenu(), closeMenu(), isMenuOpen()');
});