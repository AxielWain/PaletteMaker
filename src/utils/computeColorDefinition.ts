import { TRANSPARENT_COLOR } from './constants'

type ColorArrays = {
  baseColors: readonly string[]
  baseLabels: readonly string[]
  baseShades: string[]
  derivedColors: string[]
  derivedLabels: readonly string[]
  derivedShades: string[]
}

type ColorDefinition = { [key: string]: string }

function buildLabel(label: string, index: number) {
  return `${label}${index}`
}

function addShadesLabels(
  definition: ColorDefinition,
  colorIndex: number,
  totalColors: number,
  shades: string[],
  labels: readonly string[],
  rows: number,
  offset = 0
) {
  for (let i = 0; i < rows; i++) {
    const index = i * totalColors + colorIndex
    const color = shades[index]
    if (color !== TRANSPARENT_COLOR) {
      const label = buildLabel(labels[colorIndex], i + 1 + offset)
      definition[label] = color
    }
  }
}

function addLabels(
  definition: ColorDefinition,
  colors: readonly string[],
  labels: readonly string[],
  shades: string[]
) {
  const rows = shades.length / colors.length

  for (let i = 0; i < colors.length; i++) {
    definition[labels[i]] = colors[i]
    addShadesLabels(definition, i, colors.length, shades, labels, rows)
  }
}

export function computeColorDefinition(colorArrays: ColorArrays) {
  const result: { [key: string]: string } = {}

  const {
    baseColors,
    baseLabels,
    baseShades,
    derivedColors,
    derivedLabels,
    derivedShades,
  } = colorArrays

  addLabels(result, baseColors, baseLabels, baseShades)

  addLabels(result, derivedColors, derivedLabels, derivedShades)

  return result
}
