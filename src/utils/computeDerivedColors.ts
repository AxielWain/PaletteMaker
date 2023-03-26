import { hsl, parseToHsl } from 'polished';
import { HslColor } from 'polished/lib/types/color';

export function computeDerivedColors(
  colors: string[],
  startIndex = 1,
  totalColors = 6
) {
  const derivedColors: string[] = [];
  const hslColors = colors.map((color) => parseToHsl(color));
  const limitIndex = startIndex + totalColors;
  for (let i = startIndex; i < limitIndex; i++) {
    const firstColor = hslColors[i];
    const secondColor =
      i < limitIndex ? hslColors[i + 1] : hslColors[startIndex];
    const meanColor: HslColor = {
      hue: (firstColor.hue + secondColor.hue) / 2,
      saturation: (firstColor.saturation + secondColor.saturation) / 2,
      lightness: (firstColor.lightness + secondColor.lightness) / 2,
    };
    derivedColors.push(hsl(meanColor));
  }

  return derivedColors;
}
