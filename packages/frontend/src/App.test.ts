/// <reference types="vitest" />
import { describe, it, expect } from "vitest";

describe("App", () => {
    it("should pass a sanity check", () => {
        expect(1 + 1).toBe(2);
    });

    it("should have a valid environment config", () => {
        expect(import.meta.env.VITE_API_URL).toBeUndefined(); // not set in test
    });
});
