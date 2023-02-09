import { storeData, getData } from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";
const key = "FAVORITE_WORDS_LIST";

function createListObject(vocabulary, language) {
  const item = {
    header: {
      language: language ? language : "en-US",
      date: new Date().getDate(),
    },
    body: {
      word: vocabulary,
    },
  };
  return item;
}

async function StoreList(vocabulary, language) {
  const item = createListObject(vocabulary, language);

  const IsVocabularyOnTheList = await checkList(vocabulary);

  if (IsVocabularyOnTheList) return true;

  const data = await getData(key);
  if (!data.some((itm) => itm?.body?.word == vocabulary)) {
    data.push(item);
    await storeData(key, data);
    return true;
  }

  return true;
}

async function createList() {
  const data = await getData(key);
  const emptyArray = [];
  if (!data) {
    await storeData(key, emptyArray);
    return [];
  }
  if (!Array.isArray(data)) {
    await storeData(key, emptyArray);
    return [];
  }
  return data;
}

async function checkList(vocabulary) {
  if (!vocabulary) {
    return false;
  }
  const list = await createList();
  if (!list.length) return false;

  if (list.some((itm) => itm?.body?.word == vocabulary)) {
    return true;
  }
  return false;
}

async function getFavoriteList() {
  const list = await createList();
  if (!list.length) return list;
  const data = getData(key);
  return data;
}

async function deleteItemList(vocabulary) {
  if (!vocabulary) {
    return;
  }
  const isVocabularyOnList = await checkList(vocabulary);
  if (!isVocabularyOnList) return;
  const data = await getData(key);
  const list = await JSON.parse(data);
  if (!list.length) return;
  const newList = list.filter((item) => {
    return item?.body?.word != vocabulary;
  });
  await storeData(key, newList);
}

async function deleteEntireList() {}

export { checkList, StoreList,getFavoriteList };
