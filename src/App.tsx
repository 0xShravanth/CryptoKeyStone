import "./App.css";
import DecryptMnemonic from "./components/DecryptMnemonic";
import MnemonicGenerator from "./components/MnemonicGenerator";

function App() {
  return (
    <>
      <div className="App">
        <MnemonicGenerator />
        <DecryptMnemonic />
      </div>
    </>
  );
}

export default App;
