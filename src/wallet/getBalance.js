import Web3 from "web3";
import { NETWORKS } from "../config/networks";

export async function getBalance(address, network) {

    const selectedNetwork = NETWORKS[network];

    if (!selectedNetwork) {
        throw new Error("Invalid network");
    }

    const web3 = new Web3(selectedNetwork.rpc);
    const wei = await web3.eth.getBalance(address);
    const eth = web3.utils.fromWei(wei, "ether");

    return eth;
}