import './App.css';
import { HslColorControl } from './Components/HslColorControl';

function App() {
  return (
    <div className="App">
      <HslColorControl initialColor="#00ee55" onColorChange={() => {}} />
    </div>
  );
}

export default App;
