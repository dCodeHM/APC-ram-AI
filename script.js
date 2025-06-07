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
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
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
                scrollToSection(sectionId);
            }
        });
    });
}); 