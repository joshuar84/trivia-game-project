export function getClue(callBack) {
    const xmlRequest = new XMLHttpRequest();
    xmlRequest.addEventListener('readystatechange', e => {
        if (xmlRequest.readyState !== XMLHttpRequest.DONE) return;
        if (xmlRequest.status !== 200) return;
        const data = JSON.parse(xmlRequest.responseText);
        callBack(null, data)
    })

    xmlRequest.open('GET', 'https://jservice.xyz/api/random-clue');
    xmlRequest.send();
}
