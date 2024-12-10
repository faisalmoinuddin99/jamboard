const Footer = document.createElement("footer");
Footer.setAttribute("id", "footer");

const copyright = document.createElement("p");
copyright.textContent = "© 2022 MyApp. All rights reserved.";

Footer.appendChild(copyright);

export { Footer };
