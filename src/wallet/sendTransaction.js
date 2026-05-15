import Web3 from "web3";
import { NETWORKS } from "../config/networks";

export async function sendTransaction({
    activeWallet,
    network,
    to,
    amount
}) {
    try {
        const selectedNetwork = NETWORKS[network];
        const web3 = new Web3(selectedNetwork.rpc);

        const value = web3.utils.toWei(
            amount,
            "ether"
        );

        const nonce = await web3.eth.getTransactionCount(
            activeWallet.address,
            "latest"
        );

        const gasPrice = await web3.eth.getGasPrice();

        const tx = {
            from: activeWallet.address,
            to,
            value,
            gas: 21000,
            gasPrice,
            nonce,
            chainId: selectedNetwork.chainId
        };

        const signedTx = await activeWallet.signTransaction(tx);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        return receipt;

    } catch (err) {
        console.error("sendTransaction error:",err);
        throw new Error("Transaction failed")
    }
}