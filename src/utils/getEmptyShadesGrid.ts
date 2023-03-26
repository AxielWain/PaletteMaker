export function getEmptyShadesGrid(totalColors: number, maxShades = 6) {
  const shadesGrid: string[] = [];
  for (let i = 0; i < maxShades; i++) {
    for (let j = 0; j < totalColors; j++) {
      shadesGrid.push('rgba(0, 0, 0, 0)');
    }
  }

  return shadesGrid;
}
