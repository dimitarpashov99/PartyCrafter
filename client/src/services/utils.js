import axios from "axios";

const apiCall = (controller) => {
    return axios.create({
        baseURL: process.env.SERVER_API_DEVELOPMENT,
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const urlencodeFormData = (fd) => {
    var data = "";
    function encode(data) {
        return encodeURIComponent(data).replace(/%20/g, "+");
    }
    for (var pair of fd.entries()) {
        if (typeof pair[1] == "string") {
            data += (data ? "&" : "") + encode(pair[0]) + "=" + encode(pair[1]);
        }
    }
    return data;
};

export { apiCall, urlencodeFormData };
