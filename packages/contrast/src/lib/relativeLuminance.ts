/*
the relative brightness of any point in a colorspace, normalized to 0 for darkest black and 1 for lightest white
Note 1: For the sRGB colorspace, the relative luminance of a color is defined as L = 0.2126 * R + 0.7152 * G + 0.0722 * B where R, G and B are defined as:
    if RsRGB <= 0.03928 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4
    if GsRGB <= 0.03928 then G = GsRGB/12.92 else G = ((GsRGB+0.055)/1.055) ^ 2.4
    if BsRGB <= 0.03928 then B = BsRGB/12.92 else B = ((BsRGB+0.055)/1.055) ^ 2.4
and RsRGB, GsRGB, and BsRGB are defined as:
    RsRGB = R8bit/255
    GsRGB = G8bit/255
    BsRGB = B8bit/255
*/

export type ColorInput = {
  red: number;
  green: number;
  blue: number;
};

const isValidColorRange = (input: number): boolean => {
  return Number.isInteger(input) && 0 <= input && input <= 255;
};

const divideBy255 = (input: number): number => input / 255.0;

const isValid = (input: ColorInput): boolean => {
  return (
    isValidColorRange(input?.red) &&
    isValidColorRange(input?.green) &&
    isValidColorRange(input?.blue)
  );
};

const prepareColorForLuminance = (input: number): number => {
  if (input <= 0.03928) {
    return input / 12.92;
  }
  return ((input + 0.055) / 1.055) ** 2.4;
};

const normalize = (input: ColorInput): ColorInput => {
  return {
    red: divideBy255(input.red),
    green: divideBy255(input.green),
    blue: divideBy255(input.blue),
  };
};

const prepareForLuminance = (input: ColorInput): ColorInput => {
  return {
    red: prepareColorForLuminance(input.red),
    green: prepareColorForLuminance(input.green),
    blue: prepareColorForLuminance(input.blue),
  };
};

const reduceToRelativeLuminance = (input: ColorInput): number => {
  return 0.2126 * input.red + 0.7152 * input.green + 0.0722 * input.blue;
};

const relativeLuminance = (input: ColorInput): number => {
  if (!isValid(input)) {
    throw new Error("invalid color input");
  }

  return reduceToRelativeLuminance(prepareForLuminance(normalize(input)));
};

export { relativeLuminance };
