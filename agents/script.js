const knownLang = ["ar-AE", "de-DE", "en-US", "es-ES", "es-MX", "fr-FR", "id-ID", "it-IT", "ja-JP", "ko-KR", "pl-PL", "pt-BR", "ru-RU", "th-TH", "tr-TR", "vi-VN", "zh-CN", "zh-TW"]
const userLang = window.navigator.userLanguage || window.navigator.language;
const validLang = knownLang.includes(userLang);
const vowels = ["a", "e", "i", "o", "u"];

var agentDict = {
    "Fade": 0,
    "Breach": 1,
    "Raze": 2,
    "Chamber": 3,
    "KAY/O": 4,
    "Skye": 5,
    "Cypher": 6,
    "Sova": 7,
    "Killjoy": 8,
    "Viper": 9,
    "Phoenix": 10,
    "Astra": 11,
    "Brimstone": 12,
    "Neon": 13,
    "Yoru": 14,
    "Sage": 15,
    "Reyna": 16,
    "Omen": 17,
    "Jett": 18
}

//for changing the agent

function changeAgent(el) {
    if (document.getElementById("p-ab-li") != null) {
        document.getElementById("p-ab-img-li").remove();
        document.getElementById("p-ab-li").remove();
        document.getElementById("p-ab-li2").remove();
    }
    document.getElementById("ab-icon").innerHTML = '<li id="p-ab-img-li"><img id="p-ab-img" src=""></li>' + document.getElementById("ab-icon").innerHTML;
    document.getElementById("ab-name").innerHTML = '<li id="p-ab-li"></li>' + document.getElementById("ab-name").innerHTML;
    document.getElementById("ab-name2").innerHTML = '<li id="p-ab-li2"></li>' + document.getElementById("ab-name2").innerHTML;
    localStorage.setItem('Agent', el.value);
    loadAgentData();
}

//loading page data

async function loadAgentData() {
    if (localStorage.getItem('Agent') == null) {
        localStorage.setItem('Agent', 'Sova');
    }
    console.log(localStorage.getItem('Agent'));
    let agentData = await getAgentData();
    let agent = agentDict[localStorage.getItem('Agent')];
    console.log(agent);
    document.getElementById("agent-select").value = localStorage.getItem('Agent');
    document.getElementById("pagetitle").innerText = agentData.data[agent].displayName + " info page";
    //background images
    document.body.style.backgroundImage = 'url(' + agentData.data[agent].fullPortraitV2 + ')';
    document.getElementById("portrait").src = agentData.data[agent].background;
    //agent header
    document.getElementById("agent-pfp").src = agentData.data[agent].displayIconSmall;
    document.getElementById("agent-name").innerText = agentData.data[agent].displayName;
    document.getElementById("agent-description").innerText = "\"" + agentData.data[agent].description + "\"";
    document.getElementById("role-img").src = agentData.data[agent].role.displayIcon;
    document.getElementById("agent-role").innerText = agentData.data[agent].role.displayName;
    //if passive ability
    if (agentData.data[agent].abilities.length === 5 && agentData.data[agent].abilities[4].displayIcon != null) {
        document.getElementById("p-ab-img").src = agentData.data[agent].abilities[4].displayIcon;
        document.getElementById("p-ab-li").innerText = agentData.data[agent].abilities[4].displayName;
        document.getElementById("p-ab-li2").innerText = "Passive - " + agentData.data[agent].abilities[4].displayName + ": " + agentData.data[agent].abilities[4].description;
    } else {
        document.getElementById("p-ab-img-li").remove();
        document.getElementById("p-ab-li").remove();
        document.getElementById("p-ab-li2").remove();
    }
    //abilities icons and text
    document.getElementById("c-ab-img").src = agentData.data[agent].abilities[2].displayIcon;
    document.getElementById("q-ab-img").src = agentData.data[agent].abilities[0].displayIcon;
    document.getElementById("e-ab-img").src = agentData.data[agent].abilities[1].displayIcon;
    document.getElementById("x-ab-img").src = agentData.data[agent].abilities[3].displayIcon;
    document.getElementById("c-ab-li").innerText = agentData.data[agent].abilities[2].displayName;
    document.getElementById("q-ab-li").innerText = agentData.data[agent].abilities[0].displayName;
    document.getElementById("e-ab-li").innerText = agentData.data[agent].abilities[1].displayName;
    document.getElementById("x-ab-li").innerText = agentData.data[agent].abilities[3].displayName;
    //about character
    if (vowels.includes(agentData.data[agent].role.displayName.charAt(0).toLowerCase())) {
        document.getElementById("chartype").innerText = agentData.data[agent].displayName + " is an " + agentData.data[agent].role.displayName + ":";
    } else {
        document.getElementById("chartype").innerText = agentData.data[agent].displayName + " is a " + agentData.data[agent].role.displayName + ":";
    }
    document.getElementById("roletype").innerText = "\"" + agentData.data[agent].role.description + " " + agentData.data[agent].description + "\"";
    document.getElementById("charrolefill").innerText = agentData.data[agent].displayName + " fulfills the " + agentData.data[agent].role.displayName + " role through these abilities:";
    //about character abilities
    document.getElementById("c-ab-li2").innerText = "Ability 1 - " + agentData.data[agent].abilities[2].displayName + ": " + agentData.data[agent].abilities[2].description;
    document.getElementById("q-ab-li2").innerText = "Ability 2 - " + agentData.data[agent].abilities[0].displayName + ": " + agentData.data[agent].abilities[0].description;
    document.getElementById("e-ab-li2").innerText = "Ability 3 - " + agentData.data[agent].abilities[1].displayName + ": " + agentData.data[agent].abilities[1].description;
    document.getElementById("x-ab-li2").innerText = "Ultimate - " + agentData.data[agent].abilities[3].displayName + ": " + agentData.data[agent].abilities[3].description;
}

async function playVoiceline() {
    let agentData = await getAgentData();
    let agent = agentDict[document.getElementById("agent-name").innerText];
    let aud = new Audio(agentData.data[agent].voiceLine.mediaList[0].wave);
    aud.play();
}

// api fetch

async function getAgentData() {
    let url = new URL("https://valorant-api.com/v1/agents");
    url.searchParams.append('isPlayableCharacter', true);
    if (validLang) {
        url.searchParams.append('language', userLang);
    }
    let response = await fetch(url);
    console.log(url);
    let agentData = await response.json();
    console.log(agentData);
    return agentData;
}