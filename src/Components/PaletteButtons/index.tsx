import './styles.css';

type Props = {
  onComputePalette: () => void;
  onResetPalette: () => void;
};

export function PaletteButtons({ onComputePalette, onResetPalette }: Props) {
  return (
    <div className="button-group">
      <button className="action-button" onClick={onComputePalette}>
        Compute Palette
      </button>
      <button className="action-button" onClick={onResetPalette}>
        Reset
      </button>
    </div>
  );
}
