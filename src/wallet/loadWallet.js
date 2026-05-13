import { openDB, STORE_NAME } from "../db/walletDB";

export async function loadWallet(address) {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");

        const store = tx.objectStore(STORE_NAME);

        const request = store.get(address);

        request.onsuccess = () => {
            db.close();
            resolve(request.result);
        };

        request.onerror = () => {
            db.close();
            reject(request.error);
        };
    });
}