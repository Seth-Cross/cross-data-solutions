const mobileMenuButton = document.querySelector('.mobile-menu');
const navbarLinks = document.getElementById('navbar-links');
const navbar = document.querySelector('.navbar');
const aboutUsSection = document.getElementById('about'); // Ensure this is the correct ID
const backToTopButton = document.querySelector('.back-to-top');

// Toggle mobile menu
mobileMenuButton.addEventListener('click', function () {
    navbarLinks.classList.toggle('active');
});

// Ensure service cards remain white on hover
document.querySelectorAll('.service-card').forEach(function (card) {
    card.addEventListener('mouseover', function () {
        this.style.backgroundColor = 'white'; // Ensure white background on hover
    });
    card.addEventListener('mouseout', function () {
        this.style.backgroundColor = 'white'; // Reset to white after hover
    });
});

// Set up intersection observer for navbar visibility based on About Us section
document.addEventListener("DOMContentLoaded", function() {
    // Initially, make sure the navbar is visible
    navbar.classList.remove('hidden');

    // Intersection Observer to hide navbar when About Us section enters view
    const aboutUsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hide the navbar when About Us section enters the viewport
                navbar.classList.add('hidden');
            } else {
                // Show the navbar when About Us section leaves the viewport
                navbar.classList.remove('hidden');
            }
        });
    }, {
        root: null, // Use the viewport
        threshold: 0.1 // Trigger when 10% of the About Us section is in view
    });

    aboutUsObserver.observe(aboutUsSection);

    // Set up intersection observer for service cards to animate them as they come into view
    const cards = document.querySelectorAll('.service-card');

    const observerOptions = {
        root: null, // Use the viewport as the root
        threshold: 0.5 // Trigger animation when 50% of the card is visible
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'visible' class when the card is in view
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once the card has been animated
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        // Add the 'animate-card' class to each card
        card.classList.add('animate-card');
        cardObserver.observe(card); // Start observing each card
    });

    // Smooth scroll to top functionality
    backToTopButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

