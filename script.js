const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

const particles = [];
const icon = new Image();
icon.src = 'icon.png';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 30; 
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x + this.size > canvas.width || this.x < 0) {
            this.speedX *= -1;
        }
        if (this.y + this.size > canvas.height || this.y < 0) {
            this.speedY *= -1;
        }
    }
    draw() {
        ctx.drawImage(icon, this.x, this.y, this.size, this.size);
    }
}

function initParticles() {
    for (let i = 0; i < 40; i++) { 
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

icon.onload = () => {
    initParticles();
    animate();
};
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

showSlide(currentSlide);
setInterval(nextSlide, 3000); 
