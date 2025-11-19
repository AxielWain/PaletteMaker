import { nanoid } from 'nanoid'
import { useMemo } from 'react'

export function useKeyIds(totalIds: number, idLength = 12) {
  const keyIds = useMemo(() => {
    const ids: string[] = []
    for (let i = 0; i < totalIds; i++) {
      ids.push(nanoid(idLength))
    }
    return ids
  }, [totalIds])

  return keyIds
}
