import { NanoReact } from "./Modules/createElement";

// jsx example
/** @jsx NanoReact.createElement */
const element = (
  <div style="background: salmon">
    <h1>Hello World</h1>
    <h2 style="text-align:right">from NanoReact</h2>
  </div>
);
const container = document.getElementById("root");
NanoReact.render(element, container);
