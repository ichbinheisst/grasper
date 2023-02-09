import * as WebBrowser from "expo-web-browser";

const listOfLanguages = [
  {
    short: "en-US",
    name: "ingles",
  },
  {
    short: "en-UK",
    name: "ingles",
  },
  {
    short: "de-DE",
    name: "alemao",
  },
  {
    short: "es-ES",
    name: "espanhol",
  },
];

async function searchWebDictionary( word, langAbrev) {
  if (!word || !langAbrev) {
    throw new Error("searchDictironary is missing params");
  }
  const lang = listOfLanguages.find((item) => item.short == langAbrev);
  if (!lang)
    throw new Error(
      `${lang} is not in the list of available languages,check its spelling or available languages list`
    );
     word.toLowerCase()
 
 await WebBrowser.openBrowserAsync( `https://www.linguee.com.br/portugues-${lang.name}/search?source=ingles&query=${word}`);
}

export  { listOfLanguages, searchWebDictionary };
