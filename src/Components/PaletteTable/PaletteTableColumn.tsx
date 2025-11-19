import { GridHeader } from '../GridHeader'
import { PaletteGrid } from '../PaletteGrid'

type Props = {
  colors: readonly string[]
  shades: readonly string[]
  columnHeaders: readonly string[]
  rowHeaders: readonly string[]
  rowHeadersClass?: string
  onClickedColor: (color: string) => void
}

export function PaletteTableColumn({
  colors,
  columnHeaders,
  rowHeaders,
  rowHeadersClass,
  shades,
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
            colors={shades}
            columnCount={colors.length}
            onClick={onClickedColor}
          />
        </div>
      </div>
    </div>
  )
}
