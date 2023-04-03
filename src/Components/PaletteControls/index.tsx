import { invert } from 'polished';
import './styles.css';

type Props = {
  clickedColor: string;
  onComputePalette: () => void;
  onResetPalette: () => void;
};

export function PaletteControls({
  clickedColor,
  onComputePalette,
  onResetPalette,
}: Props) {
  const handleCopyColor = () => {
    navigator.clipboard.writeText(clickedColor).then(() => {
      console.log('Color copied to clipboard', clickedColor);
    });
  };
  return (
    <div className="palette-controls">
      <div className="button-group">
        <button className="action-button" onClick={onComputePalette}>
          Compute Palette
        </button>
        <button className="action-button" onClick={onResetPalette}>
          Reset
        </button>
      </div>
      <div className="color-copy">
        <label className="color-label">
          Clicked Color: <span className="color-value">{clickedColor}</span>
          <span
            className="color-preview"
            style={{
              backgroundColor: clickedColor,
              borderColor: invert(clickedColor),
            }}
          ></span>
        </label>
        <button className="action-button" onClick={handleCopyColor}>
          Copy
        </button>
      </div>
    </div>
  );
}
