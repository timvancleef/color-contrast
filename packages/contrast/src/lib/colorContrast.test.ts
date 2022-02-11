import { colorContrast } from "./colorContrast";

describe("colorContrast", (): void => {
  const black = { red: 0, green: 0, blue: 0 };
  const white = { red: 255, green: 255, blue: 255 };
  const grey = { red: 128, green: 128, blue: 128 };

  it.each([
    [black, black, 1],
    [white, black, 21],
    [black, white, 21],
    [white, grey, 3.9494396480491156],
  ])(
    "given colors %p, %p should return %d",
    (color1, color2, expectedContrast): void => {
      expect(colorContrast(color1, color2)).toBe(expectedContrast);
    }
  );
});
