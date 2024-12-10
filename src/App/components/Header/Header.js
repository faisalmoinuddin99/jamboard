import { routes } from "../../../routes/routes.js";

const Header = document.createElement("header");
Header.setAttribute("id", "header");

const nav = document.createElement("nav");
nav.setAttribute("id", "navbar");
const ul = document.createElement("ul");

const navLink = routes;

// Create and append links dynamically based on navLink array
const links = []; // Array to hold the anchor elements

// Create and append links dynamically based on navLink array
navLink.forEach((linkData) => {
  const link = document.createElement("a");
  link.href = linkData.href;
  link.textContent = linkData.text;

  // Append each link to the navbar
  nav.appendChild(link);

  // Store the link element in the links array
  links.push(link);

  // Add a separator for better presentation
  nav.appendChild(document.createTextNode(" | "));
});

nav.appendChild(ul);
Header.appendChild(nav);

export { Header, links };
