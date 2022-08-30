function urlencodeFormData(fd) {
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
}

export { urlencodeFormData };
