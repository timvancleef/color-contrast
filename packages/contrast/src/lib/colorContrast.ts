import { ColorInput } from "./types";
import { relativeLuminance } from "./relativeLuminance";

const calculateColorContrast = (
  lighterColor: number,
  darkerColor: number
): number => {
  return (lighterColor + 0.05) / (darkerColor + 0.05);
};

/*
To calculate the contrast ratio, the relative luminance of the lighter colour (L1)
is divided through the relative luminance of the darker colour (L2):
(L1 + 0.05) / (L2 + 0.05)
 */
const colorContrast = (color1: ColorInput, color2: ColorInput): number => {
  const relativeLuminance1 = relativeLuminance(color1);
  const relativeLuminance2 = relativeLuminance(color2);

  // Color 1 is lighter
  if (relativeLuminance1 > relativeLuminance2) {
    return calculateColorContrast(relativeLuminance1, relativeLuminance2);
  }

  // Color 1 is darker or colors are equally dark
  return calculateColorContrast(relativeLuminance2, relativeLuminance1);
};

export { colorContrast };
