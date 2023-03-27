import { useEffect, useState } from 'react';
import { HslColorControl } from '../HslColorControl';
import './styles.css';

type Props = {
  initialColors: readonly string[];
  onColorChange: (index: number, color: string) => void;
};

export function BaseColorControls({ initialColors, onColorChange }: Props) {
  const [colors, setColors] = useState(initialColors);
  useEffect(() => {
    setColors(initialColors);
  }, [initialColors]);
  return (
    <div className="color-controls">
      {colors.map((color, index) => (
        <HslColorControl
          key={color}
          initialColor={color}
          onColorChange={(color) => {
            onColorChange(index, color);
          }}
        />
      ))}
    </div>
  );
}
