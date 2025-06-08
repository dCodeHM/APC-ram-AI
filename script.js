// Function to handle smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add click event listeners to all carousel cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.carousel-card');
    const isMobile = window.innerWidth <= 700;
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent event bubbling
            e.stopPropagation();
            
            const index = this.getAttribute('data-index');
            let sectionId;
            
            // Map the card index to the corresponding section ID
            switch(index) {
                case '0':
                    sectionId = 'course-registration';
                    break;
                case '1':
                    sectionId = 'schedules';
                    break;
                case '2':
                    sectionId = 'campus-facilities';
                    break;
            }
            
            if (sectionId) {
                // Smooth scroll to the section
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Update mobile detection on window resize
    window.addEventListener('resize', function() {
        isMobile = window.innerWidth <= 700;
    });
}); 