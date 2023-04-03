const cons = {
  B: "B",
  X: "X",
  S: "S",
  K: "K",
  J: "J",
  T: "T",
  F: "F",
  H: "H",
  L: "L",
  M: "M",
  N: "N",
  P: "P",
  R: "R",
  0: "0",
  W: "W",
  Y: "Y",
  NIL: "<NIL>",
  UNK: "<UNK>",
};

class PhonemePair {
  word: string;
  cons: string[];

  constructor(word: string = "", consonant: string[] = [cons.UNK]) {
    this.word = word;
    this.cons = consonant;
  }
}

export { cons, PhonemePair };
