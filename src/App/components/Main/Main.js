import { About } from "../../pages/About/About.js";
import { Home } from "../../pages/Home/Home.js";
import { links } from "../Header/Header.js"; // Import links from Header.js
import {Jamboard} from "../../pages/Jamboard/Jamboard.js"

const MainContent = document.createElement('div');
MainContent.id = 'main-content';

// Set initial page (Home page)
let currentPage = Home; // Default content is Home
MainContent.append(currentPage); // Append the initial content to MainContent

// Routing logic: Add event listeners to each link
links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default behavior (page reload)
    
    // Get the text content of the clicked link
    const Navigation = event.target.textContent;
    
    console.log(`Navigating to: ${Navigation}`);
    
    // Remove the current content from MainContent
    MainContent.innerHTML = '';

    // Check which page to display based on the clicked link
    if (Navigation === 'Home') {
        currentPage = Home;  // Set the content to the Home page
    } else if (Navigation === 'About') {
        currentPage = About;  // Set the content to the About page
    } else if (Navigation === 'Contact') {
        currentPage = Contact;  // Set the content to the Contact page (create Contact page component if not already)
    } else if(Navigation === 'Jamboard') {
      currentPage = Jamboard
    }

    // Append the selected page content to MainContent
    MainContent.append(currentPage);
  });
});

export { MainContent };
