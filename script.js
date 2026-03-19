// ===== Typing Animation =====
const typingText = document.getElementById('typing-text');
const words = ["Ethical Hacking", "Innovation", "Digital Security"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect on load
document.addEventListener('DOMContentLoaded', () => {
    // Initial static tagline
    typingText.textContent = "Securing systems through ";
    setTimeout(typeEffect, 1000);
});


// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.reveal');

function reveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach(element => {
        const revealTop = element.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
// Trigger once on load
reveal();


// ===== Mobile Navigation Toggle =====
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon based on state
    const icon = mobileToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});


// ===== Form Submission Handler =====
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.submit-btn');
        const originalText = btn.innerHTML;
        
        // Simulating sending state
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Payload...';
        btn.style.background = 'var(--neon-purple)';
        btn.style.color = 'white';
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Transmission Successful!';
            btn.style.background = 'var(--neon-blue)';
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.color = '';
            }, 3000);
        }, 1500);
    });
}


// ===== Cyber Background Canvas (Particles/Grid) =====
const canvas = document.getElementById('cyber-bg');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const connectionDistance = 150;

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initParticles();
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        // 50% chance for blue or purple
        this.color = Math.random() > 0.5 ? 'rgba(0, 243, 255, 0.5)' : 'rgba(188, 19, 254, 0.5)';
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const particleCount = Math.min(Math.floor(width * height / 15000), 100); // Responsive amount
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    // Grid base
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.lineWidth = 1;
    const gridSize = 50;
    
    // Optional: Draw a subtle grid if wanted
    /*
    for(let i = 0; i < width; i += gridSize) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
    }
    for(let i = 0; i < height; i += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
    }
    */

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                const opacity = 1 - (distance / connectionDistance);
                // Mix colors based on parent particle
                ctx.strokeStyle = particles[i].color.replace('0.5)', `${opacity * 0.3})`);
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}

// Init Canvas
window.addEventListener('resize', resize);
resize();
animateParticles();
