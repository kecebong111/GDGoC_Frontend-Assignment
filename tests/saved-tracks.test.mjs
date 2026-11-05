import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const source = await readFile(new URL("../src/lib/saved-tracks.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
const { parseSavedIds, toggleSavedId, filterSavedTracks } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);

test("storage accepts missing IDs and deduplicates valid string arrays", () => {
  assert.deepEqual(parseSavedIds(null), []);
  assert.deepEqual(parseSavedIds('["a","a","b"]'), ["a", "b"]);
});
test("storage rejects corrupt JSON and invalid elements", () => {
  for (const raw of ["{", "null", "{}", '[1]', '[""]']) assert.throws(() => parseSavedIds(raw));
});
test("toggle saves and unsaves without mutating input", () => {
  const ids = ["a"];
  assert.deepEqual(toggleSavedId(ids, "b"), ["a", "b"]);
  assert.deepEqual(toggleSavedId(ids, "a"), []);
  assert.deepEqual(ids, ["a"]);
});
test("saved filter preserves API order and ignores unavailable IDs", () => {
  const tracks = [{ id: "a" }, { id: "b" }];
  assert.deepEqual(filterSavedTracks(tracks, ["missing", "b", "a"]), tracks);
  assert.deepEqual(filterSavedTracks(tracks, ["missing"]), []);
});
