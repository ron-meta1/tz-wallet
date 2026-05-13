import { useState } from "react";
import { createWallet } from "./wallet/createWallet";

function App() {

  const [walletName, setWalletName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreate = async () => {

    try {

      setMessage("");

      if (!walletName) {
        setMessage("Please enter wallet name");
        return;
      }

      if (!password || !confirmPassword) {
        setMessage("Please fill all fields");
        return;
      }

      if (password.length < 8) {
        setMessage("Password must be at least 8 characters");
        return;
      }

      if (password !== confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }

      setLoading(true);
      const wallet = await createWallet(walletName, password);
      console.log(wallet);
      setMessage("Wallet Created Successfully");
      setWalletName("");
      setPassword("");
      setConfirmPassword("");

    } catch (err) {

      console.error(err);
      setMessage("Failed to create wallet");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center" style={{ padding: "20px" }}>

      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">Create Wallet</h2>

        <input
          type="text"
          placeholder="Wallet Name"
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <br />
        <br />

        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded-lg"
        >
          {loading ? "Creating..." : "Create Wallet"}
        </button>

        {message && (
          <p className="mt-4 text-center">{message}</p>
        )}

      </div>

    </div>
  );
}

export default App;