import React from "react";
import { Audio } from "expo-av";
import { response } from "../../../mockup/response/track";
import { mainResponse } from "../../../mockup/response/response";

export const Globalaudio = React.createContext();

export function GlobalAudioStorage({ children }) {
  const [teste, setTest] = React.useState("this is just a text");
  const [sound, setSound] = React.useState();
  const [audioProps, setAudioProps] = React.useState({});
  const [audioLength, setAudioLength] = React.useState();
  const [isPlaying, setIsPLaying] = React.useState(false);
  const [played, setPLayed] = React.useState(0);
  const [ReadingLine, setReadingLine] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [currentAudio, setCurrentAudio] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState();
  const [currentAlBum, setCurrentAlbum] = React.useState();
  const [currentTrack, setCurrentTrack] = React.useState();
  const [slowState, setSlowState] = React.useState(false);
  const [albuns, setAlbuns] = React.useState(mainResponse);
  const x = mainResponse;

  /*
     1-set todo os albuns e passa todos pra falso
     passa o primeiro album para o currentAlbum = talvez o data possa ser esse aqui 
     data 







 */

  function selectAlbum(index) {
    setAlbuns((current) => {
      let res = current.map((alb) => {
        return { ...alb, selected: false };
      });
      res[index].selected = true;
      setCurrentAlbum(res[index]);
      return res;
    });
  }

  React.useEffect(() => {
    selectAlbum(0); //1
  }, []);

  React.useEffect(() => {
    if (currentAlBum) {
      setData(currentAlBum.tracks); //2
    }

  }, [currentAlBum]);

  function UpdateReadingLine(value) {
    setReadingLine(value);
  } // apagar por nao usar
  //data e a lista de track do artista
  async function setAudio(index) {
    if (data != undefined && data.length != 0 && index < data.length) {
      setCurrentIndex(index);
      setCurrentAudio(data[index]);
      if (sound) {
        let status = await sound.getStatusAsync();
        if (status.isPlaying) {
          await playPauseDefault(sound);
        }
      }

      await LoadAudio(data[index]);
    }
  }
  async function LoadAudio(currentAudio) {
    if (currentAudio) {
      const { sound } = await Audio.Sound.createAsync(
        currentAudio.audio.url,

        {
          ///positionMillis: 5000,
          // progressUpdateIntervalMillis: 1000,/// gives me controll over the time that it will be played from ,
          rate: 1,
          shouldCorrectPitch: true,
        }
      );

      let status = await sound.getStatusAsync();

      setSound(sound);
      setAudioProps(status);
      setAudioLength(status.durationMillis);
      await playPauseDefault(sound);
    }
  }

  async function slowDown() {
    let status = await sound.getStatusAsync();
    if (status.rate == 1) {
      setSlowState(true);
      await sound.setRateAsync(0.6, true);
      return;
    }
    setSlowState(false);
    await sound.setRateAsync(1, true);
  }

  async function playPauseDefault(sound) {
    if (!sound) {
      return;
    }

    let status = await sound.getStatusAsync();
    if (status?.isPlaying) {
      setIsPLaying(false);
      await sound.stopAsync();
      let status = await sound.getStatusAsync();

      setAudioProps(status);
      return;
    }
    setIsPLaying(true);
    await sound.playAsync();
    setAudioProps(status);
  }

  async function playPause() {
    if (!sound) {
      return;
    }

    let status = await sound.getStatusAsync();
    if (isPlaying || status?.isPlaying) {
      setIsPLaying(!isPlaying);
      await sound.pauseAsync();
      let status = await sound.getStatusAsync();
      setAudioProps(status);
      return;
    }
    setIsPLaying(!isPlaying);
    await sound.playAsync();
    setAudioProps(status);
  }

  React.useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate((current) => {
        setPLayed(current.positionMillis);
        // UpdateTimer(current.positionMillis);
      });
    }
  }, [isPlaying]);

  const convertTime = (minutes) => {
    if ((typeof minutes != "number") | (minutes < 0)) {
      return 0;
    }

    let seconds = Math.floor(minutes / 1000);
    let m = seconds / 60;
    let mi = String(String(m).split(".")[0]);

    if (seconds > 59) {
      seconds = seconds - 60 * Number(mi);
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (Number(mi) < 10) {
      mi = "0" + mi;
    }

    return `${mi}:${seconds}`;
  };

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  React.useEffect(() => {
    return () => {
      setIsPLaying(false);
    };
  }, []);

  return (
    <Globalaudio.Provider
      value={{
        teste,
        sound,
        setSound,
        audioProps,
        audioLength,
        isPlaying,
        setIsPLaying,
        played,
        convertTime,
        playPause,
        UpdateReadingLine,
        ReadingLine,
        data,
        currentAudio,
        setAudio,
        currentIndex,
        x,
        selectAlbum,
        albuns,
        currentAlBum,
        slowDown,
        slowState,
      }}
    >
      {children}
    </Globalaudio.Provider>
  );
}
