import { HslColorControl } from '../HslColorControl';
import './styles.css';

type Props = {
  initialColors: string[];
  onColorChange: (index: number, color: string) => void;
};

export function BaseColorControls({ initialColors, onColorChange }: Props) {
  return (
    <div className="color-controls">
      {initialColors.map((color, index) => (
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
