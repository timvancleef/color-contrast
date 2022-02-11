import { relativeLuminance } from "./relativeLuminance";
import { ColorInput } from "./types";

describe("relativeLuminance", (): void => {
  it("should be defined", (): void => {
    expect(relativeLuminance).toBeDefined();
  });

  it.each([
    [{}],
    [{ red: null, green: null, blue: null }],
    [{ red: 128 }],
    [{ red: 1, green: -1, blue: 1 }],
    [{ red: 1, green: 256, blue: 1 }],
  ])("given %p should throw an error", (colorInput: ColorInput): void => {
    expect(() => relativeLuminance(colorInput)).toThrow(
      new Error("invalid color input")
    );
  });

  it.each([
    [{ red: 0, green: 0, blue: 0 }, 0],
    [{ red: 255, green: 255, blue: 255 }, 1],
    [{ red: 128, green: 128, blue: 128 }, 0.2158605001138992],
  ])(
    "given %p should return %d",
    (colorInput: ColorInput, expectedResult: number): void => {
      expect(relativeLuminance(colorInput)).toBe(expectedResult);
    }
  );
});
