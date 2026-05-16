import Web3 from "web3";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Check } from 'lucide-react';
import { useWallet } from "../context/WalletContext";
import { getBalance } from "../wallet/getBalance";
import { formatBalance } from "../utils/formatBalance";
import { NETWORKS } from "../config/networks";
import CopyButton from "../components/CopyButton";

function Dashboard() {

    const [balance, setBalance] = useState("0");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const { activeWallet, setActiveWallet, network, setNetwork } = useWallet();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!activeWallet) {
    //         navigate("/");
    //     }
    // }, [activeWallet, navigate]);
    
    useEffect(() => {
        
        const fetchBalance = async () => {

            try {
                
                setLoading(true)
                if (!activeWallet) return;
                
                const eth = await getBalance(activeWallet.address, network);
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
    
    // const handleCopy = async () => {
    //     try {
    //         await navigator.clipboard.writeText(activeWallet.address);
    //         setCopied(true);

    //         setTimeout(() => {
    //             setCopied(false);
    //         }, 2000);

    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    // if (!activeWallet) {
    //     return null;
    // }

    return (

        <div className="min-h-dvh bg-gray-100 flex justify-center p-2">

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
                        <div className="flex items-center justify-between gap-1">
                            <h3 className="text-sm text-gray-500 break-all">
                                {activeWallet.address}
                            </h3>
                            <CopyButton text={activeWallet.address} />
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
                            ) : `${formatBalance(balance,6)} ${NETWORKS[network].symbol}`}
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

                <div className="space-y-3 mt-6">
                    <button
                        onClick={() => navigate("/send")}
                        className="w-full bg-black text-white p-3 rounded-lg"
                    >
                        Send Transaction
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;