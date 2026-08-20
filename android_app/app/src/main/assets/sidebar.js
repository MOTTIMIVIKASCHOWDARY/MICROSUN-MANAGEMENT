// Universal Global Sidebar & Navigation Controller - MICROSUN MANAGEMENT
(function () {
    function initSidebarController() {
        const rawToggle = document.getElementById('menuToggle') || document.querySelector('.hamburger-btn');
        const mainSidebar = document.getElementById('mainSidebar') || document.querySelector('.sidebar');
        let rawOverlay = document.getElementById('sidebarOverlay') || document.querySelector('.sidebar-overlay');

        if (!rawToggle || !mainSidebar) return;

        // Ensure sidebar overlay exists in DOM
        if (!rawOverlay) {
            rawOverlay = document.createElement('div');
            rawOverlay.id = 'sidebarOverlay';
            rawOverlay.className = 'sidebar-overlay';
            document.body.appendChild(rawOverlay);
        }

        // Clone button and overlay to wipe any conflicting/duplicate listeners
        const menuToggle = rawToggle.cloneNode(true);
        rawToggle.parentNode.replaceChild(menuToggle, rawToggle);

        const overlay = rawOverlay.cloneNode(true);
        rawOverlay.parentNode.replaceChild(overlay, rawOverlay);

        function openSidebar() {
            menuToggle.classList.add('open');
            mainSidebar.classList.add('open');
            overlay.classList.add('open');
            document.body.classList.add('sidebar-opened');
        }

        function closeSidebar() {
            menuToggle.classList.remove('open');
            mainSidebar.classList.remove('open');
            overlay.classList.remove('open');
            document.body.classList.remove('sidebar-opened');
        }

        function toggleSidebar(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (mainSidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        }

        // Attach single, robust click listeners
        menuToggle.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', closeSidebar);

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainSidebar.classList.contains('open')) {
                closeSidebar();
            }
        });

        // Banana Armor Submenu Toggle inside sidebar
        const rawArmor = document.getElementById('bananaArmorToggle') || document.querySelector('.menu-item.has-submenu');
        const armorSubmenu = document.getElementById('bananaArmorSubmenu') || document.querySelector('.submenu-list');
        if (rawArmor && armorSubmenu) {
            const armorToggle = rawArmor.cloneNode(true);
            rawArmor.parentNode.replaceChild(armorToggle, rawArmor);

            armorToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                armorToggle.classList.toggle('active');
                const isCurrentlyOpen = armorSubmenu.classList.contains('open') && armorSubmenu.style.display !== 'none';
                if (isCurrentlyOpen) {
                    armorSubmenu.style.display = 'none';
                    armorSubmenu.classList.remove('open');
                } else {
                    armorSubmenu.style.display = 'block';
                    armorSubmenu.classList.add('open');
                }
                const indicator = armorToggle.querySelector('.submenu-indicator');
                if (indicator) {
                    indicator.textContent = (!isCurrentlyOpen) ? '▲' : '▼';
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebarController);
    } else {
        initSidebarController();
    }
})();
