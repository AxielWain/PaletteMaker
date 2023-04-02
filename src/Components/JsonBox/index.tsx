import './styles.css';

type Props = {
  jsonString: string;
  onCopy: () => void;
  onPaste: () => void;
};

export function JsonBox({ jsonString, onCopy, onPaste }: Props) {
  return (
    <div>
      <textarea className="json-box" value={jsonString} readOnly />
      <div className="horizontal-button-group">
        <button onClick={onCopy}>Copy</button>
        <button onClick={onPaste}>Paste</button>
      </div>
    </div>
  );
}
