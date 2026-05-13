const DB_NAME = 'walletDB';
const DB_VERSION = 1;

export const STORE_NAME = "wallets";

export function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {

                const store = db.createObjectStore(STORE_NAME, {
                    keyPath: "address"
                });

                store.createIndex(
                    "createdAt",
                    "createdAt",
                    { unique: false }
                );

                store.createIndex(
                    "name",
                    "name",
                    { unique: false }
                );
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error)
        };
    });
}