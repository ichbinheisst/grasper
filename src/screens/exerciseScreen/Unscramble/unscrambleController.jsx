import { Audio } from "expo-av";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";

export function exerciseGenerator(data) {
  let index = Math.round(Math.random() * data.length);

  while (
    data[index]?.text?.split(" ").length < 4 ||
    data[index]?.text == "</>"
  ) {
    index = Math.round(Math.random() * data.length);
  }

  return index;
}

export function exerciseArray(data) {
  let UniqueChars = [];
  const length = Array.of(1, 2, 3, 4);
  const exercises = length.map(() => {
    return exerciseGenerator(data);
  });
  exercises.forEach((wrd) => {
    if (!UniqueChars.includes(wrd)) {
      return UniqueChars.push(wrd);
      // create and array without dublicated values
    }
  });

  return UniqueChars;
}

export function assembleExercise(data) {
  if(!data){

    return 
  }
  let indexes = exerciseArray(data);
  let senteces = indexes?.map((i) => {
    return {
      ...data[i],
      unscramble: {
        words: data[i]?.text
          .trim()
          .split(" ")
          .sort()
          .map((w) => {
            return { word: w, wordId: uuidv4() };
          }),

        answer: data[i]?.text.trim(),
      },
    };
  });
  return senteces;
}

export function Pagination(data, page, setSentence) {
  if ( data && !data.length || page >= data.length) {
    return;
  }

  setSentence(() => {
    if (!data[page].unscramble.words.length) {
    }
    return data[page].unscramble.words;
  });
}

export function unsScramble(word, setSetence, setRes) {
  setSetence((previus) => {
    return previus.filter((wrd, index) => {
      return wrd.wordId != word.wordId;
    });
  });

  setRes((previous) => [...previous, word]);
}

export function Correct(
  res,
  setRes,
  unscrambleData,
  page,
  setPage,
  setAnimationStatus,
  setFeedBack,
  feedback
) {
  if (!res.length || feedback) {
    return;
  }
  const onlyWords = res.map((wrd) => {
    return wrd.word;
  });
  const assembleSentence = onlyWords.reduce((previous, currentvalue) => {
    return previous + " " + currentvalue;
  });
  if (assembleSentence == unscrambleData[page].unscramble.answer) {
    if (page - 1 == unscrambleData.length) {
      setAnimationStatus(2);
      // the exercise has finished
      setFeedBack(true);
      return;
    }

    setPage((previus) => previus + 1);

    setFeedBack(true);
    setAnimationStatus(1);

    setTimeout(() => {
      console.log("bateu no feedback");
      setFeedBack(false);
    }, 2000);

    setRes([]);
    return;
  }

  setFeedBack(true);

  setAnimationStatus(0);
  setTimeout(() => {
    setFeedBack(false);
    console.log("bateu no feedback merda");
  }, 2000);
}

export async function PlayPause(audio, setIsplaying, unscrambleData, page) {
  if (!audio && !unscrambleData.length) {
    return;
  }
  let status = await audio.getStatusAsync();
  if (status?.isPlaying) {
    await audio.pauseAsync();
    setIsplaying(false);
    return;
  }
  await audio.setPositionAsync(unscrambleData[page].time.from);
  await audio.playAsync();
  setIsplaying(true);
}
export async function StopPlay(audio) {
  await audio.pauseAsync();
}

export async function stopAudio(audio, page, unscrambleData, setIsplaying) {
  if (audio && unscrambleData && unscrambleData.length) {
    audio.setOnPlaybackStatusUpdate((current) => {
      if (
        page < unscrambleData.length &&
        current.positionMillis >= unscrambleData[page].time.to
      ) {
        StopPlay(audio);
        setIsplaying(false);
        return;
      }
    });
  }
}
