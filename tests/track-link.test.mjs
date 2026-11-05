import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";
const source = await readFile(new URL("../src/lib/track-link.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
const { trackLink, selectedTrackId } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
test("track links preserve valid destination parameters and encode API ID", () => {
  const url = new URL(trackLink("a & b", "/overview?source=card&track=old"), "https://example.com");
  assert.equal(url.searchParams.get("track"), "a & b");
  assert.equal(url.searchParams.get("source"), "card");
  assert.equal(url.hash, "#tracks");
  assert.throws(() => trackLink("id", "https://other.example/overview"));
});
test("selection accepts only IDs present in validated data", () => {
  const tracks = [{ id: "development" }];
  assert.equal(selectedTrackId(tracks, "development"), "development");
  assert.equal(selectedTrackId(tracks, "unknown"), null);
  assert.equal(selectedTrackId(tracks, null), null);
});
