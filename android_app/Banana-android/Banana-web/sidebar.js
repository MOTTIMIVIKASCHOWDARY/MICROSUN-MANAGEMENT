/**
 * MICROSUN MANAGEMENT - Universal Sidebar & 3-Bar Hamburger Menu Controller
 * Works seamlessly across all pages on Mobile, Tablet & Desktop.
 */

(function () {
    function initSidebar() {
        const menuToggle = document.getElementById('menuToggle') || document.querySelector('.hamburger-btn');
        const mainSidebar = document.getElementById('mainSidebar') || document.querySelector('.sidebar');
        let sidebarOverlay = document.getElementById('sidebarOverlay') || document.querySelector('.sidebar-overlay');

        if (!sidebarOverlay && mainSidebar) {
            sidebarOverlay = document.createElement('div');
            sidebarOverlay.id = 'sidebarOverlay';
            sidebarOverlay.className = 'sidebar-overlay';
            document.body.appendChild(sidebarOverlay);
        }

        function openSidebar() {
            if (menuToggle) menuToggle.classList.add('open');
            if (mainSidebar) {
                mainSidebar.classList.add('open');
                mainSidebar.style.transform = 'translateX(0)';
            }
            if (sidebarOverlay) {
                sidebarOverlay.classList.add('open');
                sidebarOverlay.style.opacity = '1';
                sidebarOverlay.style.pointerEvents = 'auto';
            }
        }

        function closeSidebar() {
            if (menuToggle) menuToggle.classList.remove('open');
            if (mainSidebar) {
                mainSidebar.classList.remove('open');
                mainSidebar.style.transform = '';
            }
            if (sidebarOverlay) {
                sidebarOverlay.classList.remove('open');
                sidebarOverlay.style.opacity = '';
                sidebarOverlay.style.pointerEvents = '';
            }
        }

        function toggleSidebar(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            const isOpen = (mainSidebar && mainSidebar.classList.contains('open')) ||
                           (menuToggle && menuToggle.classList.contains('open'));
            if (isOpen) {
                closeSidebar();
            } else {
                openSidebar();
            }
        }

        // Direct event listeners on buttons
        if (menuToggle) {
            menuToggle.removeEventListener('click', toggleSidebar);
            menuToggle.addEventListener('click', toggleSidebar);
            menuToggle.removeEventListener('touchend', toggleSidebar);
            menuToggle.addEventListener('touchend', function(e) {
                e.preventDefault();
                toggleSidebar(e);
            });
        }

        if (sidebarOverlay) {
            sidebarOverlay.removeEventListener('click', closeSidebar);
            sidebarOverlay.addEventListener('click', closeSidebar);
            sidebarOverlay.removeEventListener('touchend', closeSidebar);
            sidebarOverlay.addEventListener('touchend', function(e) {
                e.preventDefault();
                closeSidebar();
            });
        }

        // Global delegated click fail-safe for any 3-bar button
        document.addEventListener('click', function (e) {
            const btn = e.target.closest('#menuToggle, .hamburger-btn');
            if (btn && btn !== menuToggle) {
                toggleSidebar(e);
            } else if (e.target.closest('#sidebarOverlay, .sidebar-overlay')) {
                closeSidebar();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeSidebar();
            }
        });

        // Active page indicator highlighting
        const currentPath = window.location.pathname.split('/').pop() || 'main_hub.html';
        const menuItems = document.querySelectorAll('.menu-list .menu-item');
        menuItems.forEach(item => {
            const clickAttr = item.getAttribute('onclick') || '';
            if (clickAttr.includes(currentPath)) {
                item.classList.add('active');
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebar);
    } else {
        initSidebar();
    }
})();
