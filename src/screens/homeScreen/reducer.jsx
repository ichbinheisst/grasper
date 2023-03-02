 export const reducerTest = (state, action) => {
  switch (action.type) {
    case "COMPLETE":
      console.log("bora bill");

    default:
      return state;
  }
};
