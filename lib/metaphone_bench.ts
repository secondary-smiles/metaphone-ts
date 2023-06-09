import { metaphone } from "./metaphone.ts";

const words = ["write", "gnome", "xmonad", "cat", "green", "computer", "paper"];
const combined = words.join(" ");
const singleWord = "geometry"

Deno.bench("Metaphone Single Word Batch Parsing", () => {
  words.forEach((word) => {
    metaphone(word);
  });
});

Deno.bench("Metaphone Random Single Word Parsing", () => {
  const word = words[Math.floor(Math.random() * words.length)];

  metaphone(word);
});

Deno.bench("Single Line Word Batch Parsing", () => {
  metaphone(combined);
});

Deno.bench("Single Word Parsing", () => {
  metaphone(singleWord);
})
