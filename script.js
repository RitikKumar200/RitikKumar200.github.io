// DOM Elements
const navToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.querySelector('.lightbox-close');
const contactForm = document.getElementById('contactForm');

// Gallery data for lightbox
const galleryData = [
    {
        title: "Corporate Promo Video",
        description: "Professional company introduction with motion graphics, color grading, and cinematic storytelling techniques.",
        type: "video",
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        poster: ""
    },
    {
        title: "Logo Animation",
        description: "Dynamic 3D logo reveal with particle effects created in After Effects and rendered in Cinema 4D.",
        type: "video",
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        poster: ""
    },
    {
        title: "Product Advertisement",
        description: "High-impact commercial with advanced color grading, motion tracking, and visual effects composition.",
        type: "video",
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        poster: ""
    },
    {
        title: "Documentary Edit",
        description: "Cinematic storytelling with advanced color correction, audio mixing, and narrative structure.",
        type: "video",
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        poster: ""
    },
    {
        title: "Social Media Intro",
        description: "Engaging animated introduction for YouTube channel with custom graphics and upbeat music.",
        type: "video",
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        poster: ""
    },
    {
        title: "Event Highlight Reel",
        description: "Dynamic event coverage with multi-camera editing, synchronized audio, and energetic pacing.",
        type: "video",
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        poster: ""
    }
];

// Mobile Navigation Toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for navigation links
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    closeMobileMenu();
}

// Gallery filtering
function filterGallery(category) {
    galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
            item.style.display = 'none';
        }
    });
}

// Gallery filter button handling
function handleFilterClick(e) {
    const filter = e.target.getAttribute('data-filter');
    
    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Filter gallery items
    filterGallery(filter);
}

// Video lightbox functionality
function openVideoLightbox(index) {
    const data = galleryData[index];
    const lightboxTitle = lightbox.querySelector('.lightbox-caption h3');
    const lightboxDescription = lightbox.querySelector('.lightbox-caption p');
    const videoPlayer = lightbox.querySelector('.video-player');
    const video = lightbox.querySelector('video');
    const imagePlaceholder = lightbox.querySelector('.image-placeholder');
    
    lightboxTitle.textContent = data.title;
    lightboxDescription.textContent = data.description;
    
    if (data.type === 'video') {
        videoPlayer.style.display = 'block';
        imagePlaceholder.style.display = 'none';
        
        // Set video source (using sample videos for demo)
        video.src = data.videoSrc;
        if (data.poster) {
            video.poster = data.poster;
        }
        
        // Auto-play video when lightbox opens
        video.currentTime = 0;
        video.play().catch(e => {
            console.log('Video autoplay failed:', e);
        });
    } else {
        videoPlayer.style.display = 'none';
        imagePlaceholder.style.display = 'flex';
    }
    
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add fade in animation
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
}

// Legacy lightbox function for backward compatibility
function openLightbox(index) {
    openVideoLightbox(index);
}

function closeLightbox() {
    const video = lightbox.querySelector('video');
    
    // Pause video when closing lightbox
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
    
    lightbox.style.opacity = '0';
    setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Contact form handling
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#667eea'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => removeNotification(notification));
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-item, .gallery-item, .contact-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in-up');
        }
    });
}

// Navbar background on scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.style.borderRight = '2px solid #f093fb';
        heroTitle.style.animation = 'blink 1s infinite';
        
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
                heroTitle.style.animation = 'none';
            }, originalText.length * 80 + 1000);
        }, 1000);
    }
}

// Video hover effects
function addVideoHoverEffects() {
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    
    videoPlaceholders.forEach(placeholder => {
        const playIcon = placeholder.querySelector('i');
        
        placeholder.addEventListener('mouseenter', () => {
            if (playIcon) {
                playIcon.style.transform = 'scale(1.2)';
                playIcon.style.transition = 'transform 0.3s ease';
            }
        });
        
        placeholder.addEventListener('mouseleave', () => {
            if (playIcon) {
                playIcon.style.transform = 'scale(1)';
            }
        });
    });
}

// Add blink animation for cursor
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { border-color: transparent; }
        51%, 100% { border-color: #f093fb; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style);

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Gallery filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
    
    // Lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Close lightbox when clicking outside
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Scroll events
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        animateOnScroll();
        handleNavbarScroll();
    });
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });
    
    // Initialize animations
    initTypingAnimation();
    animateOnScroll();
    addVideoHoverEffects();
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
});

// Resize event handling
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
    animateOnScroll();
    handleNavbarScroll();
}, 10);

window.removeEventListener('scroll', function() {
    updateActiveNavLink();
    animateOnScroll();
    handleNavbarScroll();
});

window.addEventListener('scroll', debouncedScrollHandler);

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loading styles
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        body:not(.loaded)::after {
            content: '';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            z-index: 10000;
        }
        
        @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
    `;
    document.head.appendChild(loadingStyle);
});
