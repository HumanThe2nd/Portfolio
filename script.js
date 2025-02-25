/*
Javascript portfolio script
Author: HumanThe2nd
Created: 2025-02-23
*/
document.addEventListener("DOMContentLoaded", () => {
    /* Dark Mode */
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    /* Snow Effect */
    const canvas = document.getElementById("snowCanvas");
    if (!canvas) {
        console.error("Canvas element not found.");
        return; // Stop execution if the canvas doesn't exist
    }

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas(); // Set initial canvas size
    window.addEventListener("resize", resizeCanvas); // Adjust canvas when window resizes

    let snowflakes = [];

    function createSnowflakes() {
        snowflakes = []; // Clear existing flakes
        for (let i = 0; i < 100; i++) {
            snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 4 + 1,
                speed: Math.random() * 3 + 1
            });
        }
    }

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
});


window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
