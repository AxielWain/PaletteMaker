import { useKeyIds } from '../../hooks';
import { ColorPreview } from '../ColorPreview';
import './styles.css';

type Props = {
  colors: readonly string[];
  columnCount: number;
  onClick: (color: string) => void;
};

export function PaletteGrid({ colors, columnCount, onClick }: Props) {
  const keyIds = useKeyIds(colors.length);
  return (
    <div
      className="palette-grid"
      style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
    >
      {colors.map((color, index) => (
        <ColorPreview key={keyIds[index]} color={color} onClick={onClick} />
      ))}
    </div>
  );
}
