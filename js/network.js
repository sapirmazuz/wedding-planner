// js/network.js
const Network = {
    delayMin: 500,
    delayMax: 2000,
    dropRate: 0.1,

    sendRequest: (request) => {
        return new Promise((resolve, reject) => {
            const delay = Math.random() * (Network.delayMax - Network.delayMin) + Network.delayMin;

            setTimeout(() => {
                if (Math.random() < Network.dropRate) {
                    reject("שגיאת רשת: הבקשה נכשלה");
                } else {
                    resolve(request());
                }
            }, delay);
        });
    }
};

export default Network;
