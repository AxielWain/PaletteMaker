import { TRANSPARENT_COLOR } from './constants'

export function getEmptyShadesGrid(totalColors: number, maxShades = 6) {
  const shadesGrid: string[] = []
  for (let i = 0; i < maxShades; i++) {
    for (let j = 0; j < totalColors; j++) {
      shadesGrid.push(TRANSPARENT_COLOR)
    }
  }

  return shadesGrid
}
