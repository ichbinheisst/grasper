const text = [
  {
    text: "Today is best day ever",
    time: { from: 7, to: 10 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Moving Day!",
    time: { from: 10.5, to: 13 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "For who?",
    time: { from: 13, to: 14.5 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Answer:",
    time: { from: 114, to: 15.5 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "The Boov",
    time: { from: 15.5, to: 16.5 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Who are the Boov?",
    time: { from: 16.5, to: 18 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Answer:",
    time: { from: 18, to: 19 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Best species ever at running away",
    time: { from: 19, to: 22.5 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "All Boov settlers, please report",
    time: { from: 22.5, to: 25.5 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "to your assigned transport",
    time: { from: 25.5, to: 26.5 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "You are allowed one carry-on",
    time: { from: 26.5, to: 28 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Excusing me",
    time: { from: 28, to: 28.5 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Sorries",
    time: { from: 28.5, to: 29 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Excusing me",
    time: { from: 29.5, to: 31 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Pardon the me, friend",
    time: { from: 31, to: 32 },
    selected: false,
    trasnlation: "",
  },
  
];
const txt = text.map((element) => {
  return {
    ...element,
    time: { from: element.time.from * 1000, to: element.time.to * 1000 },
  };
});

export default txt;
