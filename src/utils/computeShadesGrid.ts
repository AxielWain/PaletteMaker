import { ControlRestrictions } from '../Components/BaseColorControls/constants'
import { computeShades } from './computeShades'

export function computeShadesGrid(colors: readonly string[], maxShades = 6) {
  const shadedColors: string[][] = []

  colors.forEach((color, index) => {
    const { minLightness, maxLightness } = ControlRestrictions[index]
    const shades = computeShades(color, maxShades, maxLightness, minLightness)
    shadedColors.push(shades)
  })

  const gridColors: string[] = []

  for (let i = 0; i < maxShades * 2; i++) {
    for (let j = 0; j < shadedColors.length; j++) {
      gridColors.push(shadedColors[j][i])
    }
  }

  return gridColors
}
