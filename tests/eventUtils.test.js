import { normalizeEvents, mergeEvents } from "../src/utils/eventUtils";

describe("eventUtils", () => {
  test("normalizeEvents converte date e aggiunge id", () => {
    const raw = [{ course: "A", date: "2025-11-06", start: "10:00", end: "12:00" }];
    const out = normalizeEvents(raw);
    expect(out[0].id).toBeDefined();
    expect(out[0].start instanceof Date).toBe(true);
  });

  test("mergeEvents unisce eventi ma elimina duplicati", () => {
    const a = [{ course: "A", date: "2025-11-06", start: "10:00", end: "12:00" }];
    const b = [{ course: "A", date: "2025-11-06", start: "10:00", end: "12:00" }];
    const out = mergeEvents(a, b);
    expect(out).toHaveLength(1);
  });
});
