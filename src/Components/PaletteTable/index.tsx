import { useState } from 'react';
import {
  columnBaseHeaders,
  columnDerivedHeaders,
  initialColors,
  rowHeaders,
} from '../../utils/constants';
import { PaletteControls } from '../PaletteControls';
import { PaletteTableColumn } from './PaletteTableColumn';
import './styles.css';

type Props = {
  baseColors: readonly string[];
  lighterShades: readonly string[];
  darkerShades: readonly string[];
  derivedColors: readonly string[];
  derivedLighterShades: readonly string[];
  derivedDarkerShades: readonly string[];
  onComputePalette: () => void;
  onResetPalette: () => void;
};

export function PaletteTable({
  baseColors,
  lighterShades,
  darkerShades,
  derivedColors,
  derivedLighterShades,
  derivedDarkerShades,
  onComputePalette,
  onResetPalette,
}: Props) {
  const [clickedColor, setClickedColor] = useState(initialColors[0]);
  return (
    <div>
      <div className="palette-grids">
        <PaletteTableColumn
          colors={baseColors}
          lighterColors={lighterShades}
          darkerColors={darkerShades}
          columnHeaders={columnBaseHeaders}
          rowHeaders={rowHeaders}
          onClickedColor={setClickedColor}
        />
        <PaletteTableColumn
          colors={derivedColors}
          lighterColors={derivedLighterShades}
          darkerColors={derivedDarkerShades}
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
  );
}
