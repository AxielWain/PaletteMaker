import { useState } from 'react';
import './App.css';
import { BaseColorControls } from './Components/BaseColorControls';
import { BaseColorsPreview } from './Components/BaseColorsPreview';
import { ShadesGridPreview } from './Components/ShadesGridPreview';
import {
  computeDerivedColors,
  computeShadesGrid,
  getEmptyShadesGrid,
} from './utils';

const initialColors = [
  '#ffffff', //white
  '#ff0000', //red
  '#ffff00', //yellow
  '#00ff00', //green
  '#00ffff', //cyan
  '#0000ff', //blue
  '#ff00ff', //magenta
  '#000000', //black
];

const emptyShades = getEmptyShadesGrid(initialColors.length);
const initialDerivedColors = getEmptyShadesGrid(6, 1);
const emptyDerivedShades = getEmptyShadesGrid(initialDerivedColors.length);

function App() {
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

  const handleComputeShades = () => {
    const baseShades = computeShadesGrid(baseColors, 6);
    setDarkerShades(baseShades.darkerGridColors);
    setLighterShades(baseShades.lighterGridColors);

    const inBetweenColors = computeDerivedColors(baseColors);
    const derivedShades = computeShadesGrid(inBetweenColors, 4);
    setDerivedColors(inBetweenColors);
    setDerivedDarkerShades(derivedShades.darkerGridColors);
    setDerivedLighterShades(derivedShades.lighterGridColors);
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
    </div>
  );
}

export default App;
