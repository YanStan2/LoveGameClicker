let loveCount = localStorage.getItem('loveCount') ? parseInt(localStorage.getItem('loveCount')) : 0;
let loveGuns = localStorage.getItem('loveGuns') ? parseInt(localStorage.getItem('loveGuns')) : 0;
let loveCannons = localStorage.getItem('loveCannons') ? parseInt(localStorage.getItem('loveCannons')) : 0;
let loveGunRate = 1; // генерация "любви" в секунду за каждый любвемет
let loveCannonRate = 2; // генерация "любви" в секунду за каждый няшкомет
let loveGenerationRate = loveGuns * loveGunRate + loveCannons * loveCannonRate;
let loveGunCost = localStorage.getItem('loveGunCost') ? parseInt(localStorage.getItem('loveGunCost')) : 200;
let loveCannonCost = localStorage.getItem('loveCannonCost') ? parseInt(localStorage.getItem('loveCannonCost')) : 1000;
let clickValue = localStorage.getItem('clickValue') ? parseInt(localStorage.getItem('clickValue')) : 1;

document.getElementById('loveCount').innerText = loveCount;
document.getElementById('loveGuns').innerText = loveGuns;
document.getElementById('loveCannons').innerText = loveCannons;
document.getElementById('clickValueDisplay').innerText = clickValue;
document.getElementById('loveGunRate').innerText = loveGunRate;
document.getElementById('loveCannonRate').innerText = loveCannonRate;
document.getElementById('totalLoveGeneration').innerText = loveGenerationRate;

function loveNastya() {
    loveCount += clickValue;
    document.getElementById('loveCount').innerText = loveCount;
    localStorage.setItem('loveCount', loveCount);
    darkenButton();
}

function buyLoveGun() {
    if (loveCount >= loveGunCost) {
        loveCount -= loveGunCost;
        loveGuns++;
        loveGenerationRate += loveGunRate;
        document.getElementById('loveCount').innerText = loveCount;
        document.getElementById('loveGuns').innerText = loveGuns;
        document.getElementById('totalLoveGeneration').innerText = loveGenerationRate;
        localStorage.setItem('loveCount', loveCount);
        localStorage.setItem('loveGuns', loveGuns);

        // Увеличение стоимости следующего любвемета на 20%
        loveGunCost = Math.ceil(loveGunCost * 1.2);
        localStorage.setItem('loveGunCost', loveGunCost);
        document.querySelector('.buy-button').innerText = `Купити Маленький Любвемет (${loveGunCost} любові)`;

        // Каждые 5 любвеметов увеличивать стоимость клика на 1
        if (loveGuns % 5 === 0) {
            clickValue++;
            localStorage.setItem('clickValue', clickValue);
            document.getElementById('clickValueDisplay').innerText = clickValue;
        }

        updateLoveGeneration();
    }
}

function buyLoveCannon() {
    if (loveCount >= loveCannonCost) {
        loveCount -= loveCannonCost;
        loveCannons++;
        loveGenerationRate += loveCannonRate;
        document.getElementById('loveCount').innerText = loveCount;
        document.getElementById('loveCannons').innerText = loveCannons;
        document.getElementById('totalLoveGeneration').innerText = loveGenerationRate;
        localStorage.setItem('loveCount', loveCount);
        localStorage.setItem('loveCannons', loveCannons);

        // Увеличение стоимости следующего няшкомета на 25%
        loveCannonCost = Math.ceil(loveCannonCost * 1.25);
        localStorage.setItem('loveCannonCost', loveCannonCost);
        document.querySelectorAll('.buy-button')[1].innerText = `Купити Сердечно-любящий Няшкомет (${loveCannonCost} любові)`;

        updateLoveGeneration();
    }
}

function updateLoveGeneration() {
    clearInterval(window.loveGenerationInterval);
    if (loveGenerationRate > 0) {
        window.loveGenerationInterval = setInterval(() => {
            loveNastya();
        }, 1000 / loveGenerationRate);
    }
}

function darkenButton() {
    let button = document.querySelector('.love-button');
    button.classList.add('active');

    // Возвращаем цвет кнопки к исходному после завершения клика
    setTimeout(() => {
        button.classList.remove('active');
    }, 100); // 100 миллисекунд задержки, чтобы эффект был заметен
}

window.onload = function() {
    document.querySelector('.buy-button').innerText = `Купити Маленький Любвемет (${loveGunCost} любові)`;
    document.querySelectorAll('.buy-button')[1].innerText = `Купити Сердечно-любящий Няшкомет (${loveCannonCost} любові)`;
    updateLoveGeneration();
};
