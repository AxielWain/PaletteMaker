import './styles.css'

type Props = {
  alignItems: 'center' | 'end'
  className?: string
  columnCount: number
  headers: readonly string[]
  justifyContent: 'center' | 'end'
}

export function GridHeader({
  alignItems,
  className,
  columnCount,
  headers,
  justifyContent,
}: Props) {
  return (
    <div
      className={`grid-header ${className}`}
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
  )
}
