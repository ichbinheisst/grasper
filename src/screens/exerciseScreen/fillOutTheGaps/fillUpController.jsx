function filteredSenteces(data) {
  const exeptions = [",", "!", ".", "?", "-", "Yeah", "yeah", " "];
  // condition here
  const noRepeated = filterRepeatedSentences(data);
  if (!noRepeated) {
    return;
  }

  const exerciseSentence = noRepeated.filter((sentence) => {
    const text = sentence.text;

    return text !== "</>" && text.length > 20;
  });

  const words = exerciseSentence?.map((wrd) => {
    let cleanSetence = wrd.text
      .split("")
      .filter((x) => {
        return x != "!" && x !=",";
      })

      .reduce((previous, current) => {
        return previous + current;
      })
      .split(" ")
      .filter((block) => {
        return block.length > 0 && block != undefined;
      });

    return {
      sentence: cleanSetence,
      time: wrd.time,
    };
  });

  return words;
}

function filterRepeatedSentences(data) {
  if (!data.length) {
    return;
  }

  let unique = [];
  let uniqueIndex = [];
  data.forEach((sentences, index) => {
    let text = sentences.text;
    if (!unique.includes(text.trim())) {
      unique.push(text);
      uniqueIndex.push(index);
    }
  });
  const newdata = uniqueIndex.map((el) => {
    return data[el];
  });
  return newdata;
}

function ElaborateExercise(data) {
  if (!data.length) {
    return;
  }
  let unique = [];
  const activity = data.map((elements) => {
    const sentences = elements?.sentence;

    const random = Math.round(Math.random() * sentences.length);
    let resp = "";
    const sentenceswithgaps = sentences.map((wrd, index) => {
      if (index == random) {
        resp = wrd;
        return "*";
      }

      return wrd;
    });

    return {
      text:sentenceswithgaps,
      res:resp,
      time: elements.time,
    };
  });

  return activity;
}

 export function generateActivity(data) {
  if (!data.length) {
    console.log("deu ruim ");
    return;
  }
  let activity = ElaborateExercise(filteredSenteces(data));
      let contentActivity =  activity.filter((act)=> {
        return act.res !="" && act.res !="I'm" 
      })
  return contentActivity
}
export function spellingCheck(res, word) {
  if (!word || !res) return false;

  let isEqual = true;
  const arrayofLetter = res.split("");
  const letters = word.split("");
  for (let index = 0; index < letters.length; index++) {
    const element = letters[index] == arrayofLetter[index];
    if (!element) {
      isEqual = false;
    }
  }

  return isEqual;
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
