import { useState } from 'react';
import './App.css';
import { BaseColorControls } from './Components/BaseColorControls';
import { ContrastPreview } from './Components/ContrastPreview';
import { GridHeader } from './Components/GridHeader';
import { JsonBox } from './Components/JsonBox';
import { PaletteControls } from './Components/PaletteControls';
import { PaletteGrid } from './Components/PaletteGrid';
import {
  computeColorDefinition,
  computeDerivedColors,
  computeShadesGrid,
  getEmptyShadesGrid,
  loadColorDefinition,
} from './utils';
import {
  TRANSPARENT_COLOR,
  baseLabels,
  columnBaseHeaders,
  columnDerivedHeaders,
  derivedLabels,
  initialColors,
  rowHeaders,
} from './utils/constants';

const emptyShades = getEmptyShadesGrid(initialColors.length);
const initialDerivedColors = getEmptyShadesGrid(6, 1);
const emptyDerivedShades = getEmptyShadesGrid(initialDerivedColors.length);

const copy = (text: string) => {
  void navigator.clipboard.writeText(text);
};

function App() {
  const [isComputed, setIsComputed] = useState(false);
  const [colorJson, setColorJson] = useState('');
  const [clickedColor, setClickedColor] = useState(initialColors[0]);
  const [baseColors, setBaseColors] = useState([...initialColors]);
  const [loadedColors, setLoadedColors] = useState([...initialColors]);
  const [darkerShades, setDarkerShades] = useState([...emptyShades]);
  const [lighterShades, setLighterShades] = useState([...emptyShades]);
  const [derivedColors, setDerivedColors] = useState(initialDerivedColors);
  const [derivedDarkerShades, setDerivedDarkerShades] = useState([
    ...emptyDerivedShades,
  ]);
  const [derivedLighterShades, setDerivedLighterShades] = useState([
    ...emptyDerivedShades,
  ]);

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...baseColors];
    newColors.splice(index, 1, color);
    setBaseColors(newColors);
    if (isComputed) {
      resetComputedColors();
    }
  };

  const handleClickColor = (color: string) => {
    setClickedColor(color);
  };

  const computeShades = (colors: readonly string[]) => {
    const baseShades = computeShadesGrid(colors);
    setDarkerShades(baseShades.darkerGridColors);
    setLighterShades(baseShades.lighterGridColors);

    const inBetweenColors = computeDerivedColors(colors);
    const derivedShades = computeShadesGrid(inBetweenColors);
    setDerivedColors(inBetweenColors);
    setDerivedDarkerShades(derivedShades.darkerGridColors);
    setDerivedLighterShades(derivedShades.lighterGridColors);

    const colorDefinition = JSON.stringify(
      computeColorDefinition({
        baseColors: colors,
        baseLabels,
        baseShades,
        derivedColors: inBetweenColors,
        derivedLabels,
        derivedShades,
      }),
      null,
      2
    );

    setColorJson(colorDefinition);
    setIsComputed(true);
  };

  const handleComputeShades = () => {
    computeShades(baseColors);
  };

  const resetComputedColors = () => {
    setDerivedColors([...initialDerivedColors]);
    setDarkerShades([...emptyShades]);
    setLighterShades([...emptyShades]);
    setDerivedDarkerShades([...emptyDerivedShades]);
    setDerivedLighterShades([...emptyDerivedShades]);
    setColorJson('');
    setIsComputed(false);
  };

  const handleResetColors = () => {
    resetComputedColors();
    const baseColors = [...initialColors];
    setBaseColors(baseColors);
    setLoadedColors(baseColors);
  };

  const handleJsonBoxChange = (value: string) => {
    setColorJson(value);
  };

  const handleCopy = () => {
    copy(colorJson);
  };

  const handleLoad = () => {
    try {
      const colors = loadColorDefinition(colorJson);
      setBaseColors(colors);
      setLoadedColors(colors);
      computeShades(colors);
    } catch (e) {
      console.warn(
        'Could not load Color Definition from pasted json, no changes made'
      );
    }
  };

  const backgroundColor =
    lighterShades[39] !== TRANSPARENT_COLOR ? lighterShades[39] : baseColors[7];
  const foregroundColor = baseColors[0];

  return (
    <div className="App">
      <BaseColorControls
        initialColors={loadedColors}
        onColorChange={handleColorChange}
      />
      <div>
        <div className="palette-grids">
          <div className="palette-grid-column">
            <GridHeader
              alignItems="center"
              columnCount={1}
              headers={rowHeaders}
              justifyContent="end"
            />
            <div>
              <GridHeader
                alignItems="end"
                columnCount={initialColors.length}
                headers={columnBaseHeaders}
                justifyContent="center"
              />
              <div className="palette">
                <PaletteGrid
                  colors={lighterShades}
                  columnCount={initialColors.length}
                  onClick={handleClickColor}
                />
                <PaletteGrid
                  colors={baseColors}
                  columnCount={baseColors.length}
                  onClick={handleClickColor}
                />
                <PaletteGrid
                  colors={darkerShades}
                  columnCount={initialColors.length}
                  onClick={handleClickColor}
                />
              </div>
            </div>
          </div>
          <div className="palette-grid-column">
            <GridHeader
              className="derived-column-header"
              alignItems="center"
              columnCount={1}
              headers={rowHeaders}
              justifyContent="end"
            />
            <div>
              <GridHeader
                alignItems="end"
                columnCount={derivedColors.length}
                headers={columnDerivedHeaders}
                justifyContent="center"
              />
              <div className="palette">
                <PaletteGrid
                  colors={derivedLighterShades}
                  columnCount={derivedColors.length}
                  onClick={handleClickColor}
                />
                <PaletteGrid
                  colors={derivedColors}
                  columnCount={derivedColors.length}
                  onClick={handleClickColor}
                />
                <PaletteGrid
                  colors={derivedDarkerShades}
                  columnCount={derivedColors.length}
                  onClick={handleClickColor}
                />
              </div>
            </div>
          </div>
        </div>
        <PaletteControls
          clickedColor={clickedColor}
          onComputePalette={handleComputeShades}
          onResetPalette={handleResetColors}
        />
      </div>
      <div className="right-panel">
        <ContrastPreview
          isComputed={isComputed}
          background={backgroundColor}
          foreground={foregroundColor}
          baseColors={baseColors}
          darkerShades={darkerShades}
          lighterShades={lighterShades}
          derivedColors={derivedColors}
          derivedDarkerShades={derivedDarkerShades}
          derivedLighterShades={derivedLighterShades}
        />
        <JsonBox
          jsonString={colorJson}
          onChange={handleJsonBoxChange}
          onCopy={handleCopy}
          onLoad={handleLoad}
        />
      </div>
    </div>
  );
}

export default App;
