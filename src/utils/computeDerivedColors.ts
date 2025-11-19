import { colord, extend, LabaColor } from 'colord'
import labPlugin from 'colord/plugins/lab'

extend([labPlugin])

const startIndex = 1
const totalColors = 6

export function computeDerivedColors(colors: readonly string[]) {
  const derivedColors: string[] = []
  const limitIndex = startIndex + totalColors
  const labColors = colors
    .slice(startIndex, limitIndex)
    .map((color) => colord(color).toLab())
  const indexes: number[] = []
  labColors.forEach((_, i) => {
    indexes.push(i)
  })
  indexes.push(0)

  for (let i = 0; i < indexes.length - 1; i++) {
    const firstColor = labColors[indexes[i]]
    const secondColor = labColors[indexes[i + 1]]
    const meanColor: LabaColor = {
      l: (firstColor.l + secondColor.l) / 2,
      a: (firstColor.a + secondColor.a) / 2,
      b: (firstColor.b + secondColor.b) / 2,
      alpha: 1,
    }
    derivedColors.push(colord(meanColor).toHex())
  }

  return derivedColors
}
