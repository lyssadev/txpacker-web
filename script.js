// Make the logo clickable and scroll to top
document.querySelector('.logo').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const nav = document.querySelector('nav ul');
            const burger = document.querySelector('.burger');
            if (nav.classList.contains('show')) {
                nav.classList.remove('show');
                burger.textContent = '☰';
            }
        }
    });
});

// Add scroll-based navigation highlighting and parallax effect
let lastScroll = 0;
let isScrolling;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('header');
    
    // Header show/hide based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;

    // Clear the timeout
    window.clearTimeout(isScrolling);

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(() => {
        // Navigation highlighting
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (currentScroll >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }, 100);
});

// Mobile navigation
const createMobileNav = () => {
    const nav = document.querySelector('nav ul');
    const burger = document.createElement('button');
    burger.className = 'burger';
    burger.setAttribute('aria-label', 'Toggle navigation menu');
    burger.innerHTML = '☰';
    document.querySelector('nav').appendChild(burger);

    burger.addEventListener('click', () => {
        nav.classList.toggle('show');
        burger.textContent = nav.classList.contains('show') ? '✕' : '☰';
        document.body.style.overflow = nav.classList.contains('show') ? 'hidden' : '';
        
        // Animate menu items
        const menuItems = nav.querySelectorAll('li');
        menuItems.forEach((item, index) => {
            if (nav.classList.contains('show')) {
                item.style.animation = `fadeInDown 0.3s ease forwards ${index * 0.1}s`;
            } else {
                item.style.animation = '';
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('show') && 
            !nav.contains(e.target) && 
            !burger.contains(e.target)) {
            nav.classList.remove('show');
            burger.textContent = '☰';
            document.body.style.overflow = '';
        }
    });
};

// Feature cards animation with improved performance
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.2,
    rootMargin: '50px'
});

document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Initialize mobile navigation
if (window.innerWidth <= 768) {
    createMobileNav();
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth <= 768 && !document.querySelector('.burger')) {
            createMobileNav();
        } else if (window.innerWidth > 768) {
            const burger = document.querySelector('.burger');
            if (burger) {
                burger.remove();
            }
            document.querySelector('nav ul').classList.remove('show');
            document.body.style.overflow = '';
        }
    }, 250);
});

// Add hover effect to buttons
document.querySelectorAll('.cta-button, .github-button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    });
}); 