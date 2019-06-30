import React from "react";
import Markdown from "react-markdown";

import "./App.css";
import flattenTree from "./flatten";
import tree from "./tree";

const flatTree = flattenTree(tree);

const getNode = (id, throwError = true) => {
  const node = flatTree.find(n => n.id === id);
  if (!node && throwError) throw new Error(`No node with ID: ${id}`);
  return node;
};

function App() {
  const id = window.location.pathname.split("/")[1];
  let node = getNode(id, false);
  let question, statement, responses;

  if (node) {
    statement = node.statement;
    if (node.questionId) {
      node = getNode(node.questionId);
    }
    question = node.question;
    responses = node.responseIds.length
      ? node.responseIds.map(rId => getNode(rId))
      : [{ statement: "Return to the beginning.", responseIds: [""] }];
  } else {
    question = "What is your concern?";
    statement = "Choose a starting statement";
    responses = flatTree.filter(n => !n.id.includes("."));
  }

  return (
    <div className="App">
      <h2>
        <Markdown source={question} />
      </h2>
      <ul>
        {responses.map(response => (
          <li
            key={response.statement}
            onClick={() => {
              window.location.replace(response.id);
            }}
          >
            <Markdown source={response.statement} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
