import { computeShades } from './computeShades';

export function computeShadesGrid(colors: readonly string[], maxShades = 6) {
  const darkerColors: string[][] = [];
  const lighterColors: string[][] = [];

  for (const color of colors) {
    const { darkerShades, lighterShades } = computeShades(color, maxShades);
    darkerColors.push(darkerShades);
    lighterColors.push(lighterShades);
  }

  const darkerGridColors: string[] = [];
  const lighterGridColors: string[] = [];

  for (let i = 0; i < maxShades; i++) {
    for (let j = 0; j < colors.length; j++) {
      darkerGridColors.push(darkerColors[j][i]);
      lighterGridColors.push(lighterColors[j][i]);
    }
  }

  return { darkerGridColors, lighterGridColors };
}
