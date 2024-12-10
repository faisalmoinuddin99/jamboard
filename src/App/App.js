import { Footer } from "./components/Footer/Footer.js";
import { Header } from "./components/Header/Header.js";
import { MainContent } from "./components/Main/Main.js";

const root = document.createElement("div");
root.id = "root";

root.append(Header, MainContent, Footer);

console.log("App initialized with root id:", root.id);

export { root };
