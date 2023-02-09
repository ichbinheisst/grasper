function speakUp(Speech, word, language) {
  if (!word || !Speech || !language)
    throw new Error("speakUp function missing arguments");
  if (typeof word != "string")
    throw new Error("speakUp word params expected to a string");
  const thingToSay = word.toLowerCase();
  Speech.speak(thingToSay, {
    language,
  });
  return;
}
export default speakUp;
