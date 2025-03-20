/**
 * Main JavaScript for Fabio Fartek's Portfolio
 * Apple-inspired interactions and animations
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Handle intro animation
    setTimeout(() => {
        const introAnimation = document.querySelector('.intro-animation');
        const mainContent = document.querySelector('.main-content');
        
        // Fade out intro animation
        introAnimation.style.opacity = '0';
        
        // After animation completes, hide it and show main content
        setTimeout(() => {
            introAnimation.style.display = 'none';
            mainContent.classList.add('visible');
            
            // Animate skill bars
            animateSkillBars();
        }, 600);
    }, 4000); // Wait for all intro words to animate
});

// Function to animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        // Get width from parent's data attribute or style
        const width = bar.style.width;
        
        // First set width to 0
        bar.style.width = '0';
        
        // Then animate to target width
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for header
                behavior: 'smooth'
            });
        }
    });
});

// Add subtle parallax effect to profile card on mouse move
const profileCard = document.querySelector('.profile-card');

if (profileCard) {
    document.addEventListener('mousemove', e => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        profileCard.style.transform = `perspective(1000px) rotateY(${mouseX * 4}deg) rotateX(${-mouseY * 4}deg) translateY(-5px)`;
    });
    
    // Reset transform when mouse leaves
    document.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'translateY(-5px)';
    });
}

// Add intersection observer for fade-in animations
const fadeElements = document.querySelectorAll('.resume-section, .skill-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    element.classList.add('fade-element');
    fadeObserver.observe(element);
});

// Add CSS for fade animations
const style = document.createElement('style');
style.textContent = `
    .fade-element {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Add active state to current navigation link based on URL
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    
    if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
        link.parentElement.classList.add('active');
    }
});

// Add hover effect for timeline items
const timelineItems = document.querySelectorAll('.timeline .resume-item');

timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const marker = item.querySelector('.timeline-marker');
        marker.style.transform = 'scale(1.2)';
        marker.style.boxShadow = '0 0 0 4px rgba(0, 113, 227, 0.2)';
        marker.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    item.addEventListener('mouseleave', () => {
        const marker = item.querySelector('.timeline-marker');
        marker.style.transform = 'scale(1)';
        marker.style.boxShadow = 'none';
    });
});
