import { Shade } from '../types'

export const getShadeName = (shade: Shade) => {
  return `${shade.parentName}${shade.index > 0 ? shade.index : 'Home'} `
}
