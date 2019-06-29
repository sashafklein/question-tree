import React, { useState } from "react";
import logo from "./logo.svg";

import "./App.css";
import flattenTree from "./flatten";
import tree from "./tree";

const flatTree = flattenTree([], tree);

const getNode = id => flatTree.find(n => n.id === id);
function App() {
  const id = window.location.pathname.split("/")[1];
  const node = getNode(id) || {};
  const text = node.text || "What is your concern?";
  const assertions = (node.assertionIds || getNode("1").assertionIds).map(
    getNode
  );
  const response =
    node.response ||
    (node.nextId && getNode(node.nextId) && getNode(node.nextId).response);

  console.log({ id, node, response, flatTree });
  return (
    <div className="App">
      <pre>
        <h2>{text}</h2>
        <h3>{response}</h3>
        <ul>
          {assertions.map(assertion => (
            <li
              key={assertion.text}
              onClick={() => {
                window.location.replace(assertion.id);
              }}
            >
              {assertion.text}
            </li>
          ))}
        </ul>
      </pre>
    </div>
  );
}

export default App;
