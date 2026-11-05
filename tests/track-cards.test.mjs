import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const source = await readFile(new URL("../src/lib/track-cards.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
});
const { indexTrackCards } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);

test("card identity is independent of card-source order", () => {
  const tracks = [{ id: "research" }, { id: "design" }, { id: "development" }];
  const cards = [
    { id: "development", content: "Development card" },
    { id: "research", content: "Research card" },
    { id: "design", content: "Design card" },
  ];
  const indexed = indexTrackCards(cards);
  assert.deepEqual(tracks.map(track => indexed.get(track.id).content), [
    "Research card", "Design card", "Development card",
  ]);
  assert.equal(indexed.get("missing"), undefined);
  assert.deepEqual(cards.map(card => card.id), ["development", "research", "design"]);
});
