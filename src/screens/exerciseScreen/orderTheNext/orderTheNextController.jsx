import { Audio } from "expo-av";
import { v4 as uuidv4 } from "uuid";

export function generateExercise(data) {
  const croped = cropSentences(data);
  if (!croped.length) return [];

  const exercise = cropExerciseSize(croped);
  const response = [];

  exercise.forEach((item) => {
    const sentences = item.activity;
    const exercise = {
      time: {
        from: sentences[0].time.from,
        to: sentences[sentences.length - 1].time.to,
      },
      sentences: sentences.map((elements) => {
        return {
          text: elements.text,
          textId: uuidv4(),
        };
      }),
      answer: sentences
        .map((elements) => elements.text)
        .reduce((cur, prev) => cur + prev),
    };
    response.push(exercise);
  });

  if (!response.length) return response;

  const sorted = response.map((stc) => {
    let novo = stc.sentences
      .map((sen) => {
        return sen;
      })
      .sort();

    return {
      sentences: novo.sort((a, b) => {
        if (a.text.length < b.text.length) {
          return -1;
        }
        if (a.text.length < b.text.length) {
          return 1;
        }
        return 0;
      }),

      time: stc.time,
      answer: stc.answer,
    };
  });

  return sorted;
}

function findLongestLength(array) {
  const data = JSON.parse(JSON.stringify(array));

  let longest = 0;

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const leng = element.text.split(" ").length;
    if (leng > longest) {
      longest = leng;
    }
  }
  return longest;
}

export function cropExerciseSize(data) {
  const response = [];

  data.forEach((piece) => {
    const longest = findLongestLength(piece.activity);
    if (longest <20) {
      response.push(piece);
    }
  });

  return response;
}

export function cropSentences(data) {
  if (!data) return [];
  const dataSize = data.length;
  const res = [];
  if (dataSize > 12) {
    let cut = 0;
    do {
      cut += 6;
      const cropped = data.slice(cut, cut + 6);
      if (cropped.length) {
        res.push({
          activity: cropped,
        });
      }
    } while (cut < dataSize);
  }

  return res;
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
