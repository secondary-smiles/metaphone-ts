import { PLexer } from "./metaphone_trans.ts";

function metaphone(word: string) {
  word = word.toLowerCase();

  word = dropDuplicateLetters(word);
  word = dropBeginningMatches(word);
  word = dropMB(word);

  const lexer = new PLexer();
  const  phonemes = [];
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    const phoneme = lexer.eat(char, word, i);

    word = phoneme.word;
    phonemes.push(...phoneme.cons);
  }

  return phonemes;
}

function dropDuplicateLetters(word: string) {
  let last = "";
  let result = "";

  for (let i = 0; i < word.length; i++) {
    const char = word[i];

    if (char != last || char == "c") {
      result += char;
      last = char;
    }
  }

  return result;
}

function dropBeginningMatches(word: string) {
  switch (word.slice(0, 2)) {
    case "ae":
    case "gn":
    case "kn":
    case "pn":
    case "wr":
      word = word.slice(1);
  }

  return word;
}

function dropMB(word: string) {
  if (word.endsWith("mb")) {
    word = word.slice(0, -1);
  }

  return word;
}

export { metaphone };
