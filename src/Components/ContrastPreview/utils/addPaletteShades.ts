import { Shade } from '../types'
import { addShades } from './addShades'
import { BaseNames, DerivedNames } from './constants'

export const addPaletteShades = (
  palette: Shade[][],
  baseColors: string[],
  derivedColors: string[],
  shadeNameOffset = 0,
  totalRows = 1
) => {
  for (let i = 0; i < totalRows; i++) {
    const row: Shade[] = []
    addShades(row, baseColors, BaseNames, i * 8, i + shadeNameOffset, 7, 1)
    addShades(row, derivedColors, DerivedNames, i * 6, i + shadeNameOffset, 6)

    palette.push(row)
  }
}
