import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const source = await readFile(new URL("../src/lib/api-response.ts", import.meta.url), "utf8");
const { outputText: javascript } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
});
const { parseItems } = await import(`data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`);

test("accepts empty successful responses", () => {
  assert.deepEqual(parseItems({ success: true, data: [] }, "tracks"), []);
});

test("normalizes actual track fields without changing content", () => {
  const row = { id: "development", name: "Development", description: "Build", tagline: "Ship", skills: ["Web"], explore_link: "/overview?track=development" };
  const [item] = parseItems({ success: true, data: [row] }, "tracks");
  assert.equal(item.title, row.name);
  assert.deepEqual(item.skills, row.skills);
  assert.equal(item.explore_link, row.explore_link);
});

test("rejects invalid envelopes, duplicates and missing fields", () => {
  for (const value of [null, [], { success: false, data: [] }, { success: true, data: [{}] }]) {
    assert.throws(() => parseItems(value, "values"));
  }
  const row = { id: "one", title: "One", description: "Description" };
  assert.throws(() => parseItems({ success: true, data: [row, row] }, "values"));
});

test("rejects invalid track skills and external destinations", () => {
  const row = { id: "one", name: "One", description: "Description", tagline: "Tagline", skills: [1], explore_link: "/overview" };
  assert.throws(() => parseItems({ success: true, data: [row] }, "tracks"));
  assert.throws(() => parseItems({ success: true, data: [{ ...row, skills: [], explore_link: "https://example.com" }] }, "tracks"));
});

test("validates FAQ, journey and category endpoint fields", () => {
  assert.throws(() => parseItems({ success: true, data: [{ id: "faq", question: "Q", answer: "A" }] }, "faqs"));
  assert.throws(() => parseItems({ success: true, data: [{ id: "step", title: "Step", description: "D", step: -1 }] }, "journey"));
  assert.equal(parseItems({ success: true, data: [{ id: "joining", label: "Joining", description: "D" }] }, "inquiry-categories")[0].title, "Joining");
});
