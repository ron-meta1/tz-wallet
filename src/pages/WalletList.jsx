import { useEffect, useState } from "react";
import { loadAllWallets } from "../wallet/loadAllWallets";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function WalletList() {

    const navigate = useNavigate();
    const [wallets, setWallets] = useState([]);

    useEffect(() => {

        async function fetchWallets() {

            try {

                const data = await loadAllWallets();
                setWallets(data);

            } catch (err) {

                console.error(err);
            }
        }

        fetchWallets();

    }, []);

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">

            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Accounts
                </h2>

                {wallets.length === 0 ? (

                    <p className="text-center text-gray-500">
                        No wallets found
                    </p>

                ) : (

                    <div className="space-y-4">

                        {wallets.map((wallet, index) => (

                            <div
                                key={wallet.address}
                                className="border rounded-xl p-4"
                            >

                                <h3 className="font-semibold text-lg">
                                    Account {index + 1}: {wallet.name}
                                </h3>

                                <p className="text-sm text-gray-600 break-all">
                                    {wallet.address}
                                </p>

                                <p className="text-xs text-gray-400 mt-2">
                                    Created:
                                    {" "}
                                    {new Date(
                                        wallet.createdAt
                                    ).toLocaleString()}
                                </p>

                                <button
                                    onClick={() =>
                                        navigate("/unlock", {
                                            state: {
                                                address: wallet.address
                                            }
                                        })
                                    }
                                    className="
                                        mt-3
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
                                    Unlock
                                </button>

                            </div>
                        ))}

                    </div>
                )}

                <div className="mt-4">
                    <Link to="/create">
                        <button className="w-full bg-black text-white p-3 rounded-lg">
                            Add Account
                        </button>
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default WalletList;