import { useState } from 'react';
import './App.css';
import { BaseColorControls } from './Components/BaseColorControls';
import { BaseColorsPreview } from './Components/BaseColorsPreview';

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

function App() {
  const [baseColors, setBaseColors] = useState(initialColors);

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...baseColors];
    newColors.splice(index, 1, color);
    setBaseColors(newColors);
  };

  return (
    <div className="App">
      <BaseColorControls
        initialColors={initialColors}
        onColorChange={handleColorChange}
      />
      <BaseColorsPreview colors={baseColors} />
    </div>
  );
}

export default App;
