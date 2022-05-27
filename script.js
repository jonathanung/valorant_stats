const knownLang = ["ar-AE", "de-DE", "en-US", "es-ES", "es-MX", "fr-FR", "id-ID", "it-IT", "ja-JP", "ko-KR", "pl-PL", "pt-BR", "ru-RU", "th-TH", "tr-TR", "vi-VN", "zh-CN", "zh-TW"]
const userLang = window.navigator.userLanguage || window.navigator.language;
const validLang = knownLang.includes(userLang);
const vowels = ["a", "e", "i", "o", "u"];

//api fetch

async function getRankData() {
    let url = new URL("https://valorant-api.com/v1/competitivetiers");
    if (validLang) {
        url.searchParams.append('language', userLang);
    }
    let response = await fetch(url);
    console.log(url);
    let rankData = await response.json();
    console.log(rankData);
}