import test from "node:test";
import assert from "node:assert/strict";
import { complete, evaluate, visibleQuestions } from "../lib/evaluacion/motor.ts";

const good = {
  sector: "restaurant",
  role: "owner",
  perception: "good",
  profit: "up",
  margins: "records",
  inventory: "never",
  visibility: "regular",
  dependency: "autonomous",
  reports: "controlled",
  changes: "measured",
  decision: "none",
};

test("situación favorable sin convertir buenas prácticas en problemas", () => {
  assert.equal(complete(good), true);
  const result = evaluate(good);
  assert.equal(result.status, "favorable");
  assert.equal(result.findings.length, 0);
  assert.ok(result.strengths.length >= 4);
});

test("percepción positiva no significa evidencia suficiente", () => {
  const result = evaluate({
    ...good,
    profit: "unknown",
    margins: "estimate",
    inventory: "unknown",
    visibility: "unknown",
    dependency: "unknown",
    reports: "unknown",
    changes: "unknown",
  });
  assert.equal(result.status, "uncertain");
  assert.equal(result.findings.length, 0);
  assert.ok(result.unknowns.length >= 4);
});

test("diferencias de utilidad e inventario activan señales, no causas", () => {
  const result = evaluate({
    ...good,
    profit: "gap",
    inventory: "frequent",
    dependency: "often",
  });
  assert.equal(result.status, "signals");
  assert.deepEqual(result.findings.map(x => x.id), ["profit", "inventory", "dependency"]);
  assert.ok(result.findings.every(f => f.evidence.includes("Respuesta")));
  assert.ok(result.findings.every(f => f.limitation.length > 0));
});

test("se compara sucursales sólo cuando se declara grupo", () => {
  assert.equal(visibleQuestions(good).some(q => q.id === "branches"), false);
  const group = {...good,sector:"group",branches:"no"};
  assert.equal(complete(group), true);
  assert.equal(evaluate(group).findings.some(f => f.id === "branches"),true);
});

test("otro sector no recibe un resultado no validado", () => {
  const result = evaluate({ sector:"other" });
  assert.equal(result.status, "outside_scope");
  assert.equal(result.findings.length, 0);
});

test("datos incompletos no producen hallazgos", () => {
  assert.equal(complete({sector:"restaurant"}),false);
  assert.throws(() => evaluate({sector:"restaurant"}));
});
