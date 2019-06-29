import flattenTree, { newFlatten } from "./index";
import mainTree from "../tree";

const tree = {
  id: "1",
  text: "Curabitur fringilla pulvinar massa vel commodo.",
  response:
    "Phasellus vestibulum elementum ante, eget sollicitudin lorem blandit eu.",
  assertions: [
    {
      id: "1.1",
      text:
        "Integer sit amet magna in turpis placerat hendrerit pellentesque ut diam.",
      response: "Etiam vitae arcu massa."
    },
    {
      id: "1.2",
      text: "Sed tellus elit, malesuada eu tincidunt in, venenatis in nulla.",
      response:
        "Vestibulum elit enim, sagittis nec vehicula et, accumsan et ex."
    },
    {
      id: "1.3",
      text:
        "Nunc nunc lorem, congue interdum leo euismod, imperdiet pellentesque lacus.",
      response: "Fusce posuere metus lacus, vel faucibus nisi malesuada a. ",
      assertions: [{ id: "1.3.1", text: "Whatever", response: "Hello" }]
    }
  ]
};

describe("flattenTree", () => {
  it("flattens the tree", () => {
    const result = flattenTree([], tree);
    expect(result).toEqual([
      {
        id: "1",
        response:
          "Phasellus vestibulum elementum ante, eget sollicitudin lorem blandit eu.",
        text: "Curabitur fringilla pulvinar massa vel commodo.",
        assertionIds: ["1.1", "1.2", "1.3"]
      },
      {
        id: "1.1",
        response: "Etiam vitae arcu massa.",
        text:
          "Integer sit amet magna in turpis placerat hendrerit pellentesque ut diam."
      },
      {
        id: "1.2",
        response:
          "Vestibulum elit enim, sagittis nec vehicula et, accumsan et ex.",
        text: "Sed tellus elit, malesuada eu tincidunt in, venenatis in nulla."
      },
      {
        id: "1.3",
        response: "Fusce posuere metus lacus, vel faucibus nisi malesuada a. ",
        text:
          "Nunc nunc lorem, congue interdum leo euismod, imperdiet pellentesque lacus.",
        assertionIds: ["1.3.1"]
      },
      { id: "1.3.1", response: "Hello", text: "Whatever" }
    ]);

    const res = newFlatten(mainTree);
    console.log(JSON.stringify(res, null, 2));
  });
});
