const text = [
  {
    text: "Tommy,",
    time: { from: 7, to: 8},
    selected: false,
    trasnlation: "",
  },
  { text: "I-", time: { from: 8, to: 8.5 }, selected: false, trasnlation: "" },
  {
    text: "Tommy, Tommy,listen to me",
    time: { from: 8, to: 9 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "He's the contractor, okay?",
    time: { from: 9, to: 12 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "I can't lose this job",
    time: { from: 12, to: 13.5 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "I understand",
    time: { from: 14.5, to: 16.5 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Let's talk about this in the morning, okay?",
    time: { from: 17, to: 19 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "We'll talk about it in the morning",
    time: { from: 19, to: 21.5 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Alright, goodnight",
    time: { from: 22.5, to: 24 },
    selected: false,
    trasnlation: "",
  },
  { text: "Hey", time: { from: 24, to: 25 }, selected: false, trasnlation: "" },
  { text: "Scoot", time: { from: 25, to: 26 }, selected: false, trasnlation: "" },
  {
    text: "Fun day at work, huh?",
    time: { from: 26, to: 30 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "What are you still doing up? It's late",
    time: { from: 32, to: 34 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Oh crud",
    time: { from: 34, to: 34.6 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "What time is it?",
    time: { from: 34.5, to: 35.5 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "It's way past your bedtime",
    time: { from: 35.5, to: 37.5 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "But it's still today",
    time: { from: 37.5, to: 39 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Honey, please not right now",
    time: { from: 39, to: 40 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "I do not have the energy for this",
    time: { from: 40, to: 42.5 },
    selected: false,
    trasnlation: "",
  },
  { text: "Here", time: { from: 43, to: 44 }, selected: false, trasnlation: "" },
  {
    text: "What's this?",
    time: { from: 44.5, to: 46 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Your birthday",
    time: { from: 46, to: 47.5 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "You kept complaining about your broken watch",
    time: { from: 52, to: 55.5 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "So I figured, you know",
    time: { from: 56, to: 58.5 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "You like it?",
    time: { from: 58.5, to: 60 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Honey, this is",
    time: { from: 63, to: 64 },
    selected: false,
    trasnlation: "",
  },
  { text: "What?", time: { from: 64, to: 65.5 }, selected: false, trasnlation: "" },
  {
    text: "It's nice, but I-",
    time: { from: 64.5, to: 66.5 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "I think it's stuck",
    time: { from: 68, to: 69.5 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "It's not",
    time: { from: 69.5, to: 70 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "What? No, no, no, no",
    time: { from: 70, to: 71 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Oh, ha, ha",
    time: { from: 72, to: 73 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Where did you get the money for this?",
    time: { from: 74.5, to: 76 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Drugs,I sell hardcore drugs",
    time: { from: 76, to: 79 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Oh, good",
    time: { from: 79, to: 80 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "You can start helping out with the mortgage then",
    time: { from: 80, to: 82 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Stsh - yeah, you wish",
    time: { from: 82, to: 83.5 },
    selected: false,
    trasnlation: "",
  },
  {
    text: "Goodnight, baby girl",
    time: { from: 112.5, to: 114 },
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
