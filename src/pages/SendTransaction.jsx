import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendTransaction } from "../wallet/sendTransaction";
import { useWallet } from "../context/WalletContext";
import { NETWORKS } from "../config/networks";
import NavLinkButton from "../components/NavLinkButton";

function SendTransaction() {
    
    // const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const { activeWallet, network } = useWallet();
    const navigate = useNavigate();

    const handleSend = async () => {
        try {
            // setLoading(true);
            setMessage("");

            if (!to || !amount) {
                setMessage("Please fill all fields")
                return;
            }

            navigate("/confirm", {state: {to, amount}})

            // const receipt = await sendTransaction({
            //     activeWallet,
            //     network,
            //     to,
            //     amount
            // });

            // setMessage(`Transaction Sent: ${receipt.transactionHash}`);

        } catch(err) {

            console.error(err);
            setMessage("Something went wrong");

        // } finally {

        //     setLoading(false);
        }
    };

    return (
        <div className="min-h-dvh bg-gray-100 flex justify-center p-2">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Send</h2>

                    <div>
                        <p className="text-lg font-semibold mb-6 text-center">
                            {NETWORKS[network].symbol} ({NETWORKS[network].name})
                        </p>
                    </div>
                
                        <input
                            type="text"
                            placeholder="Recipient Address"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="w-full border p-3 rounded-lg mb-4"
                        />

                        <br />
                        <br />

                        <input
                            type="text"
                            placeholder={`Amount (${NETWORKS[network].symbol})`}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full border p-3 rounded-lg mb-4"
                        />

                        <br />
                        <br />

                        <button
                            onClick={handleSend}
                            // disabled={loading}
                            className="w-full bg-black text-white p-3 rounded-lg"
                        >
                            Send
                            {/* {loading ? "Sending..." : "Send"} */}
                        </button>

                        <p className="mt-4 text-center">{message}</p>

                <NavLinkButton to="/dashboard">
                    Dashboard
                </NavLinkButton>

            </div>
        </div>
    );
}

export default SendTransaction;