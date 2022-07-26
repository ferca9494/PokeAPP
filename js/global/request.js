export function request(url) {
    let promise = $.ajax({
        type: "get",
        url: url
    });
    return promise;
}