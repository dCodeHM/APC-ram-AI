// DOM Elements
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
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

// Mobile menu functionality
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    // Update aria-expanded attribute
    const isExpanded = !mobileMenu.classList.contains('hidden');
    mobileMenuButton.setAttribute('aria-expanded', isExpanded);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
    }
});

// Close mobile menu when window is resized to desktop view
window.addEventListener('resize', () => {
    if (window.innerWidth >= 640) { // sm breakpoint
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
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
            // Close mobile menu after clicking a link
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
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

// Carousel functionality - jQuery implementation without hover
let currentSlide = 0;
let isTransitioning = false;

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

    console.log('Initializing jQuery carousel with', totalCards, 'cards');

    // Update carousel display
    function updateCarousel() {
        if (isTransitioning) return;
        isTransitioning = true;

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
                    'pointer-events': 'auto',
                    'cursor': 'default'
                });
            } else if (position === -1) {
                // Left card
                $card.addClass('carousel-left');
                $card.css({
                    'transform': 'translate(-50%, -50%) translateX(-400px) scale(0.8)',
                    'opacity': '0.6',
                    'z-index': '20',
                    'filter': 'brightness(0.9)',
                    'pointer-events': 'auto',
                    'cursor': 'pointer'
                });
            } else if (position === 1) {
                // Right card
                $card.addClass('carousel-right');
                $card.css({
                    'transform': 'translate(-50%, -50%) translateX(400px) scale(0.8)',
                    'opacity': '0.6',
                    'z-index': '20',
                    'filter': 'brightness(0.9)',
                    'pointer-events': 'auto',
                    'cursor': 'pointer'
                });
            } else {
                // Hidden card
                $card.addClass('carousel-hidden');
                $card.css({
                    'transform': 'translate(-50%, -50%) translateX(0) scale(0.6)',
                    'opacity': '0',
                    'z-index': '10',
                    'filter': 'brightness(0.7)',
                    'pointer-events': 'none',
                    'cursor': 'default'
                });
            }
        });

        // Update indicators
        $indicators.each(function(index) {
            const $indicator = $(this);
            $indicator.removeClass('bg-blue-600 bg-blue-200');
            
            if (index === currentSlide) {
                $indicator.addClass('bg-blue-600');
                $indicator.css('transform', 'scale(1.3)');
            } else {
                $indicator.addClass('bg-blue-200');
                $indicator.css('transform', 'scale(1)');
            }
        });

        // Reset transition flag
        setTimeout(() => {
            isTransitioning = false;
        }, 700);

        console.log('Carousel updated - Current slide:', currentSlide);
    }

    // Navigation functions
    function nextSlide() {
        if (isTransitioning) return;
        console.log('Next slide triggered');
        currentSlide = (currentSlide + 1) % totalCards;
        updateCarousel();
    }

    function prevSlide() {
        if (isTransitioning) return;
        console.log('Previous slide triggered');
        currentSlide = (currentSlide - 1 + totalCards) % totalCards;
        updateCarousel();
    }

    function goToSlide(index) {
        if (isTransitioning || index === currentSlide) return;
        console.log('Going to slide:', index);
        currentSlide = index;
        updateCarousel();
    }

    // Event listeners using jQuery
    $prevBtn.off('click').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Previous button clicked');
        prevSlide();
    });

    $nextBtn.off('click').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Next button clicked');
        nextSlide();
    });

    // Indicator clicks
    $indicators.off('click').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const index = parseInt($(this).attr('data-index'));
        console.log('Indicator clicked:', index);
        goToSlide(index);
    });

    // Card clicks - move clicked card to center
    $carouselCards.off('click').on('click', function(e) {
        const cardIndex = parseInt($(this).attr('data-index'));
        console.log('Card clicked:', cardIndex, 'Current center:', currentSlide);
        
        // Only move to center if it's not already the center card
        if (cardIndex !== currentSlide) {
            e.preventDefault();
            e.stopPropagation();
            goToSlide(cardIndex);
        }
    });

    // Keyboard navigation
    $(document).off('keydown.carousel').on('keydown.carousel', function(e) {
        if ($('input:focus, textarea:focus').length === 0) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    $carousel.off('touchstart touchend').on('touchstart', function(e) {
        touchStartX = e.originalEvent.changedTouches[0].screenX;
    }).on('touchend', function(e) {
        touchEndX = e.originalEvent.changedTouches[0].screenX;
        const difference = touchStartX - touchEndX;
        
        if (Math.abs(difference) > 50) {
            if (difference > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });

    // Auto-advance without hover controls
    let autoAdvanceInterval = setInterval(nextSlide, 8000);

    // Initialize carousel
    updateCarousel();
    
    console.log('jQuery Carousel initialized successfully');
}

// Initialize when document is ready
$(document).ready(function() {
    initializeCarousel();
    
    // ... rest of existing DOMContentLoaded code ...
}); 