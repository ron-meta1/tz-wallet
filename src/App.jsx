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
    <div style={{ padding: "20px" }}>

      <h2>Create Wallet</h2>

      <input
        type="text"
        placeholder="Wallet Name"
        value={walletName}
        onChange={(e) => setWalletName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <br />
      <br />

      <button
        onClick={handleCreate}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Wallet"}
      </button>

      <p>{message}</p>

    </div>
  );
}

export default App;