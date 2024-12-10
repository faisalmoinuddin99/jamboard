const About = document.createElement("section");

About.setAttribute("id", "about-page");

About.innerHTML = `
<h1>About Jamboard</h1>
<p>Jamboard is a simple, open-source note-taking app that lets you create, edit, and delete notes in real-time. It's built with React and Firebase, making it easy to deploy and scale.</p>
<a href="https://github.com/jamboardapp/jamboard" target="_blank">View on GitHub`;

export { About };
