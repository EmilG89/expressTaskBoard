export default function getCookie(headers, key) {
    let cookie = null;
    headers.find((header) => {
        if (header.includes(key)) {
            cookie = header.slice(key.length+1);
        }
    });

    return cookie;
}