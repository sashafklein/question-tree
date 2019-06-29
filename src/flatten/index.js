const omit = (obj, keys = []) => {
  const dup = Object.assign({}, obj);
  keys.forEach(k => delete dup[k]);
  return dup;
};

const flattenTree = (flatNodeArray, currentTree) => {
  if (currentTree instanceof Array) {
    console.log("here", currentTree);
    return flattenTree([], {
      assertions: currentTree
    });
  } else if (!currentTree.assertions) {
    return [...flatNodeArray, currentTree];
  } else {
    const childAssertions = currentTree.assertions.reduce(
      (arr, assertion) => [...arr, ...flattenTree([], assertion)],
      []
    );

    const newCurrent = {
      ...currentTree,
      assertionIds: currentTree.assertions.map(a => a.id)
    };
    delete newCurrent.assertions;

    return [...flatNodeArray, newCurrent, ...childAssertions];
  }
};

export const newFlatten = tree => {
  let flattened = [
    {
      ...omit(tree, ["assertions"]),
      assertionIds: (tree.assertions || []).map(a => a.id)
    }
  ];

  (tree.assertions || []).forEach(assertion => {
    const newArray = newFlatten(assertion);
    newArray.forEach(element => {
      flattened.push(element);
    });
  });

  return flattened;
};

export default flattenTree;
