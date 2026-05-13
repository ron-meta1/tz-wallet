import Web3 from 'web3';
import { saveWallet } from "./saveWallet";

const web3 = new Web3();

export async function createWallet(name, password) {

    const account = web3.eth.accounts.create();

    const encrypted = await web3.eth.accounts.encrypt(
        account.privateKey,
        password
    );

    const walletData = {
        address: account.address,
        name,
        keystore: encrypted,
        createdAt: Date.now()
    };

    await saveWallet(walletData);

    return walletData;
}