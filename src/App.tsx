import { useState } from 'react';
import './App.css';
import { BaseColorControls } from './Components/BaseColorControls';
import { BaseColorsPreview } from './Components/BaseColorsPreview';
import { ShadesGridPreview } from './Components/ShadesGridPreview';
import { computeShadesGrid } from './utils/computeShadesGrid';
import { getEmptyShadesGrid } from './utils/getEmptyShadesGrid';

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

function App() {
  const [darkerShades, setDarkerShades] = useState([...emptyShades]);
  const [lighterShades, setLighterShades] = useState([...emptyShades]);
  const [baseColors, setBaseColors] = useState(initialColors);

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...baseColors];
    newColors.splice(index, 1, color);
    setBaseColors(newColors);
  };

  const handleComputeShades = () => {
    const { darkerGridColors, lighterGridColors } = computeShadesGrid(
      baseColors,
      6
    );
    setDarkerShades(darkerGridColors);
    setLighterShades(lighterGridColors);
  };

  return (
    <div className="App">
      <BaseColorControls
        initialColors={initialColors}
        onColorChange={handleColorChange}
      />
      <div>
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
        <button className="compute-btn" onClick={handleComputeShades}>
          Compute Palette
        </button>
      </div>
    </div>
  );
}

export default App;
