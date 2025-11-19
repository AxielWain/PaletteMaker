import { useState } from 'preact/hooks'
import {
  columnBaseHeaders,
  columnDerivedHeaders,
  initialColors,
  rowHeaders,
} from '../../utils/constants'
import { PaletteControls } from '../PaletteControls'
import { PaletteTableColumn } from './PaletteTableColumn'
import './styles.css'

type Props = {
  baseColors: readonly string[]
  colorShades: readonly string[]
  derivedColors: readonly string[]
  derivedShades: readonly string[]
  onComputePalette: () => void
  onResetPalette: () => void
}

export function PaletteTable({
  baseColors,
  colorShades,
  derivedColors,
  derivedShades,
  onComputePalette,
  onResetPalette,
}: Props) {
  const [clickedColor, setClickedColor] = useState(initialColors[0])
  return (
    <div>
      <div className="palette-grids">
        <PaletteTableColumn
          colors={baseColors}
          shades={colorShades}
          columnHeaders={columnBaseHeaders}
          rowHeaders={rowHeaders}
          onClickedColor={setClickedColor}
        />
        <PaletteTableColumn
          colors={derivedColors}
          shades={derivedShades}
          columnHeaders={columnDerivedHeaders}
          rowHeaders={rowHeaders}
          rowHeadersClass="derived-column-header"
          onClickedColor={setClickedColor}
        />
      </div>
      <PaletteControls
        clickedColor={clickedColor}
        onComputePalette={onComputePalette}
        onResetPalette={onResetPalette}
      />
    </div>
  )
}
