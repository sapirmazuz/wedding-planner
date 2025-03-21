// js/fajax.js
import Network from "./network.js";

const FAJAX = {
    request: async (url, method = "GET", data = null) => {
        return Network.sendRequest(async () => {
            const options = {
                method,
                headers: { "Content-Type": "application/json" }
            };
            if (data) {
                options.body = JSON.stringify(data);
            }

            const response = await fetch(url, options);
            return response.json();
        });
    }
};

export default FAJAX;
