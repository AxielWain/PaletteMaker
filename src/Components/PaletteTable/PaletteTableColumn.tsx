import { GridHeader } from '../GridHeader'
import { PaletteGrid } from '../PaletteGrid'

type Props = {
  colors: readonly string[]
  lighterColors: readonly string[]
  darkerColors: readonly string[]
  columnHeaders: readonly string[]
  rowHeaders: readonly string[]
  rowHeadersClass?: string
  onClickedColor: (color: string) => void
}

export function PaletteTableColumn({
  colors,
  lighterColors,
  darkerColors,
  columnHeaders,
  rowHeaders,
  rowHeadersClass,
  onClickedColor,
}: Props) {
  return (
    <div className="palette-grid-column">
      <GridHeader
        alignItems="center"
        className={rowHeadersClass}
        columnCount={1}
        headers={rowHeaders}
        justifyContent="end"
      />
      <div>
        <GridHeader
          alignItems="end"
          columnCount={colors.length}
          headers={columnHeaders}
          justifyContent="center"
        />
        <div className="palette">
          <PaletteGrid
            colors={colors}
            columnCount={colors.length}
            onClick={onClickedColor}
          />
          <PaletteGrid
            colors={lighterColors}
            columnCount={colors.length}
            onClick={onClickedColor}
          />
          <PaletteGrid
            colors={darkerColors}
            columnCount={colors.length}
            onClick={onClickedColor}
          />
        </div>
      </div>
    </div>
  )
}
