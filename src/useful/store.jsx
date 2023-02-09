import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async ( key,value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    throw new Error("couldn't store data key:" + value);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
  }
};

export const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }

  console.log("Done.");
};

//await AsyncStorage.mergeItem('@MyApp_user', JSON.stringify(USER_2))
//static removeItem(key: string, [callback]: ?(error: ?Error) => void): Promise

 export async function Merge(data) {
  try {
    AsyncStorage.mergeItem("@MyApp_user", JSON.stringify(data));
  } catch (error) {
    console.log("couldn't merge");
  }
}

/*

 SEARCHED_WORDS
 FAVORITE_WORDS

 {
    header:{
        language:"",
         Track:"", 
         date:""
    },
    body:{
        word, 
        text:{}, 
        time:{ from : to:}
    }
 }



*/
