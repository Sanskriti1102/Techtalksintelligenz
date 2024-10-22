document.addEventListener('DOMContentLoaded', function () {
    const backToTopButton = document.getElementById('backToTop');
    let isVisible = false;

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            showButton();
        } else {
            hideButton();
        }
    };

    const showButton = () => {
        if (!isVisible) {
            isVisible = true;
            backToTopButton.classList.add('show', 'animate-fadeInBounce');
            backToTopButton.classList.remove('hide', 'animate-fadeOutBounce');
        }
    };

    const hideButton = () => {
        if (isVisible) {
            isVisible = false;
            backToTopButton.classList.add('hide', 'animate-fadeOutBounce');
            backToTopButton.classList.remove('show', 'animate-fadeInBounce');
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisibility);

    backToTopButton.addEventListener('click', scrollToTop);
});
