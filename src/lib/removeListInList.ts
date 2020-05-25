function removeListInList<Data>(originList: Data[], removeList: Data[]) {
  let res: Data[] = originList;

  removeList.forEach((data) => {
    originList.filter(d => d !== data);
  });

  return res;
};

export default removeListInList;