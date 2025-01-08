import React from "react";
import * as bip39 from "bip39";

const MnemonicGenerator: React.FC = () => {
  const [Mnemonic, setMnemonic] = React.useState<string>("");

  const generateMnemonic = (): void => {
    const newMnemonic: string = bip39.generateMnemonic();
    setMnemonic(newMnemonic);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Mnemonic Generator</h1>
      <button
        onClick={generateMnemonic}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Generate Mnemonic
      </button>
      {Mnemonic && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md">
          <h2>Your Mnemonic:</h2>
          <p className="text-lg font-semibold">{Mnemonic}</p>
        </div>
      )}
    </div>
  );
};

export default MnemonicGenerator;
