import React, { useState } from "react";
import * as CryptoJS from "crypto-js";

interface PasswordFormProps {
  mnemonic: string;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ mnemonic }) => {
  const [password, setPassword] = useState<string>("");
  const [encryptedMnemonic, setEncryptedMnemonic] = useState<string>("");

  const handleEncrypt = (): void => {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
    const encrypted = CryptoJS.AES.encrypt(
      mnemonic,
      CryptoJS.enc.Utf8.parse(hashedPassword),
      { iv }
    ).toString();
    setEncryptedMnemonic(encrypted);
    localStorage.setItem("encryptedMnemonic", encrypted);
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter a password"
        className="p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleEncrypt}
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
      >
        Encrypt Mnemonic
      </button>
      {encryptedMnemonic && (
        <div className="mt-4 p-4 border border-gray-300 rounded break-all">
          <p>Encrypted Mnemonic:</p>
          <p className="text-sm font-semibold">{encryptedMnemonic}</p>
        </div>
      )}
    </div>
  );
};

export default PasswordForm;
