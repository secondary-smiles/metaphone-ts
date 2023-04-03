import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { metaphone } from "./metaphone.ts";

Deno.test("metaphone test", () => {
  let result = metaphone("test")

  console.log(result);

  assertEquals(result, ["T", "E", "S", "T"]);
});
