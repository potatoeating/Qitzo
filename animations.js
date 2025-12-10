/* 
================================================
ADVANCED GSAP ANIMATIONS
Scroll-triggered animations, Parallax effects
================================================
*/

// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ===== WAIT FOR DOM AND GSAP =====
window.addEventListener('load', () => {
    initHeroAnimations();
    initScrollTriggerAnimations();
    initParallaxEffects();
    initCounterAnimations();
    initStaggerAnimations();
    initHoverAnimations();
});

// ===== HERO SECTION ANIMATIONS =====
function initHeroAnimations() {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    timeline
        .from('.hero-badge', {
            opacity: 0,
            y: -30,
            duration: 0.8
        })
        .from('.hero-title', {
            opacity: 0,
            y: 40,
            duration: 0.8
        }, '-=0.4')
        .from('.hero-description', {
            opacity: 0,
            y: 30,
            duration: 0.8
        }, '-=0.6')
        .from('.stat-item', {
            opacity: 0,
            y: 20,
            stagger: 0.15,
            duration: 0.6
        }, '-=0.4')
        .from('.hero-cta .btn', {
            opacity: 0,
            scale: 0.9,
            stagger: 0.1,
            duration: 0.5
        }, '-=0.3')
        .from('.trust-badges .badge-item', {
            opacity: 0,
            x: -20,
            stagger: 0.1,
            duration: 0.5
        }, '-=0.3');
}

// ===== SCROLL TRIGGER ANIMATIONS =====
function initScrollTriggerAnimations() {
    // Section Headers Animation
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.children, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
    
    // Template Cards Stagger
    gsap.utils.toArray('.template-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 60,
            rotation: 5,
            duration: 0.8,
            delay: (index % 3) * 0.1,
            ease: 'back.out(1.2)'
        });
    });
    
    // Feature Cards Animation
    gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            delay: (index % 3) * 0.15,
            ease: 'elastic.out(1, 0.5)'
        });
        
        // Animate icon on scroll
        gsap.from(card.querySelector('.feature-icon'), {
            scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            rotation: -180,
            scale: 0,
            duration: 0.8,
            ease: 'back.out(2)'
        });
    });
    
    // Steps Animation
    gsap.utils.toArray('.step-card').forEach((step, index) => {
        gsap.from(step, {
            scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    // Pricing Cards Animation
    gsap.utils.toArray('.pricing-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 80,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power2.out'
        });
        
        // Special animation for featured card
        if (card.classList.contains('featured')) {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                scale: 0.9,
                duration: 1,
                ease: 'elastic.out(1, 0.5)'
            });
        }
    });
    
    // Testimonials Animation
    gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
    
    // CTA Section Animation
    gsap.from('.cta-section .cta-content', {
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: 'back.out(1.5)'
    });
    
    // Contact Section Animation
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -80,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.contact-form-container', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 80,
        duration: 0.8,
        ease: 'power3.out'
    });
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    // Floating Icons Parallax
    gsap.utils.toArray('.float-icon').forEach((icon, index) => {
        gsap.to(icon, {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            y: (index + 1) * 100,
            rotation: (index + 1) * 45,
            opacity: 0,
            ease: 'none'
        });
    });
    
    // Section Background Parallax
    gsap.utils.toArray('section').forEach(section => {
        const bg = section.querySelector('.section-bg');
        if (bg) {
            gsap.to(bg, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: '20%',
                ease: 'none'
            });
        }
    });
}

// ===== COUNTER ANIMATIONS =====
function initCounterAnimations() {
    gsap.utils.toArray('.stat-number').forEach(stat => {
        const target = stat.textContent.replace(/[^0-9]/g, '');
        const suffix = stat.textContent.replace(/[0-9]/g, '');
        
        gsap.from(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            textContent: 0,
            duration: 2,
            ease: 'power1.out',
            snap: { textContent: 1 },
            onUpdate: function() {
                stat.textContent = Math.ceil(this.targets()[0].textContent) + suffix;
            }
        });
    });
}

// ===== STAGGER ANIMATIONS =====
function initStaggerAnimations() {
    // Template Features Stagger
    gsap.utils.toArray('.template-card').forEach(card => {
        gsap.from(card.querySelectorAll('.feature-tag'), {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0,
            stagger: 0.05,
            duration: 0.4,
            ease: 'back.out(2)'
        });
    });
    
    // Pricing Features Stagger
    gsap.utils.toArray('.pricing-card').forEach(card => {
        gsap.from(card.querySelectorAll('.feature-item'), {
            scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: -20,
            stagger: 0.08,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    
    // Contact Items Stagger
    gsap.from('.contact-item', {
        scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out'
    });
}

// ===== HOVER ANIMATIONS =====
function initHoverAnimations() {
    // Template Card Hover Effect
    document.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.03,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(card.querySelector('.template-image img'), {
                scale: 1.1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(card.querySelector('.template-image img'), {
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
    
    // Button Hover Effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
    
    // Feature Icon Hover
    document.querySelectorAll('.feature-icon').forEach(icon => {
        const card = icon.closest('.feature-card');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                rotation: 360,
                scale: 1.1,
                duration: 0.6,
                ease: 'back.out(1.5)'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                rotation: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });
}

// ===== CURSOR FOLLOWER (Premium Effect) =====
function initCursorFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #6366f1;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    // Expand cursor on interactive elements
    document.querySelectorAll('a, button, .template-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 1.5,
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                duration: 0.2
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: 'transparent',
                duration: 0.2
            });
        });
    });
}

// ===== MAGNETIC BUTTONS =====
function initMagneticButtons() {
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

// ===== TEXT REVEAL ANIMATION =====
function initTextReveal() {
    gsap.utils.toArray('.reveal-text').forEach(text => {
        const words = text.textContent.split(' ');
        text.innerHTML = words.map(word => 
            `<span class="word">${word}</span>`
        ).join(' ');
        
        gsap.from(text.querySelectorAll('.word'), {
            scrollTrigger: {
                trigger: text,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 20,
            stagger: 0.05,
            duration: 0.6,
            ease: 'power2.out'
        });
    });
}

// ===== PAGE TRANSITION =====
function initPageTransition() {
    // Fade in page on load
    gsap.from('body', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
    });
}

// ===== SMOOTH SCROLL LOCOMOTIVE (Alternative) =====
function initLocoScroll() {
    // This would require Locomotive Scroll library
    // Placeholder for advanced smooth scrolling
    console.log('Locomotive Scroll can be integrated for premium smooth scrolling');
}

// ===== REFRESH SCROLL TRIGGER ON WINDOW RESIZE =====
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// ===== INITIALIZE PREMIUM EFFECTS =====
if (window.innerWidth > 1024) {
    // Only on desktop for performance
    // initCursorFollower(); // Uncomment for custom cursor
    initMagneticButtons();
}

// ===== CONSOLE LOG =====
console.log('%c✨ GSAP Animations Loaded', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');