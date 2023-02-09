import { Audio } from "expo-av";

const sounds = [
  {
    title: "wrong",
    track: require("../../../../../assets/tracks/wrong.mp3"),
    positionMillis: 500,
  },
  {
    title: "correct",
    track: require("../../../../../assets/tracks/correct.mp4"),
    positionMillis: 1000,
  },
];

async function PlayAudio(data) {
  const { sound } = await Audio.Sound.createAsync(data.track,{
    positionMillis: data.positionMillis
  });

  sound.playAsync();
}




 export async  function Player(index) {
  if (index==undefined|| index >= sounds.length) {

    return;
  }

  await PlayAudio(sounds[index] )
}






 export function defineAnimations(status) {
  switch (status) {
    case 0:
      return require("../../../../../assets/lottiesJson/wrong.json");
    case 1:
      return require("../../../../../assets/lottiesJson/correct.json");
  
    default:
      return require("../../../../../assets/lottiesJson/correct.json");
  }
}