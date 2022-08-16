export const formatColumns = (columns) => {
  return columns.map((key, index) => {
    return { id: index, title: key };
  });
};
