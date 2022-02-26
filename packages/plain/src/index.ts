import { colorContrast } from "contrast";
import type { ColorInput } from "contrast/build/lib/types";
const color1 = document.getElementById("color-1") as HTMLInputElement;
const color2 = document.getElementById("color-2") as HTMLInputElement;
const contrast = document.getElementById("contrast");

const hexToRgb = (hex: string): ColorInput => {
  return {
    red: parseInt(hex.substring(1, 3), 16),
    green: parseInt(hex.substring(3, 5), 16),
    blue: parseInt(hex.substring(5, 7), 16),
  };
};

const delay = (cb: () => void): (() => void) => {
  let timeout: any;
  return (): void => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(cb, 100);
  };
};

const regex = /#[0-9abcdef]{6}/;

const showContrast = delay(() => {
  const hexString1 = color1.value;
  const hexString2 = color2.value;
  const color1Valid = Boolean(hexString1.match(regex));
  const color2Valid = Boolean(hexString2.match(regex));

  if (color1Valid && color2Valid) {
    const currentContrast = colorContrast(
      hexToRgb(hexString1),
      hexToRgb(hexString2)
    );

    contrast.classList.remove("contrast-good", "contrast-bad");
    if (currentContrast < 4.5) {
      contrast.classList.add("contrast-bad");
    } else {
      contrast.classList.add("contrast-good");
    }

    contrast.textContent = `${currentContrast.toFixed(2)}:1`;
  }
});

color1.addEventListener("input", showContrast);
color2.addEventListener("input", showContrast);

showContrast();
