import { darken, lighten, parseToHsl } from 'polished';

const transparentColor = 'rgb(0, 0, 0, 0)';
const higherLightnessThreshold = 0.8;
const lowerLightnessThreshold = 0.2;

export function computeShades(
  color: string,
  numberOfShades: number,
  maxShades = 6
) {
  if (numberOfShades > maxShades) {
    throw new Error(
      `number of shades ${numberOfShades} must not be greater than max shades ${maxShades}`
    );
  }

  const { lightness } = parseToHsl(color);
  const deltaChange = 1 / (numberOfShades + 1);
  const darkerShades: string[] = [];
  const lighterShades: string[] = [];
  let darkerLuminance = lightness;
  let lighterLuminance = lightness;
  let count = 0;

  while (
    lighterShades.length + darkerShades.length < numberOfShades &&
    count < maxShades
  ) {
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

    count++;
  }

  const fillerDarkerShades = maxShades - darkerShades.length;
  for (let i = 0; i < fillerDarkerShades; i++) {
    darkerShades.push(transparentColor);
  }

  const fillerLighterShades = maxShades - lighterShades.length;
  for (let i = 0; i < fillerLighterShades; i++) {
    lighterShades.unshift(transparentColor);
  }

  return { darkerShades, lighterShades };
}
