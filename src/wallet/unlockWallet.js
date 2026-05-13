import Web3 from "web3";
import { loadWallet } from "./loadWallet";

const web3 = new Web3();

export async function unlockWallet(address, password) {

    try {
        const walletData = await loadWallet(address);

        if (!walletData) {
            throw new Error("Wallet not found");
        }

        const decrypted = await web3.eth.accounts.decrypt(
            walletData.keystore,
            password
        );

        return {
            ...walletData,
            ...decrypted
        };
        
    } catch (err) {
        console.error(err)
        throw new Error("Invalid password");
    }
}