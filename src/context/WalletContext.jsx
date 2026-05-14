import { createContext, useContext, useState } from "react";

const WalletContext = createContext();

export function WalletProvider({ children }) {
    
    const [activeWallet, setActiveWallet] = useState(null);
    const [network, setNetwork] = useState("sepolia");

    return (
        <WalletContext.Provider
            value={{
                activeWallet,
                setActiveWallet,
                network,
                setNetwork
            }}
        >
            {children}
        </WalletContext.Provider>
    );
}

export function useWallet() {
    return useContext(WalletContext);
}