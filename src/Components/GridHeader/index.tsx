import './styles.css';

type Props = {
  alignItems: 'center' | 'end';
  columnCount: number;
  headers: readonly string[];
  justifyContent: 'center' | 'end';
};

export function HeaderGrid({
  alignItems,
  columnCount,
  headers,
  justifyContent,
}: Props) {
  return (
    <div
      className="header-grid"
      style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
    >
      {headers.map((header) => (
        <strong
          className="title"
          key={header}
          style={{ alignItems, justifyContent }}
        >
          {header}
        </strong>
      ))}
    </div>
  );
}
