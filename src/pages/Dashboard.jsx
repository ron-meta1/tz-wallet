import Web3 from "web3";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Check } from 'lucide-react';
import { useWallet } from "../context/WalletContext";
import { NETWORKS } from "../config/networks";

function Dashboard() {

    const [balance, setBalance] = useState("0");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const { activeWallet, setActiveWallet, network, setNetwork } = useWallet();
    const navigate = useNavigate();

    useEffect(() => {
        if (!activeWallet) {
            navigate("/");
        }
    }, [activeWallet, navigate]);
    
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                
                setLoading(true)
                if (!activeWallet) return;
                
                const selectedNetwork = NETWORKS[network];
                
                if (!selectedNetwork) {
                    throw new Error("Invalid network");
                }
                
                const web3 = new Web3(selectedNetwork.rpc);
                const wei = await web3.eth.getBalance(activeWallet.address);
                const eth = web3.utils.fromWei(wei, "ether");
                setBalance(eth)
                
            } catch (err) {
                
                console.error(err);
                setBalance("Error");
            } finally {
                setLoading(false);
            }
            
        };
        fetchBalance()
    }, [activeWallet, network]);
    
    const handleLock = () => {
        setActiveWallet(null);
    };
    
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(activeWallet.address);
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);

        } catch (err) {
            console.error(err);
        }
    };

    if (!activeWallet) {
        return null;
    }

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
                        <div className="flex items-center gap-1">
                            <h3 className="text-sm text-gray-500">
                                {activeWallet.address}
                            </h3>
                            <button
                                onClick={handleCopy}
                                className={`cursor-pointer hover:bg-gray-200 transition duration-300 active:bg-gray-400 active:scale-90 rounded-full p-2 ${copied? "bg-gray-200" : ""}`}
                            >
                                {copied ? (
                                    <Check size={12}/>
                                ) : (
                                    <Copy size={12}/>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-3">
                    <select
                        value={network}
                        onChange={(e) => setNetwork(e.target.value)}
                        className="
                            bg-white
                            border
                            border-gray-300
                            rounded-lg
                            px-2
                            py-1
                            text-sm
                            font-medium
                            shadow-sm
                            outline-none
                            cursor-pointer
                            transition
                            focus:border-gray-500
                        "
                    >
                        {Object.entries(NETWORKS).map(([key, net]) => (
                            <option key={key} value={key}>
                                {net.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mt-3">
                    <p className="text-sm font-semibold px-1">
                        Balance: {loading ? (
                            <span className="inline-block w-20 h-4 bg-gray-300 rounded animate-pulse align-middle"></span>
                            ) : `${balance} ${NETWORKS[network].symbol}`}
                    </p>
                </div>

                <div className="mt-3">
                    <button
                        onClick={() =>
                            window.open(
                            `${NETWORKS[network].explorer}/address/${activeWallet.address}`,
                            "_blank"
                            )
                        }
                        className="
                            text-sm
                            text-blue-600
                            hover:text-black
                            font-medium
                            px-2
                            py-1
                            rounded-md
                            hover:bg-gray-100
                            transition
                            cursor-pointer
                        "
                    >
                        View on Explorer
                    </button>
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