/*
Javascript portfolio script
Author: Dan Shan
Created: 2025-02-23
Updated: 2026-06-07
*/

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // Save the state in localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    /* Apply dark mode by default unless disabled */
    if (localStorage.getItem("darkMode") !== "disabled") {
        document.body.classList.add("dark-mode");
    }
    
    /* View count */
    const slug = 'index';
    const viewCountElement = document.getElementById('view-count');

    // Fetch the view count from the API
    fetch(`/api/view?slug=${slug}`)
        .then(res => res.json())
        .then(data => {
            if (viewCountElement) {
                viewCountElement.textContent = `Views: ${data.count}`; // Display view count
            }
        })
        .catch(err => {
            console.error("Error fetching view count:", err);
        });
    
    const dmojSolved = document.getElementById('dmoj-solved-count');
    const dmojRank = document.getElementById('dmoj-rank');
    const dmojPoints = document.getElementById('dmoj-points');
    const dmojRating = document.getElementById('dmoj-rating');
    const dmojEndpoint = '/api/dmoj';

    async function loadDmojStats() {
        console.log('DMOJ fetch starting:', dmojEndpoint);

        try {
            const res = await fetch(dmojEndpoint);
            console.log('DMOJ proxy status:', res.status, res.statusText);
            const json = await res.json();
            console.log('DMOJ proxy JSON:', json);

            const user = json?.data?.object ?? json?.object;
            if (!user) {
                console.error('Unexpected DMOJ response shape:', json);
                throw new Error('Missing data.data.object in DMOJ proxy response');
            }

            dmojSolved.textContent = user.problem_count ?? '--';
            dmojRank.textContent = user.rank ?? '--';
            dmojPoints.textContent = user.points != null ? Number(user.points).toFixed(1) : '--';
            dmojRating.textContent = user.rating ?? '--';
            console.log('DMOJ stats populated successfully');
        } catch (err) {
            console.error('DMOJ proxy fetch failed:', err);
            ['dmoj-solved-count', 'dmoj-rank', 'dmoj-points', 'dmoj-rating'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.textContent = 'N/A';
            });
        }
    }

    loadDmojStats();

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
                radius: Math.random() * 5 + 1,
                speed: Math.random() * 3 + 1
            });
        }
    }

    function drawSnowflakes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        snowflakes.forEach((flake) => {
            // Create a radial gradient for each snowflake
            let gradient = ctx.createRadialGradient(flake.x, flake.y, 0, flake.x, flake.y, flake.radius);
            gradient.addColorStop(0, "rgb(99, 205, 250)");  // Blue center
            gradient.addColorStop(1, "rgb(255, 255, 255)");  // White edges
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            ctx.fill();
        });
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
