import { createContext, useContext, useState } from "react";

const WalletContext = createContext();

export function WalletProvider({ children }) {
    
    const [activeWallet, setActiveWallet] = useState(null);

    return (
        <WalletContext.Provider
            value={{
                activeWallet,
                setActiveWallet
            }}
        >
            {children}
        </WalletContext.Provider>
    );
}

export function useWallet() {
    return useContext(WalletContext);
}