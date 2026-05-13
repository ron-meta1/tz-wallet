import { openDB, STORE_NAME } from "../db/walletDB";

export async function saveWallet(walletData) {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");

        const store = tx.objectStore(STORE_NAME);

        store.put(walletData);

        tx.oncomplete = () => {
            db.close();
            resolve(true);
        };

        tx.onerror = () => {
            db.close();
            reject(tx.error);
        };
    });
}