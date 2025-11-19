import { useState } from 'preact/hooks'
import './App.css'
import { BaseColorControls } from './Components/BaseColorControls'
import { ContrastPreview } from './Components/ContrastPreview'
import { JsonBox } from './Components/JsonBox'
import { PaletteTable } from './Components/PaletteTable'
import {
  computeColorDefinition,
  computeDerivedColors,
  computeShadesGrid,
  getEmptyShadesGrid,
  loadColorDefinition,
} from './utils'
import {
  baseLabels,
  derivedLabels,
  initialColors,
  TRANSPARENT_COLOR,
} from './utils/constants'

const maxShades = 12
const emptyShades = getEmptyShadesGrid(initialColors.length, maxShades)
const initialDerivedColors = computeDerivedColors(initialColors)
const emptyDerivedShades = getEmptyShadesGrid(
  initialDerivedColors.length,
  maxShades
)

const copy = (text: string) => {
  void navigator.clipboard.writeText(text)
}

function App() {
  const [isComputed, setIsComputed] = useState(false)
  const [colorJson, setColorJson] = useState('')
  const [baseColors, setBaseColors] = useState([...initialColors])
  const [loadedColors, setLoadedColors] = useState([...initialColors])
  const [derivedColors, setDerivedColors] = useState(initialDerivedColors)
  const [colorShades, setColorShades] = useState([...emptyShades])
  const [derivedShades, setDerivedShades] = useState([...emptyDerivedShades])

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...baseColors]
    newColors.splice(index, 1, color)
    const inBetween = computeDerivedColors(newColors)
    setBaseColors(newColors)
    setDerivedColors(inBetween)
    if (isComputed) {
      resetComputedColors()
    }
  }

  const computeShades = (colors: readonly string[]) => {
    const baseShades = computeShadesGrid(colors)
    setColorShades(baseShades)

    const inBetweenColors = computeDerivedColors(colors)
    const derivedShades = computeShadesGrid(inBetweenColors)
    setDerivedColors(inBetweenColors)
    setDerivedShades(derivedShades)

    const colorDefinition = JSON.stringify(
      computeColorDefinition({
        baseColors: colors,
        baseLabels,
        baseShades,
        derivedColors: inBetweenColors,
        derivedLabels,
        derivedShades,
      }),
      null,
      2
    )

    setColorJson(colorDefinition)
    setIsComputed(true)
  }

  const handleComputeShades = () => {
    computeShades(baseColors)
  }

  const resetComputedColors = () => {
    setColorJson('')
    setIsComputed(false)
    setColorShades([...emptyShades])
    setDerivedShades([...emptyDerivedShades])
  }

  const handleResetColors = () => {
    resetComputedColors()
    const baseColors = [...initialColors]
    setBaseColors(baseColors)
    setLoadedColors(baseColors)
  }

  const handleJsonBoxChange = (value: string) => {
    setColorJson(value)
  }

  const handleCopy = () => {
    copy(colorJson)
  }

  const handleLoad = () => {
    try {
      const colors = loadColorDefinition(colorJson)
      setBaseColors(colors)
      setLoadedColors(colors)
      computeShades(colors)
    } catch (_e) {
      console.warn(
        'Could not load Color Definition from pasted json, no changes made'
      )
    }
  }

  const backgroundColor = baseColors[7]
  const foregroundColor = baseColors[0]

  return (
    <div className="App">
      <BaseColorControls
        initialColors={loadedColors}
        onColorChange={handleColorChange}
      />
      <PaletteTable
        baseColors={baseColors}
        colorShades={colorShades}
        derivedColors={derivedColors}
        derivedShades={derivedShades}
        onComputePalette={handleComputeShades}
        onResetPalette={handleResetColors}
      />
      <div className="right-panel">
        <ContrastPreview
          isComputed={isComputed}
          background={backgroundColor}
          foreground={foregroundColor}
          baseColors={baseColors}
          colorShades={colorShades}
          derivedColors={derivedColors}
          derivedShades={derivedShades}
        />
        <JsonBox
          jsonString={colorJson}
          onChange={handleJsonBoxChange}
          onCopy={handleCopy}
          onLoad={handleLoad}
        />
      </div>
    </div>
  )
}

export default App
