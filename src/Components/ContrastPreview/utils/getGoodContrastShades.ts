import { meetsContrastGuidelines } from 'polished';
import { TRANSPARENT_COLOR } from '../../../utils/constants';
import { Shade } from '../types';

export const getGoodContrastShades = (
  palette: Shade[],
  background: string,
  foreground: string
) => {
  const shadesForBackground: Shade[] = [];
  const shadesForForeground: Shade[] = [];
  for (let i = 0; i < palette.length; i++) {
    const shade = palette[i];
    if (shade.color !== TRANSPARENT_COLOR) {
      if (meetsContrastGuidelines(background, shade.color).AA) {
        shadesForBackground.push(shade);
      }
      if (meetsContrastGuidelines(foreground, shade.color).AA) {
        shadesForForeground.push(shade);
      }
    }
  }

  return {
    shadesForBackground,
    shadesForForeground,
  };
};
