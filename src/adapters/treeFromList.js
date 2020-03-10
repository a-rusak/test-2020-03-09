export const createTreeFromList = (items, ID = null) =>
  items
    .filter(item => item.Parent_ID === ID)
    .map(({ ID, Title }) => ({
      id: ID,
      name: Title,
      children: createTreeFromList(items, ID)
    }));
