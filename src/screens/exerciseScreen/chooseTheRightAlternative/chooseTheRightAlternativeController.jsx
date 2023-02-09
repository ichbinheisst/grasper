import { Homephones } from "../../../../assets/homophones/homophones";
import { Audio } from "expo-av";

function filterSubTitle(data) {
  const response = [];
  data.forEach((sentence) => {
    const text = sentence.text;
    if (!text.includes("</>") && text.split(" ").length > 3) {
      response.push({
        text: text.split(" "),
        time: sentence.time,
      });
    }
  });
  return response;
}

function findHomo(data) {
  const subtitle = filterSubTitle(data);
  const response = [];
  const unique = [];
  subtitle.forEach((sentence) => {
    sentence.text.forEach((txt, index) => {
      const res = Homephones.find((homo) => homo.word == txt);
      if (res && !unique.some((stc) => stc == sentence.text)) {
        unique.push(sentence.text);
        const x = {
          answer: res.word,
          sentence: sentence.text.reduce((prev, cur) => `${prev} ${cur}`),
          time: sentence.time,
          options: [...res.homephones, res.word].sort(),
        };

        response.push(x);
      }
    });
  });

  return response;
}

function assemble(data) {
  const activity = findHomo(data);
  const response = [];
  activity.forEach((item) => {
    if (item.sentence.includes(item.answer)) {
      const textArray = item.sentence.split(" ");
      const index = textArray.findIndex((word) => word == item.answer);
      const copy = [...textArray];
      copy[index] = "_____";
      response.push({
        ...item,
        sentence: copy.reduce((prev, cur) => `${prev} ${cur}`),
      });
    }
  });

  return response;
}

export function generateActivity(data) {
  if (!data) {
    return [];
  }
  let activities = assemble(data);

  const NoRepeated = [];

  activities.forEach((item) => {
    if (!NoRepeated.some((stc) => stc.answer == item.answer)) {
      NoRepeated.push(item);
    }
    console.log(NoRepeated);
  });

  let sortedActivity = NoRepeated.sort();

  return sortedActivity;
}

export async function StopPlay(audio) {
  await audio.pauseAsync();
}
export async function PlayPause(audio, setIsplaying, data) {
  if (!audio && !unscrambleData.length) {
    return;
  }
  let status = await audio.getStatusAsync();
  if (status?.isPlaying) {
    await audio.pauseAsync();
    setIsplaying(false);
    return;
  }
  await audio.setPositionAsync(data.time.from);
  await audio.playAsync();
  setIsplaying(true);
}
