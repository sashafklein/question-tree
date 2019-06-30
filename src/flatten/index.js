import { omit } from "lodash";

const flattenTree = (tree, nextId = "1") => {
  if (tree instanceof Array) {
    return tree.reduce((arr, resp, ind) => {
      const flattened = flattenTree(resp, `${ind + 1}`);
      return [...arr, ...flattened];
    }, []);
  }

  if (tree.responses && !tree.responses.map) {
    debugger;
  }
  let flattened = [
    {
      ...omit(tree, ["responses"]),
      id: nextId,
      responseIds: tree.responses
        ? tree.responses.map((r, i) => `${nextId}.${i + 1}`)
        : tree.responseIds || []
    }
  ];

  if (tree.responses) {
    tree.responses.forEach((response, index) => {
      const newArray = flattenTree(response, `${nextId}.${index + 1}`);
      newArray.forEach(element => {
        flattened.push(element);
      });
    });
  }

  return flattened;
};

export default flattenTree;
