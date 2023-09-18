function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

// for primitive values like strings and numbers
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);
  // assign props
  const isProperty = (key) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });
  // render children
  element.props.children.forEach((child) => {
    render(child, dom);
  });
  container.appendChild(dom);
}

// work loop logic ensuring that rendering tasks don't block the main thread for too long
let nextUnitOfWork = null
​
function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}
​
requestIdleCallback(workLoop)
​
function performUnitOfWork(nextUnitOfWork) {
  // TODO
}

// the library
export const NanoReact = {
  createElement,
  render,
};

// Element creation in DOM

// const element = {
//     type: "h1",
//     props: {
//       title: "foo",
//       children: "Hello",
//     },
//   }
//   ​
//   const container = document.getElementById("root")
//   ​
//   const node = document.createElement(element.type)
//   node["title"] = element.props.title
//   ​
//   const text = document.createTextNode("")
//   text["nodeValue"] = element.props.children
//   ​
//   node.appendChild(text)
//   container.appendChild(node)
