import { useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { unlockWallet } from "../wallet/unlockWallet";
import { useWallet } from "../context/WalletContext";
import NavLinkButton from "../components/NavLinkButton";

function UnlockWallet() {

    const { setActiveWallet } = useWallet();
    const navigate = useNavigate();
    const location = useLocation();

    if (!location.state?.address) {
        return <Navigate to="/" />;
    }

    const { address } = location.state;
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUnlock = async () => {

        try {

            setLoading(true);
            setMessage("");

            if (!password) {
                setMessage("Please enter password");
                return;
            }

            const unlockedWallet = await unlockWallet(
                address,
                password
            );
            
            setActiveWallet(unlockedWallet);
            setMessage("Wallet Unlocked");
            navigate("/dashboard")

        } catch (err) {
            setMessage(err.message);

        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

                <h2 className="text-2xl font-bold mb-6 text-center">Unlock Wallet</h2>
                <p className="text-sm text-gray-500 mb-4 break-all">{address}</p>

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-3 rounded-lg mb-4"
                />

                <button
                    onClick={handleUnlock}
                    disabled={loading}
                    className="w-full bg-black text-white p-3 rounded-lg"
                >
                    {loading ? "Unlocking..." : "Unlock Wallet"}
                </button>

                {message && (
                    <p className="mt-4 text-center">
                        {message}
                    </p>
                )}

                {/* {wallet && (
                    <div className="mt-6 border rounded-lg p-4">
                        <h3 className="font-bold mb-2">
                            Unlocked Wallet
                        </h3>
                        <p className="text-sm break-all">
                            {wallet.address}
                        </p>
                    </div>
                )} */}

                <NavLinkButton to="/">
                    Accounts
                </NavLinkButton>

            </div>
        </div>
    );
}

export default UnlockWallet;