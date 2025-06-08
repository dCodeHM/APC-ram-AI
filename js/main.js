// DOM Elements
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const quickActionButtons = document.querySelectorAll('.grid button');
const signInButton = document.querySelector('nav button');
const getStartedButton = document.querySelector('.hero-section button');
const learnMoreButton = document.querySelector('.hero-section button:last-child');

// Sample responses for demonstration
const sampleResponses = {
    'course': 'I can help you with course registration. Would you like to know about available courses or need help with registration?',
    'schedule': 'I can assist you with scheduling. Please let me know if you need help with class timings or exam schedules.',
    'facility': 'I can provide information about campus facilities. Which facility would you like to know more about?',
    'grade': 'I can help you with grade-related queries. Please specify what information you need about your grades.',
    'default': 'I understand your question. Let me connect you with the appropriate department for assistance.'
};

// Add event listeners
sendButton.addEventListener('click', handleUserMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserMessage();
    }
});

// Handle user message
function handleUserMessage() {
    const message = userInput.value.trim();
    if (message) {
        // Add user message to chat
        addMessageToChat(message, 'user');
        userInput.value = '';

        // Show loading indicator
        showLoadingIndicator();

        // Simulate AI response (replace with actual AI integration)
        setTimeout(() => {
            removeLoadingIndicator();
            const response = generateAIResponse(message);
            addMessageToChat(response, 'ai');
        }, 1000);
    }
}

