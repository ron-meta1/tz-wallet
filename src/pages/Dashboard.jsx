import { useWallet } from "../context/WalletContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const { activeWallet, setActiveWallet } = useWallet();
    const navigate = useNavigate();

    if (!activeWallet) {
        navigate("/wallets");
    }

    const handleLock = () => {
        setActiveWallet(null);
    };

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">

            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

                <h2 className="text-2xl font-bold mb-6 text-center">Wallet Dashboard</h2>

                <div className="border rounded-xl p-4 space-y-3">

                    <div>
                        <p className="text-lg font-semibold">
                            Wallet : {activeWallet.name}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Address:
                        </p>
                        <h3 className="text-sm text-gray-500">
                            {activeWallet.address}
                        </h3>
                    </div>

                </div>

                <div className="space-y-3 mt-6">
                    <button
                        onClick={handleLock}
                        className="w-full bg-black text-white p-3 rounded-lg"
                    >
                        Lock Wallet
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;