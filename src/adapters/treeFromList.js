export const createTreeFromList = items => {
  const buildTree = (items, ID = null) =>
    items
      .filter(item => item.Parent_ID === ID)
      .map(({ ID, Title, Description }) => ({
        id: ID,
        name: Title,
        description: Description,
        children: buildTree(items, ID)
      }));

  const tree = buildTree(items, null);

  const addDepth = (arr, depth = 1) => {
    arr.forEach(node => {
      node.depth = depth;
      addDepth(node.children, depth + 1);
    });
  };

  addDepth(tree);

  return tree;
};
