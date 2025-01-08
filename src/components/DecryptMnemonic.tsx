import React, { useState } from "react";
import * as CryptoJS from "crypto-js";

const DecryptMnemonic: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [decryptedMnemonic, setDecryptedMnemonic] = useState<string>("");
  const encryptedMnemonic = localStorage.getItem("encryptedMnemonic");

  const handleDecrypt = (): void => {
    if (encryptedMnemonic) {
      const hashedPassword = CryptoJS.SHA256(password).toString();
      const iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
      try {
        const decryptedBytes = CryptoJS.AES.decrypt(
          encryptedMnemonic,
          CryptoJS.enc.Utf8.parse(hashedPassword),
          { iv }
        );
        const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8);
        if (!decrypted) {
          throw new Error("Invalid password");
        }
        setDecryptedMnemonic(decrypted);
      } catch (error) {
        alert(
          "Failed to decrypt mnemonic. Please check your password and try again."
        );
      }
    } else {
      alert("No encrypted mnemonic found in local storage.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        className="p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleDecrypt}
        className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
      >
        Decrypt Mnemonic
      </button>
      {decryptedMnemonic && (
        <div className="mt-4 p-4 border border-gray-300 rounded break-all">
          <p>Decrypted Mnemonic:</p>
          <p className="text-sm font-semibold">{decryptedMnemonic}</p>
        </div>
      )}
    </div>
  );
};

export default DecryptMnemonic;
