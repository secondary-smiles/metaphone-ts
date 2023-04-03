import { cons, PhonemePair } from "./metaphone.types.ts";

class PLexer {
  eat(char: string, word: string, index: number) {
    switch (char) {
      case "b":
        return new PhonemePair(word, [cons.B]);
      case "c":
        return this.c(word, index);
      case "d":
        return this.d(word, index);
      case "f":
        return new PhonemePair(word, [cons.F]);
      case "g":
        return this.g(word, index);
      case "h":
        return this.h(word, index);
      case "j":
        return new PhonemePair(word, [cons.J]);
      case "k":
        return this.k(word, index);
      case "l":
        return new PhonemePair(word, [cons.L]);
      case "m":
        return new PhonemePair(word, [cons.M]);
      case "n":
        return new PhonemePair(word, [cons.N]);
      case "p":
        return this.p(word, index);
      case "q":
        return new PhonemePair(word, [cons.K]);
      case "r":
        return new PhonemePair(word, [cons.R]);
      case "s":
        return this.s(word, index);
      case "t":
        return this.t(word, index);
      case "v":
        return new PhonemePair(word, [cons.F]);
      case "w":
        return this.w(word, index);
      case "x":
        return this.x(word, index);
      case "y":
        return this.y(word, index);
      case "z":
        return new PhonemePair(word, [cons.S])

      default:
        return new PhonemePair(word, [cons.UNK]);
    }
  }

  c(word: string, index: number) {
    const snippet = word.slice(index + 1);

    const phoneme = new PhonemePair(word);

    switch (true) {
      case snippet.startsWith("ia"):
      case snippet.startsWith("h"):
        phoneme.cons = [cons.X];
        break;

      case snippet.startsWith("i"):
      case snippet.startsWith("e"):
      case snippet.startsWith("y"):
        phoneme.cons = [cons.S];
        break;

      default:
        phoneme.cons = [cons.K];
    }

    return phoneme;
  }

  d(word: string, index: number) {
    const snippet = word.slice(index + 1);

    const phoneme = new PhonemePair(word);

    switch (true) {
      case snippet.startsWith("ge"):
      case snippet.startsWith("gy"):
      case snippet.startsWith("gi"):
        phoneme.cons = [cons.J];
        break;

      default:
        phoneme.cons = [cons.T];
    }

    return phoneme;
  }

  g(word: string, index: number) {
    const phoneme = new PhonemePair(word);

    // followed by h and h is not last letter nor followed by vowel
    if (
      word[index + 1] == "h" &&
      (index + 1 != word.length - 1 && !isVowel(word[index + 2]))
    ) {
      phoneme.cons = [cons.NIL];
      return phoneme;
    }

    const snippet = word.slice(index + 1);

    // followed by n or ned and is at end of string
    if (snippet.startsWith("n")) {
      const subsnippet = snippet.slice(-3);
      if (subsnippet == "n" || subsnippet == "ned") {
        phoneme.cons = [cons.NIL];
        return phoneme;
      }
    }

    switch (true) {
      case snippet.startsWith("i"):
      case snippet.startsWith("e"):
      case snippet.startsWith("y"):
        phoneme.cons = [cons.J];
        break;

      default:
        phoneme.cons = [cons.K];
    }

    return phoneme;
  }

  h(word: string, index: number) {
    const phoneme = new PhonemePair(word);

    // after vowel and not before vowel
    if (
      (word[index - 1] && word[index + 1]) &&
      (isVowel(word[index - 1]) && !isVowel(word[index + 1]))
    ) {
      phoneme.cons = [cons.NIL];
      return phoneme;
    }

    switch (word[index - 1]) {
      case "c":
      case "s":
      case "p":
      case "t":
      case "g":
        phoneme.cons = [cons.NIL];
        return phoneme;
    }

    phoneme.cons = [cons.H];
    return phoneme;
  }

  k(word: string, index: number) {
    const phoneme = new PhonemePair(word);

    // if after c
    if (word[index - 1] == "c") {
      phoneme.cons = [cons.NIL];
      return phoneme;
    }

    phoneme.cons = [cons.K];
    return phoneme;
  }

  p(word: string, index: number) {
    const phoneme = new PhonemePair(word);

    // ph to f
    if (word[index + 1] == "h") {
      phoneme.word = word.replace("ph", "f "); // extra space to not fuck up for loop in parent
      phoneme.cons = [cons.F];

      return phoneme;
    }

    phoneme.cons = [cons.P];
    return phoneme;
  }

  s(word: string, index: number) {
    const phoneme = new PhonemePair(word);

    const snippet = word.slice(index);

    switch (true) {
      case snippet.startsWith("h"):
      case snippet.startsWith("io"):
      case snippet.startsWith("ia"):
        phoneme.cons = [cons.X];
        break;

      default:
        phoneme.cons = [cons.S];
    }

    return phoneme;
  }

  t(word: string, index: number) {
    const phoneme = new PhonemePair(word);

    if (word[index + 1] == "h") {
      phoneme.word = phoneme.word.replace("th", "t ");
      phoneme.cons = [cons[0]];

      return phoneme;
    } else if (word[index + 1] == "c" && word[index + 2] == "h") {
      phoneme.word = phoneme.word.replace("tch", "t  ");
      phoneme.cons = [cons.NIL];

      return phoneme;
    }

    const snippet = word.slice(index + 1);

    switch (true) {
      case snippet.startsWith("ia"):
      case snippet.startsWith("io"):
        phoneme.cons = [cons.X];
        break;

      default:
        phoneme.cons = [cons.T];
    }

    return phoneme;
  }

  w(word: string, index: number) {
    const phoneme = new PhonemePair(word);

    if (word[index + 1] == "h" && index == 0) {
      phoneme.word = phoneme.word.replace("wh", "w ");
      phoneme.cons = [cons.W];

      return phoneme;
    }

    if (word[index + 1] && !isVowel(word[index + 1])) {
      phoneme.cons = [cons.NIL];
      return phoneme;
    }

    phoneme.cons = [cons.W];

    return phoneme;
  }

  x(word: string, index: number) {
    const phoneme = new PhonemePair(word);

    if (index == 0) {
      phoneme.cons = [cons.S];
      return phoneme;
    }

    phoneme.cons = [cons.K, cons.S];
    return phoneme;
  }

  y(word: string, index: number) {
    const phoneme = new PhonemePair(word);

    if (word[index+1] && !isVowel(word[index+1])) {
      phoneme.cons = [cons.NIL];
      return phoneme;
    }

    phoneme.cons = [cons.Y];
    return phoneme;
  }
}

function isVowel(c: string) {
  return ["a", "e", "i", "o", "u"].indexOf(c.toLowerCase()) !== -1;
}

export { PLexer };
