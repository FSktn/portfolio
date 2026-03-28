// Smooth scroll behavior voor anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Animatie voor elementen die in beeld komen
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observeer alle cards die geanimeerd moeten worden
    const cards = document.querySelectorAll('.highlight-card, .project-card');
    cards.forEach(card => {
        observer.observe(card);
    });

    // Smooth page transitions
    let isNavigating = false;
    const links = document.querySelectorAll('a[href^="index.html"], a[href^="projecten.html"], a[href^="over-mij.html"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (isNavigating) return;
            
            const href = this.getAttribute('href');
            
            // Negeer als we al op dezelfde pagina zijn
            if (window.location.pathname.endsWith(href)) {
                e.preventDefault();
                return;
            }
            
            e.preventDefault();
            isNavigating = true;
            
            // Fade out animatie
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            // Navigeer naar nieuwe pagina
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });

    // Fade in bij laden pagina
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll naar beneden
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll naar boven
            navbar.style.transform = 'translateY(0)';
        }
        
        // Voeg shadow toe bij scrollen
        if (currentScroll > 0) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Animeer skill bars bij in beeld komen
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length > 0) {
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                    skillObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => skillObserver.observe(bar));
    }

    // Hover effect voor project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Highlight cards hover effect
    const highlightCards = document.querySelectorAll('.highlight-card');
    highlightCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Button hover effecten
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Console bericht
    console.log('Portfolio website geladen!');
});

// Parallax effect voor hero sectie (subtiel)
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Prevent default scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Scroll naar top bij nieuwe pagina load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});
