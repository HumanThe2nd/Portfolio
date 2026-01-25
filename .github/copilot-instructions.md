# GitHub Copilot Instructions for Portfolio Project

## Overview
This document provides guidance for AI coding agents working on the Portfolio project. The project is structured to showcase various web development skills, utilizing HTML, CSS, and JavaScript, along with a Node.js backend.

## Architecture
- **Frontend**: The frontend consists of HTML files (e.g., `index.html`, `projects.html`) styled with CSS (`style.css`) and interactive JavaScript (`script.js`). The main components include:
  - **Navigation**: Links to different sections of the portfolio.
  - **Canvas**: Used for visual effects (e.g., snow animation).

- **Backend**: The project uses Node.js with Express for server-side operations. The `server.js` file (not shown) handles requests and serves the frontend files.

## Developer Workflows
- **Starting the Server**: Use the command `npm start` to launch the server. This runs the script defined in `package.json`.
- **Testing**: Ensure to test the application in various browsers to verify compatibility and responsiveness.

## Project-Specific Conventions
- **Dark Mode Toggle**: Implemented in `script.js`, allowing users to switch between light and dark themes. The state is saved in `localStorage`.
- **CSS Transitions**: Smooth transitions are applied for background and text color changes in `style.css`.

## Integration Points
- **External Dependencies**: The project relies on `express` for server functionality and `mongodb` for database interactions. Ensure these packages are installed via npm.
- **Cross-Component Communication**: The frontend communicates with the backend through HTTP requests, which should be handled in the `server.js` file.

## Key Files
- **HTML Files**: `index.html`, `projects.html` - Structure the content.
- **CSS File**: `style.css` - Styles the application.
- **JavaScript File**: `script.js` - Handles interactivity and state management.
- **Server File**: `server.js` - Manages backend operations.

## Conclusion
This document should serve as a foundational guide for AI agents to understand the Portfolio project structure and workflows. For any unclear sections, please provide feedback for further clarification.