/*
Javascript portfolio script
Author: HumanThe2nd
Created: 2025-02-23
*/
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
}

// Apply dark mode if it was enabled previously
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
});

// Check user preference on page load
window.onload = function () {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
};
/* contact form */
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    alert("Message sent successfully!");
});
const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];

function createSnowflakes() {
    for (let i = 0; i < 100; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 4 + 1,
            speed: Math.random() * 3 + 1
        });
    }
}
/* Snow effect */
function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    snowflakes.forEach((flake) => {
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    });
    ctx.fill();
    moveSnowflakes();
}

function moveSnowflakes() {
    snowflakes.forEach((flake) => {
        flake.y += flake.speed;
        if (flake.y > canvas.height) {
            flake.y = 0;
            flake.x = Math.random() * canvas.width;
        }
    });
}

function animateSnow() {
    drawSnowflakes();
    requestAnimationFrame(animateSnow);
}

createSnowflakes();
animateSnow();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
