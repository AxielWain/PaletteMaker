import { useState } from 'react';
import './App.css';
import { BaseColorControls } from './Components/BaseColorControls';
import { ContrastPreview } from './Components/ContrastPreview';
import { JsonBox } from './Components/JsonBox';
import { PaletteTable } from './Components/PaletteTable';
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
  derivedLabels,
  initialColors,
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
      <PaletteTable
        baseColors={baseColors}
        lighterShades={lighterShades}
        darkerShades={darkerShades}
        derivedColors={derivedColors}
        derivedLighterShades={derivedLighterShades}
        derivedDarkerShades={derivedDarkerShades}
        onComputePalette={handleComputeShades}
        onResetPalette={handleResetColors}
      />
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
