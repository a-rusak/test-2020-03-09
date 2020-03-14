export const createTreeFromList = (items, ID = null) =>
  items
    .filter(item => item.Parent_ID === ID)
    .map(({ ID, Title, Description }) => ({
      id: ID,
      name: Title,
      description: Description,
      children: createTreeFromList(items, ID)
    }));
