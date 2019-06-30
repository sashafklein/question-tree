import flattenTree from "./index";

const tree = {
  statement: "Curabitur fringilla pulvinar massa vel commodo.",
  question:
    "Phasellus vestibulum elementum ante, eget sollicitudin lorem blandit eu.",
  responses: [
    {
      statement:
        "Integer sit amet magna in turpis placerat hendrerit pellentesque ut diam.",
      question: "Etiam vitae arcu massa."
    },
    {
      statement:
        "Sed tellus elit, malesuada eu tincidunt in, venenatis in nulla.",
      question:
        "Vestibulum elit enim, sagittis nec vehicula et, accumsan et ex."
    },
    {
      statement:
        "Nunc nunc lorem, congue interdum leo euismod, imperdiet pellentesque lacus.",
      question: "Fusce posuere metus lacus, vel faucibus nisi malesuada a. ",
      responses: [{ statement: "Whatever", question: "Hello" }]
    }
  ]
};

describe("flattenTree", () => {
  it("flattens the tree", () => {
    const result = flattenTree(tree);

    expect(result).toEqual([
      {
        statement: "Curabitur fringilla pulvinar massa vel commodo.",
        question:
          "Phasellus vestibulum elementum ante, eget sollicitudin lorem blandit eu.",
        id: "1",
        responseIds: ["1.1", "1.2", "1.3"]
      },
      {
        statement:
          "Integer sit amet magna in turpis placerat hendrerit pellentesque ut diam.",
        question: "Etiam vitae arcu massa.",
        id: "1.1",
        responseIds: []
      },
      {
        statement:
          "Sed tellus elit, malesuada eu tincidunt in, venenatis in nulla.",
        question:
          "Vestibulum elit enim, sagittis nec vehicula et, accumsan et ex.",
        id: "1.2",
        responseIds: []
      },
      {
        statement:
          "Nunc nunc lorem, congue interdum leo euismod, imperdiet pellentesque lacus.",
        question: "Fusce posuere metus lacus, vel faucibus nisi malesuada a. ",
        id: "1.3",
        responseIds: ["1.3.1"]
      },
      {
        statement: "Whatever",
        question: "Hello",
        id: "1.3.1",
        responseIds: []
      }
    ]);
  });
});
