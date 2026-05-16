import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendTransaction } from "../wallet/sendTransaction";
import { shortenAddress } from "../utils/shortenAddress";
import { useWallet } from "../context/WalletContext";
import { NETWORKS } from "../config/networks";
import CopyButton from "../components/CopyButton"

function ConfirmTransaction() {

    const navigate = useNavigate();
    const location = useLocation();
    const { to, amount } = location.state;
    const { activeWallet, network } = useWallet();
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [message, setMessage] = useState("");
    const [txHash, setTxHash] = useState("");

    const handleConfirm = async () => {
        try {
            setLoading(true);

            const receipt = await sendTransaction({
                activeWallet,
                network,
                to,
                amount
            });

            setSent(true);
            setTxHash(receipt.transactionHash);
            setMessage("Transaction Sent Successfully");

            setTimeout(() => {
                navigate("/dashboard");
            }, 5000);

        } catch(err) {

            setMessage(err.message)

        } finally {
            
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/send")
    }

    return (
        <div className="min-h-dvh bg-gray-100 flex justify-center p-2">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

                <h2 className="text-2xl font-bold mb-6 text-center">Confirm Transaction</h2>

                <p className="text-sm text-gray-500">
                    Sending
                </p>

                <h3 className="text-lg font-semibold mb-4">
                    {amount}
                    {" "}
                    {NETWORKS[network].symbol} ({NETWORKS[network].name})
                </h3>

                <div className="border rounded-xl p-4 space-y-3">
                    <div>
                        <p className="text-sm text-gray-500">
                            From:
                        </p>
                        <p className="text-sm font-semibold text-gray-500 break-all">{activeWallet.address}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            To:
                        </p>
                        <p className="text-sm font-semibold text-gray-500 break-all">{to}</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-1 my-4 p-3 border rounded-xl">
                    <div>
                        <p>
                            <strong>Network:</strong>
                        </p>
                    </div>
                    <div>
                        <p>
                            {NETWORKS[network].name}
                        </p>
                    </div>
                </div>

                <div className="flex item-center justify-between gap-2">
                    <button
                        onClick={handleCancel}
                        disabled={loading || sent}
                        className="w-full bg-black text-white p-3 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleConfirm}
                        disabled={loading || sent}
                        className="w-full bg-black text-white p-3 rounded-lg"
                    >
                        {loading
                            ? "Sending..."
                            : sent
                            ? "Transaction Sent"
                            : "Confirm & Send"}
                    </button>
                </div>

                <p className="mt-4 text-center">{message}</p>
                {txHash && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                        <a
                            href={`${NETWORKS[network].explorer}/tx/${txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center text-blue-500 text-sm break-all"
                        >
                            {shortenAddress(txHash, 32, 8)}
                        </a>
                        <CopyButton text={txHash} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ConfirmTransaction;