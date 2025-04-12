document.addEventListener('DOMContentLoaded', function() {
    try {
        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!event.target.closest('#mobile-menu') && 
                !event.target.closest('#mobile-menu-button') && 
                !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });

        // Highlight current page in navigation
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('text-blue-600');
                link.classList.remove('text-gray-600');
            }
        });

    } catch (error) {
        console.error('Error in script.js:', error);
    }
});

// Error handling wrapper for async operations
async function handleAsyncOperation(operation) {
    try {
        await operation();
    } catch (error) {
        console.error('Async operation failed:', error);
        // You could also show a user-friendly error message here
    }
}
