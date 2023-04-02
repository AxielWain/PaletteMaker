import { useState } from 'react';
import './App.css';
import { BaseColorControls } from './Components/BaseColorControls';
import { JsonBox } from './Components/JsonBox';
import { PaletteButtons } from './Components/PaletteButtons';
import { PaletteGrid } from './Components/PaletteGrid';
import {
  computeColorDefinition,
  computeDerivedColors,
  computeShadesGrid,
  getEmptyShadesGrid,
  loadColorDefinition,
} from './utils';
import { baseLabels, derivedLabels, initialColors } from './utils/constants';

const emptyShades = getEmptyShadesGrid(initialColors.length);
const initialDerivedColors = getEmptyShadesGrid(6, 1);
const emptyDerivedShades = getEmptyShadesGrid(initialDerivedColors.length);

const copy = (text: string) => {
  void navigator.clipboard.writeText(text);
};

function App() {
  const [isComputed, setIsComputed] = useState(false);
  const [colorJson, setColorJson] = useState('');
  const [baseColors, setBaseColors] = useState(initialColors);
  const [loadedColors, setLoadedColors] = useState(initialColors);
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
      setIsComputed(false);
    }
  };

  const computeShades = (colors: readonly string[]) => {
    const baseShades = computeShadesGrid(colors, 6);
    setDarkerShades(baseShades.darkerGridColors);
    setLighterShades(baseShades.lighterGridColors);

    const inBetweenColors = computeDerivedColors(colors);
    const derivedShades = computeShadesGrid(inBetweenColors, 4);
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
    copy(colorDefinition);
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
  };

  const handleResetColors = () => {
    resetComputedColors();
    const baseColors = [...initialColors];
    setBaseColors(baseColors);
    setLoadedColors(baseColors);
  };

  const handleCopy = () => {
    copy(colorJson);
  };

  const handlePaste = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        try {
          const colors = loadColorDefinition(text);
          setBaseColors(colors);
          setLoadedColors(colors);
          computeShades(colors);
        } catch (e) {
          throw e;
        }
      })
      .catch(() => {
        console.warn(
          'Could not load Color Definition from pasted json, no changes made'
        );
      });
  };

  return (
    <div className="App">
      <BaseColorControls
        initialColors={loadedColors}
        onColorChange={handleColorChange}
      />
      <div>
        <div className="palette-grids">
          <div className="palette">
            <PaletteGrid
              colors={lighterShades}
              columnCount={initialColors.length}
            />
            <PaletteGrid colors={baseColors} columnCount={baseColors.length} />
            <PaletteGrid
              colors={darkerShades}
              columnCount={initialColors.length}
            />
          </div>
          <div className="palette">
            <PaletteGrid
              colors={derivedLighterShades}
              columnCount={derivedColors.length}
            />
            <PaletteGrid
              colors={derivedColors}
              columnCount={derivedColors.length}
            />
            <PaletteGrid
              colors={derivedDarkerShades}
              columnCount={derivedColors.length}
            />
          </div>
        </div>
        <PaletteButtons
          onComputePalette={handleComputeShades}
          onResetPalette={handleResetColors}
        />
      </div>
      <div>
        <JsonBox
          jsonString={colorJson}
          onCopy={handleCopy}
          onPaste={handlePaste}
        />
      </div>
    </div>
  );
}

export default App;
