document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Progress Bar
    const progressBar = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once it has become visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');
    animatedElements.forEach(el => observer.observe(el));

    // 3. Visual 1: Interactive Toggle (Curriculum Development vs Studies)
    const toggleContainer = document.querySelector('.toggle-container');
    const btnDev = document.getElementById('btn-development');
    const btnStudies = document.getElementById('btn-studies');
    const contentDev = document.getElementById('content-dev');
    const contentStudy = document.getElementById('content-study');

    if(toggleContainer && btnDev && btnStudies) {
        btnDev.addEventListener('click', () => {
            toggleContainer.classList.remove('switched');
            btnDev.classList.add('active');
            btnStudies.classList.remove('active');
            
            contentDev.classList.add('active');
            contentStudy.classList.remove('active');
        });

        btnStudies.addEventListener('click', () => {
            toggleContainer.classList.add('switched');
            btnStudies.classList.add('active');
            btnDev.classList.remove('active');
            
            contentStudy.classList.add('active');
            contentDev.classList.remove('active');
        });
    }

    // 4. Currere Interactive Nodes
    const currereNodes = document.querySelectorAll('.c-node');
    currereNodes.forEach(node => {
        node.addEventListener('click', function() {
            // Remove highlight from all
            currereNodes.forEach(n => {
                n.style.boxShadow = 'none';
                n.style.borderColor = 'rgba(255,255,255,0.1)';
                n.style.zIndex = '2';
            });
            // Highlight clicked
            this.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.5)';
            this.style.borderColor = '#6366f1';
            this.style.zIndex = '10';
        });
    });

    // 5. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if(targetEl) {
                window.scrollTo({
                    top: targetEl.offsetTop - 80, // Offset for fixed nav
                    behavior: 'smooth'
                });
            }
        });
    });
});