// Add message to chat container
function addMessageToChat(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender === 'user' ? 'bg-gray-100 ml-auto' : 'bg-blue-100'} p-3 rounded-lg mb-3 max-w-[80%]`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Show loading indicator
function showLoadingIndicator() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-indicator';
    loadingDiv.className = 'chat-message bg-blue-100 p-3 rounded-lg mb-3 max-w-[80%]';
    loadingDiv.innerHTML = '<p class="loading-dots">Thinking</p>';
    chatContainer.appendChild(loadingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Remove loading indicator
function removeLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }
}

// Generate AI response (replace with actual AI integration)
function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Simple keyword matching (replace with actual AI logic)
    if (lowerMessage.includes('course')) {
        return sampleResponses.course;
    } else if (lowerMessage.includes('schedule')) {
        return sampleResponses.schedule;
    } else if (lowerMessage.includes('facility')) {
        return sampleResponses.facility;
    } else if (lowerMessage.includes('grade')) {
        return sampleResponses.grade;
    }
    
    return sampleResponses.default;
}

// Add hover effects to buttons
document.querySelectorAll('button').forEach(button => {
    button.classList.add('btn-animate', 'hover-lift');
});

// Add hover effects to cards
document.querySelectorAll('.grid > div').forEach(card => {
    card.classList.add('card-hover');
});

// Add floating animation to icons
document.querySelectorAll('.text-blue-600.text-3xl').forEach(icon => {
    icon.classList.add('icon-float');
});

// Add pulse animation to feature icons
document.querySelectorAll('.bg-blue-100.w-16').forEach(icon => {
    icon.classList.add('icon-pulse');
});

// Handle quick action buttons
quickActionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.closest('div').querySelector('h3').textContent;
        // Scroll to the features section
        document.querySelector('.features-section').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Handle sign in button
signInButton.addEventListener('click', () => {
    // Add your sign in logic here
    console.log('Sign in clicked');
});

// Handle get started button
getStartedButton.addEventListener('click', () => {
    // Scroll to the quick actions section
    document.querySelector('.grid').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
});

// Handle learn more button
learnMoreButton.addEventListener('click', () => {
    // Scroll to the features section
    document.querySelector('.features-section').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
});

// Add smooth scroll to all anchor links
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

// Add scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.grid > div, .features-section > div').forEach(element => {
    observer.observe(element);
});

// Add parallax effect to hero section
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const hero = document.querySelector('.hero-section');
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
            ticking = false;
        });
        ticking = true;
    }
});

// Chat Widget Toggle Function
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    const floatingLabel = document.getElementById('floatingLabel');
    const chatButton = document.querySelector('.chat-button');
    
    if (!chatWindow.classList.contains('active')) {
        // Opening the chat
        chatWindow.style.display = 'block';
        requestAnimationFrame(() => {
            chatWindow.classList.add('active');
            chatButton.classList.add('active');
            floatingLabel.classList.add('invisible');
        });
    } else {
        // Closing the chat
        chatWindow.classList.remove('active');
        chatButton.classList.remove('active');
        floatingLabel.classList.remove('invisible');
        setTimeout(() => {
            if (!chatWindow.classList.contains('active')) {
                chatWindow.style.display = 'none';
            }
        }, 300);
    }
}

// Add escape key handler to close chat
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const chatWindow = document.getElementById('chatWindow');
        if (chatWindow.classList.contains('active')) {
            toggleChat();
        }
    }
});

// Improve click outside handling
document.addEventListener('click', (e) => {
    const chatWindow = document.getElementById('chatWindow');
    const chatButton = document.querySelector('.chat-button');
    
    if (chatWindow && chatButton && 
        !chatWindow.contains(e.target) && 
        !chatButton.contains(e.target) && 
        chatWindow.classList.contains('active')) {
        toggleChat();
    }
});

// Carousel functionality
let currentSlide = 0;
let isTransitioning = false;
let touchStartX = 0;
let touchEndX = 0;
let isMobile = window.innerWidth <= 700;

function initializeCarousel() {
    const $carousel = $('#carousel');
    const $carouselCards = $('.carousel-card');
    const $prevBtn = $('#prevBtn');
    const $nextBtn = $('#nextBtn');
    const $indicators = $('.carousel-indicator');
    const totalCards = $carouselCards.length;

    if (!$carousel.length || totalCards === 0) {
        console.log('Carousel elements not found');
        return;
    }

    // Update carousel display
    function updateCarousel() {
        if (isTransitioning) return;
        isTransitioning = true;

        if (isMobile) {
            // Mobile view - box layout
            $carouselCards.each(function(index) {
                const $card = $(this);
                $card.css({
                    'position': 'relative',
                    'top': '0',
                    'left': '0',
                    'width': '100%',
                    'max-width': 'none',
                    'transform': 'none',
                    'opacity': '1',
                    'filter': 'none',
                    'margin-bottom': '1rem'
                });
            });

            // Hide navigation elements
            $prevBtn.hide();
            $nextBtn.hide();
            $('.carousel-indicator').hide();
        } else {
            // Desktop view - carousel
            $carouselCards.each(function(index) {
                const $card = $(this);
                const cardIndex = parseInt($card.attr('data-index'));
                
                // Calculate position relative to current slide
                let position = cardIndex - currentSlide;
                
                // Handle wrapping
                if (position > 1) position -= totalCards;
                if (position < -1) position += totalCards;
                
                // Remove all position classes
                $card.removeClass('carousel-active carousel-left carousel-right carousel-hidden');
                
                // Apply position and styling based on position
                if (position === 0) {
                    // Center card (active)
                    $card.addClass('carousel-active');
                    $card.css({
                        'transform': 'translate(-50%, -50%) translateX(0) scale(1)',
                        'opacity': '1',
                        'z-index': '30',
                        'filter': 'brightness(1)',
                        'pointer-events': 'auto'
                    });
                } else if (position === -1) {
                    // Left card
                    $card.addClass('carousel-left');
                    $card.css({
                        'transform': 'translate(-50%, -50%) translateX(-100%) scale(0.8)',
                        'opacity': '0.6',
                        'z-index': '20',
                        'filter': 'brightness(0.9)',
                        'pointer-events': 'auto'
                    });
                } else if (position === 1) {
                    // Right card
                    $card.addClass('carousel-right');
                    $card.css({
                        'transform': 'translate(-50%, -50%) translateX(100%) scale(0.8)',
                        'opacity': '0.6',
                        'z-index': '20',
                        'filter': 'brightness(0.9)',
                        'pointer-events': 'auto'
                    });
                } else {
                    // Hidden card
                    $card.addClass('carousel-hidden');
                    $card.css({
                        'transform': 'translate(-50%, -50%) translateX(0) scale(0.6)',
                        'opacity': '0',
                        'z-index': '10',
                        'filter': 'brightness(0.7)',
                        'pointer-events': 'none'
                    });
                }
            });

            // Show navigation elements
            $prevBtn.show();
            $nextBtn.show();
            $('.carousel-indicator').show();
        }

        // Reset transition flag
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    // Navigation functions
    function nextSlide() {
        if (isTransitioning || isMobile) return;
        currentSlide = (currentSlide + 1) % totalCards;
        updateCarousel();
    }

    function prevSlide() {
        if (isTransitioning || isMobile) return;
        currentSlide = (currentSlide - 1 + totalCards) % totalCards;
        updateCarousel();
    }

    function goToSlide(index) {
        if (isTransitioning || index === currentSlide) return;
        currentSlide = index;
        updateCarousel();
    }

    // Event listeners
    $prevBtn.off('click').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        prevSlide();
    });

    $nextBtn.off('click').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        nextSlide();
    });

    // Handle window resize
    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            isMobile = window.innerWidth <= 700;
            updateCarousel();
        }, 250);
    });

    // Initialize carousel
    updateCarousel();

    // Auto-advance carousel (desktop only)
    let autoAdvance = setInterval(function() {
        if (!isMobile) {
            nextSlide();
        }
    }, 5000);

    // Pause auto-advance on hover/touch
    $carousel.on('mouseenter touchstart', () => {
        clearInterval(autoAdvance);
    });

    $carousel.on('mouseleave touchend', () => {
        if (!isMobile) {
            autoAdvance = setInterval(nextSlide, 5000);
        }
    });
}

// Initialize carousel when document is ready
$(document).ready(function() {
    initializeCarousel();
    
    // ... rest of existing DOMContentLoaded code ...
});

// About Us Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const aboutUsToggle = document.getElementById('aboutUsToggle');
    const aboutUsContent = document.getElementById('aboutUsContent');
    const toggleIcon = aboutUsToggle.querySelector('i');
    const navAboutUs = document.getElementById('navAboutUs');
    const mobileNavAboutUs = document.getElementById('mobileNavAboutUs');
    let isAboutUsOpen = false;

    function toggleAboutUs() {
        isAboutUsOpen = !isAboutUsOpen;
        
        // Toggle content visibility with smooth animation
        if (isAboutUsOpen) {
            aboutUsContent.classList.remove('hidden');
            aboutUsContent.style.maxHeight = aboutUsContent.scrollHeight + 'px';
            toggleIcon.style.transform = 'rotate(180deg)';
            aboutUsToggle.classList.add('bg-[#e7af41]/5');
        } else {
            aboutUsContent.style.maxHeight = '0';
            toggleIcon.style.transform = 'rotate(0deg)';
            aboutUsToggle.classList.remove('bg-[#e7af41]/5');
            setTimeout(() => {
                aboutUsContent.classList.add('hidden');
            }, 300);
        }
    }

    // Toggle button click handler
    aboutUsToggle.addEventListener('click', toggleAboutUs);

    // Navigation link click handlers
    function handleAboutUsClick(e) {
        e.preventDefault();
        
        // Scroll to the About Us section
        aboutUsToggle.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // If the section is not already open, open it
        if (!isAboutUsOpen) {
            setTimeout(toggleAboutUs, 500); // Wait for scroll to complete
        }
    }

    // Add click handlers for both desktop and mobile navigation
    navAboutUs.addEventListener('click', handleAboutUsClick);
    mobileNavAboutUs.addEventListener('click', handleAboutUsClick);

    // Close mobile menu when clicking navigation links
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileNavAboutUs.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (isAboutUsOpen) {
                aboutUsContent.style.maxHeight = aboutUsContent.scrollHeight + 'px';
            }
        }, 250);
    });
}); 