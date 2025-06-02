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