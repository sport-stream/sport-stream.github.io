export const transliterate = function (text: string) {
  const dictionary = {
    а: "a",
    А: "A",
    с: "c",
    С: "C",
    е: "e",
    Е: "E",
    і: "i",
    І: "I",
    р: "p",
    Р: "P",
    о: "o",
  };
  const trans = (text: string, letter: keyof typeof dictionary) => {
    return text.split(letter).join(dictionary[letter]);
  };
  const letters = Object.keys(dictionary) as (keyof typeof dictionary)[];
  for (let i = 0; i < letters.length; i++) {
    text = trans(text, letters[i]);
  }
  return text;
};
