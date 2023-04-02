import { darken, lighten, parseToHsl } from 'polished';
import { TRANSPARENT_COLOR } from './constants';

const higherLightnessThreshold = 0.8;
const lowerLightnessThreshold = 0.2;

export function computeShades(color: string, maxShades = 6) {
  const { lightness } = parseToHsl(color);
  // max lighter shades plus max darker shades plus the base color row
  const totalVerticalColors = maxShades * 2 + 1;
  const deltaChange = 1 / totalVerticalColors;
  const darkerShades: string[] = [];
  const lighterShades: string[] = [];
  let darkerLuminance = lightness;
  let lighterLuminance = lightness;

  for (let i = 0; i < maxShades; i++) {
    if (darkerLuminance >= lowerLightnessThreshold) {
      darkerLuminance += deltaChange;
      darkerShades.push(darken(deltaChange * (darkerShades.length + 1), color));
    }

    if (lighterLuminance <= higherLightnessThreshold) {
      lighterLuminance += deltaChange;
      lighterShades.unshift(
        lighten(deltaChange * (lighterShades.length + 1), color)
      );
    }
  }

  const fillerDarkerShades = maxShades - darkerShades.length;
  for (let i = 0; i < fillerDarkerShades; i++) {
    darkerShades.push(TRANSPARENT_COLOR);
  }

  const fillerLighterShades = maxShades - lighterShades.length;
  for (let i = 0; i < fillerLighterShades; i++) {
    lighterShades.unshift(TRANSPARENT_COLOR);
  }

  return { darkerShades, lighterShades };
}
