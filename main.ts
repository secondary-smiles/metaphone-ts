import { metaphone } from "./lib/metaphone.ts";
import { cons } from "./lib/metaphone.types.ts";

async function main() {
  let words = Deno.args[0];

  let splitWords = words.split(/ |-/g);

  for (let i = 0; i < splitWords.length; i++) {
    let word = splitWords[i];

    let phonemes = metaphone(word);

    phonemes = phonemes.filter((a, _) => {
      return a != cons.UNK && a != cons.NIL;
    })

    console.log(phonemes);
  }

}

main().catch((err) => {
  throw err;
});
