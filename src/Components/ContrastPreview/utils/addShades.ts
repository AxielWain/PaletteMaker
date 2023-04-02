import { Shade } from '../types';

export const addShades = (
  shades: Shade[],
  colors: readonly string[],
  colorNames: readonly string[],
  colorStartIndex: number,
  shadeNameIndex: number,
  endIndex: number,
  startIndex = 0
) => {
  for (let i = startIndex; i < endIndex; i++) {
    shades.push({
      index: shadeNameIndex,
      parentName: colorNames[i - startIndex],
      color: colors[colorStartIndex + i],
    });
  }
};
