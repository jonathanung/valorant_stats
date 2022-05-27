const knownLang = ["ar-AE", "de-DE", "en-US", "es-ES", "es-MX", "fr-FR", "id-ID", "it-IT", "ja-JP", "ko-KR", "pl-PL", "pt-BR", "ru-RU", "th-TH", "tr-TR", "vi-VN", "zh-CN", "zh-TW"]
const userLang = window.navigator.userLanguage || window.navigator.language;
const validLang = knownLang.includes(userLang);
const vowels = ["a", "e", "i", "o", "u"];

//api fetch

async function loadMapData() {
    if (localStorage.getItem('Map') == null) {
        localStorage.setItem('Map', 'Ascent');
    }
    console.log(localStorage.getItem('Map'));
    let mapData = await getMapData();
    let map = mapDict[localStorage.getItem('Map')];
    console.log(map);
}

async function getMapData() {
    let url = new URL("https://valorant-api.com/v1/maps");
    if (validLang) {
        url.searchParams.append('language', userLang);
    }
    let response = await fetch(url);
    console.log(url);
    let mapData = await response.json();
    console.log(mapData);
}