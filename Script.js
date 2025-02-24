/*
Javascript portfolio script
Author: HumanThe2nd
Created: 2025-02-23
*/
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // Save the user preference in local storage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// Check user preference on page load
window.onload = function () {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
};
