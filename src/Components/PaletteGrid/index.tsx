import { useKeyIds } from '../../hooks';
import { ColorPreview } from '../ColorPreview';
import './styles.css';

type Props = {
  colors: readonly string[];
  columnCount: number;
};

export function PaletteGrid({ colors, columnCount }: Props) {
  const keyIds = useKeyIds(colors.length);
  return (
    <div
      className="palette-grid"
      style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
    >
      {colors.map((color, index) => (
        <ColorPreview key={keyIds[index]} color={color} />
      ))}
    </div>
  );
}
