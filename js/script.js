// script.js

// Image Slider Configuration
const sliderConfig = {
    images: [
        'assets/image1.jpeg',
        'assets/image2.jpeg',
        'assets/image3.png'
    ],
    autoSlideInterval: 5000,
    transitionDuration: 1000
};

// Slider Class
class ImageSlider {
    constructor(config) {
        this.images = config.images;
        this.autoSlideInterval = config.autoSlideInterval;
        this.transitionDuration = config.transitionDuration;
        this.currentIndex = 0;
        this.sliderImage = document.getElementById('slider-image');
        this.autoSlideTimer = null;
    }

    // Initialize Slider
    init() {
        this.startAutoSlide();
        this.addEventListeners();
    }

    // Next Image Method
    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    }

    // Previous Image Method
    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }

    // Update Image Source
    updateImage() {
        this.sliderImage.style.opacity = 0;
        
        setTimeout(() => {
            this.sliderImage.src = this.images[this.currentIndex];
            this.sliderImage.style.opacity = 1;
        }, this.transitionDuration / 2);
    }

    // Start Auto Slide
    startAutoSlide() {
        this.autoSlideTimer = setInterval(() => {
            this.nextImage();
        }, this.autoSlideInterval);
    }

    // Stop Auto Slide
    stopAutoSlide() {
        clearInterval(this.autoSlideTimer);
    }

    // Add Event Listeners
    addEventListeners() {
        const nextButton = document.querySelector('.slider-controls button:last-child');
        const prevButton = document.querySelector('.slider-controls button:first-child');

        nextButton.addEventListener('click', () => this.nextImage());
        prevButton.addEventListener('click', () => this.prevImage());

        // Pause on hover
        this.sliderImage.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.sliderImage.addEventListener('mouseleave', () => this.startAutoSlide());
    }
}

// Form Validation and Submission Class
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form form');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.messageInput = document.getElementById('message');
        
        this.init();
    }

    // Initialize Form
    init() {
        this.addEventListeners();
    }

    // Add Event Listeners
    addEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.nameInput.addEventListener('input', () => this.validateName());
        this.emailInput.addEventListener('input', () => this.validateEmail());
        this.messageInput.addEventListener('input', () => this.validateMessage());
    }

    // Validate Name
    validateName() {
        const nameValue = this.nameInput.value.trim();
        const nameError = document.getElementById('name-error');

        if (nameValue.length < 2) {
            this.showError(this.nameInput, 'Name must be at least 2 characters');
            return false;
        } else {
            this.clearError(this.nameInput);
            return true;
        }
    }

    // Validate Email
    validateEmail() {
        const emailValue = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailValue)) {
            this.showError(this.emailInput, 'Please enter a valid email');
            return false;
        } else {
            this.clearError(this.emailInput);
            return true;
        }
    }

    // Validate Message
    validateMessage() {
        const messageValue = this.messageInput.value.trim();

        if (messageValue.length < 10) {
            this.showError(this.messageInput, 'Message must be at least 10 characters');
            return false;
        } else {
            this.clearError(this.messageInput);
            return true;
        }
    }

    // Show Error Message
    showError(input, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;

        const existingError = input.nextElementSibling;
        if (existingError && existingError.classList.contains('error-message')) {
            existingError.remove();
        }

        input.classList.add('input-error');
        input.insertAdjacentElement('afterend', errorElement);
    }

    // Clear Error Message
    clearError(input) {
        input.classList.remove('input-error');
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
    }

    // Handle Form Submission
    handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isMessageValid = this.validateMessage();

        // If all validations pass
        if (isNameValid && isEmailValid && isMessageValid) {
            this.submitForm();
        }
    }

    // Submit Form Data
    submitForm() {
        const formData = {
            name: this.nameInput.value.trim(),
            email: this.emailInput.value.trim(),
            message: this.messageInput.value.trim()
        };

        // Simulated form submission
        this.sendFormData(formData)
            .then(response => {
                this.showSuccessMessage('Message sent successfully!');
                this.resetForm();
            })
            .catch(error => {
                this.showErrorMessage('Failed to send message. Please try again.');
            });
    }

    // Simulate Sending Form Data
    sendFormData(data) {
        return new Promise((resolve, reject) => {
            // Simulated API call
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve(true);
            }, 1500);
        });
    }

    // Show Success Message
    showSuccessMessage(message) {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = message;
        this.form.prepend(successMessage);

        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }

    // Show Error Message
    showErrorMessage(message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        this.form.prepend(errorMessage);

        setTimeout(() => {
            errorMessage.remove();
        }, 3000);
    }

    // Reset Form
    resetForm() {
        this.nameInput.value = '';
        this.emailInput.value = '';
        this.messageInput.value = '';
    }
}

// Navbar Scroll Effect
class NavbarScrollEffect {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
}

// Smooth Scroll
function smoothScroll() {
    const navLinks = document.querySelectorAll('.navbar-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Initialize All Functionalities
function initializePage() {
    // Image Slider
    const imageSlider = new ImageSlider(sliderConfig);
    imageSlider.init();

    // Contact Form
    const contactForm = new ContactForm();

    // Navbar Scroll Effect
    new NavbarScrollEffect();

    // Smooth Scroll
    smoothScroll();
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePage);