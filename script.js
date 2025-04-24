// 🌐 Select essential DOM elements for interaction
const nav_section = document.querySelector(".nav-section"); // Navigation sidebar
const nav_btn = document.querySelector("#active-btn"); // Button to toggle nav
const education_experience = document.querySelectorAll(".education-experience"); // Cards for education/experience
const progressCircles = document.querySelectorAll('.circle-progress'); // Circular progress indicators
const mode_theme = document.querySelector("#mode-theme"); // Button to toggle theme mode
const color_theme = document.querySelector("#color-theme"); // Button to toggle theme color options
const sections = document.querySelectorAll('section'); // All main sections on the page
const navLinks = document.querySelectorAll('.nav-section li a'); // Navigation links

let isDark = true; // Tracks current theme mode (dark by default)

// 🔁 Toggle navigation sidebar and menu icon
nav_btn.addEventListener('click', () => {
    nav_section.classList.toggle("active"); // Show/hide sidebar
    nav_btn.classList.toggle("fa-bars"); // Toggle between hamburger icon
    nav_btn.classList.toggle("fa-x"); // And close (X) icon
});

// 🎨 Adds mouse tracking hover effect to cards
education_experience.forEach(item => {
    item.addEventListener('mousemove', e => {
        // Update custom CSS properties to reflect mouse position
        item.style.setProperty('--x', (e.pageX - item.offsetLeft) + 'px');
        item.style.setProperty('--y', (e.pageY - item.offsetTop) + 'px');
    });
});

// ⭕ Animate circular progress indicators using conic gradient
progressCircles.forEach(item => {
    let startDegree = 0;
    const endDegree = parseInt(item.getAttribute('data-degree'), 10); // Desired percentage

    const progress = setInterval(() => {
        startDegree++;
        // Update background with animated conic gradient
        item.style.background = `conic-gradient(var(--primary-color) ${startDegree * 3.6}deg, var(--bg-light-color) 0deg)`;
        // Update visible percentage text
        item.querySelector('span').textContent = `${startDegree}%`;

        // Stop animation when goal is reached
        if (startDegree === endDegree) {
            clearInterval(progress);
        }
    }, 10); // Interval in ms for smooth animation
});

// 🎨 Toggle visibility of color theme selection container
color_theme.addEventListener('click', () => {
    const themeContainer = document.querySelector(".theme-container");
    themeContainer.style.right = (themeContainer.style.right === "0px") ? "-210px" : "0px";
});

// 🌗 Toggle between dark and light themes
mode_theme.addEventListener('click', () => {
    if (isDark) {
        // Light mode
        document.documentElement.style.setProperty('--bg-dark-color', 'rgb(240, 240, 240)');
        document.documentElement.style.setProperty('--bg-light-color', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--text-color-primary', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--text-color-secondary', 'rgb(101, 101, 101)');
    } else {
        // Dark mode
        document.documentElement.style.setProperty('--bg-dark-color', 'rgb(5, 5, 5)');
        document.documentElement.style.setProperty('--bg-light-color', 'rgb(40, 40, 40)');
        document.documentElement.style.setProperty('--text-color-primary', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--text-color-secondary', 'rgb(182, 182, 182)');
    }

    // Toggle theme icon (sun/moon)
    mode_theme.classList.toggle("fa-sun");
    mode_theme.classList.toggle("fa-moon");
    isDark = !isDark;
});

// 🎯 Update primary color dynamically
function colorChange(primary, dark, light) {
    document.documentElement.style.setProperty('--primary-color', primary);
    document.documentElement.style.setProperty('--primary-color-dark', dark);
    document.documentElement.style.setProperty('--primary-color-light', light);
}

// 🧭 Highlight current section in navbar while scrolling
window.onscroll = () => {
    const top = window.scrollY;

    sections.forEach(sec => {
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active-section'));

            const activeLink = document.querySelector('.nav-section li a[href*=' + id + ']');
            if (activeLink) {
                activeLink.classList.add('active-section');
            }
        }
    });
};

// ✍️ Auto typing effect using Typed.js
var typed = new Typed('.auto-type', {
    strings: ['Software Engineer', 'Full Stack Developer', 'Competitive Programmer', 'Web Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 500,
    loop: true
});

// 📜 Certificate modal view functionality (supports PDF & images)
function openModal(filePath) {
    const modal = document.getElementById("certificateModal");
    const iframe = document.getElementById("certificateFrame");
    const image = document.getElementById("certificateImage");

    const isImage = filePath.match(/\.(jpeg|jpg|png|gif)$/i);

    // Show image or PDF accordingly
    if (isImage) {
        image.src = filePath;
        image.style.display = "block";
        iframe.style.display = "none";
    } else {
        iframe.src = filePath;
        iframe.style.display = "block";
        image.style.display = "none";
    }

    modal.style.display = "block";
    document.body.classList.add("no-scroll"); // Prevent background scrolling
}

// ❌ Close modal and reset contents
function closeModal() {
    const modal = document.getElementById("certificateModal");
    const iframe = document.getElementById("certificateFrame");
    const image = document.getElementById("certificateImage");

    iframe.src = "";
    image.src = "";
    modal.style.display = "none";
    document.body.classList.remove("no-scroll");
}

// 📦 Close modal when clicking outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById("certificateModal");
    if (event.target === modal) {
        closeModal();
    }
};

// 🌀 Animate elements using Intersection Observer when scrolled into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate'); // Trigger animation
            observer.unobserve(entry.target); // Only once
        }
    });
}, {
    threshold: 0.1 // Trigger when 10% is visible
});

// 👁️ Apply observer to all certificate cards
document.querySelectorAll('.certificate-card').forEach(card => {
    observer.observe(card);
});





