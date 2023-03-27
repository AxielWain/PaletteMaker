import { useState } from 'react';
import './App.css';
import { BaseColorControls } from './Components/BaseColorControls';
import { BaseColorsPreview } from './Components/BaseColorsPreview';
import { JsonBox } from './Components/JsonBox';
import { ShadesGridPreview } from './Components/ShadesGridPreview';
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
  const [colorJson, setColorJson] = useState('');
  const [baseColors, setBaseColors] = useState(initialColors);
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
  };

  const handleComputeShades = () => {
    computeShades(baseColors);
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
        initialColors={initialColors}
        onColorChange={handleColorChange}
      />
      <div>
        <div className="palette-grids">
          <div className="palette">
            <ShadesGridPreview
              colors={lighterShades}
              columnCount={initialColors.length}
            />
            <BaseColorsPreview colors={baseColors} />
            <ShadesGridPreview
              colors={darkerShades}
              columnCount={initialColors.length}
            />
          </div>
          <div className="palette">
            <ShadesGridPreview
              colors={derivedLighterShades}
              columnCount={derivedColors.length}
            />
            <BaseColorsPreview colors={derivedColors} />
            <ShadesGridPreview
              colors={derivedDarkerShades}
              columnCount={derivedColors.length}
            />
          </div>
        </div>
        <button className="compute-btn" onClick={handleComputeShades}>
          Compute Palette
        </button>
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
