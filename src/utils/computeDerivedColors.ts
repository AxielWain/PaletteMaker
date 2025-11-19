import { colord, extend, LabaColor } from 'colord'
import labPlugin from 'colord/plugins/lab'

extend([labPlugin])

export function computeDerivedColors(
  colors: readonly string[],
  startIndex = 1,
  totalColors = 6
) {
  const derivedColors: string[] = []

  const labColors = colors.map((color) => colord(color).toLab())
  const limitIndex = startIndex + totalColors
  for (let i = startIndex; i < limitIndex; i++) {
    const firstColor = labColors[i]
    const secondColor =
      i < limitIndex ? labColors[i + 1] : labColors[startIndex]
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
