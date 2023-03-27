import { baseLabels, initialColors } from './constants';

export function loadColorDefinition(colorDefinition: string) {
  const loadedDefinition = JSON.parse(colorDefinition);
  let colorsNotFound: string[] = [];
  const result: string[] = [];
  for (let i = 0; i < baseLabels.length; i++) {
    const loadedColor = loadedDefinition[baseLabels[i]];
    if (loadedColor) {
      result.push(loadedColor);
    } else {
      result.push(initialColors[i]);
      colorsNotFound.push(baseLabels[i]);
    }
  }

  if (colorsNotFound.length > 0) {
    console.warn(
      'Some colors were not found on the pasted JSON, loaded initial colors instead',
      colorsNotFound
    );
  }

  return result;
}
