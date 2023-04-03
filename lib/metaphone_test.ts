import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { metaphone } from "./metaphone.ts";

Deno.test("basic metaphone test", () => {
  let result = metaphone("test");
  assertEquals(result, ["T", "S", "T"]);

  result = metaphone("write");
  assertEquals(result, ["R", "T"]);

  result = metaphone("right");
  assertEquals(result, ["R", "T"]);
});

Deno.test("word features test", () => {
  let result = metaphone("anasthasia").join("");
  assertEquals(result, "ANS0S");

  result = metaphone("gn").join("");
  assertEquals(result, "N");

  result = metaphone("charlatan").join("");
  assertEquals(result, "XRLTN");

  result = metaphone("glucos").join("");
  assertEquals(result, "KLKS");
});
