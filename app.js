// <----- Sorular -----> //
const sorular = [
    {
    kategori: "Coğrafya",
    tip: "Klasik",
    soru: "Türkiye'nin başkenti neresidir?",
    dogruCevap: "Ankara"
    },
    {
    kategori: "Tarih",
    tip: "Şıklı",
    soru: "İstanbul kaç yılında fethedilmiştir?",
    secenekler: ["A) 1299", "B) 1453", "C) 1923", "D) 2025"],
    dogruCevap: "B) 1453"
    },
];

// <----- Değişkenler -----> //
let currentQuestionIndex = 0;
let groups = [];
let timer;
let timeLeft = 60; 
let isPaused = false; 

// <----- Arkaplan Sesi -----> //
const backgroundMusic = document.getElementById('background-music');

// <----- Ekranlar -----> //
const homeScreen = document.getElementById('home-screen');
const groupsScreen = document.getElementById('groups-screen');
const questionScreen = document.getElementById('question-screen');
const resultsScreen = document.getElementById('results-screen');
const scoreboardScreen = document.getElementById('scoreboard-screen');
const trophyScreen = document.getElementById('trophy-screen');

// <----- Butonlar -----> //
const startBtn = document.getElementById('start-btn');
const groupsBtn = document.getElementById('groups-btn');
const addGroupBtn = document.getElementById('add-group-btn');
const saveGroupsBtn = document.getElementById('save-groups-btn');
const showResultsBtn = document.getElementById('show-results-btn');
const submitScoresBtn = document.getElementById('submit-scores-btn');
const continueGameBtn = document.getElementById('continue-game-btn');
const restartBtn = document.getElementById('restart-btn');
const pauseBtn = document.getElementById('pause-btn');
const resumeBtn = document.getElementById('resume-btn');
const finishBtn = document.getElementById('finish-btn');

// <----- Grup Yönetimi -----> //
const groupNameInput = document.getElementById('group-name-input');
const groupList = document.getElementById('group-list');
const groupValidationMsg = document.getElementById('group-validation-msg');
const startValidationMsg = document.getElementById('start-validation-msg');

// <----- Soru Ekranı -----> //
const timerDisplay = document.getElementById('timer');
const questionCategory = document.getElementById('question-category');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');

// <----- Sonuç Ekranı -----> //
const correctAnswerText = document.getElementById('correct-answer-text');
const resultOptionsContainer = document.getElementById('result-options-container');
const dynamicScoreInputs = document.getElementById('dynamic-score-inputs');
const questionCounter = document.getElementById('question-counter');

// <----- Kupa Ekranı -----> //
const dynamicLeaderboard = document.getElementById('dynamic-leaderboard');
const winner1Name = document.getElementById('winner-1-name');
const winner1Score = document.getElementById('winner-1-score');
const winner2Name = document.getElementById('winner-2-name');
const winner2Score = document.getElementById('winner-2-score');
const winner3Name = document.getElementById('winner-3-name');
const winner3Score = document.getElementById('winner-3-score');


// <----- Ekran Yönetim Fonksiyonları -----> //
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// <----- Grup Yönetim Fonksiyonları -----> //
function renderGroupList() {
    groupList.innerHTML = '';
    groups.forEach((group, index) => {
        const li = document.createElement('li');
        li.className = 'group-list-item';
        li.innerHTML = `
            <span>${group.name}</span>
            <button class="delete-group-btn" data-index="${index}">Sil</button>
        `;
        groupList.appendChild(li);
    });
    validateGroupCount();
}

function addGroup() {
    const name = groupNameInput.value.trim();
    if (!name) {
        groupValidationMsg.textContent = 'Grup adı boş olamaz.';
        return;
    }
    if (groups.length >= 10) {
        groupValidationMsg.textContent = 'En fazla 10 grup ekleyebilirsiniz.';
        return;
    }
    if (groups.find(g => g.name === name)) {
        groupValidationMsg.textContent = 'Bu grup adı zaten var.';
        return;
    }

    groups.push({ name: name, score: 0 });
    renderGroupList();
    groupNameInput.value = '';
    groupValidationMsg.textContent = '';
}

function deleteGroup(index) {
    groups.splice(index, 1);
    renderGroupList();
}

function validateGroupCount() {
    if (groups.length < 2) {
        saveGroupsBtn.disabled = true;
        groupValidationMsg.textContent = 'Devam etmek için en az 2 grup olmalı.';
    } else {
        saveGroupsBtn.disabled = false;
        groupValidationMsg.textContent = '';
    }
}

function saveGroups() {
    if (groups.length >= 2) {
        startBtn.disabled = false;
        startValidationMsg.textContent = `${groups.length} grup ile yarışmaya hazırsınız.`;
        showScreen('home-screen');
    }
}


// <----- Yarışma Kontrolleri -----> //

function startGame() {
    currentQuestionIndex = 0;
    groups.forEach(g => g.score = 0); 
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= sorular.length) {
        showTrophyScreen();
        return;
    }

    showScreen('question-screen');
    isPaused = false;
    showResultsBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    resumeBtn.classList.add('hidden');
    finishBtn.classList.remove('hidden');

    const currentQuestion = sorular[currentQuestionIndex];
    questionCategory.textContent = `Kategori: ${currentQuestion.kategori}`;
    questionText.textContent = currentQuestion.soru;
    questionCounter.textContent = `Soru: ${currentQuestionIndex + 1} / ${sorular.length}`;


    optionsContainer.innerHTML = '';
    if (currentQuestion.tip === 'Şıklı') {
        currentQuestion.secenekler.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            optionsContainer.appendChild(btn);
        });
        optionsContainer.classList.remove('hidden');
    } else {
        optionsContainer.classList.add('hidden');
    }

    timeLeft = 60; 
    timerDisplay.textContent = timeLeft;
    if(timer) clearInterval(timer);
    timer = setInterval(updateTimer, 1000);

    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
}

function updateTimer() {
    if (isPaused) return; 
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) timeUp();
}

function timeUp() {
    clearInterval(timer); 
    backgroundMusic.pause(); 
    showResultsBtn.classList.remove('hidden'); 
    pauseBtn.classList.add('hidden');
    resumeBtn.classList.add('hidden');
    finishBtn.classList.add('hidden');
}

function showResults() {
    showScreen('results-screen');
    const currentQuestion = sorular[currentQuestionIndex];
    
    correctAnswerText.textContent = currentQuestion.dogruCevap;

    resultOptionsContainer.innerHTML = '';
    if (currentQuestion.tip === 'Şıklı') {
        currentQuestion.secenekler.forEach(option => {
            const p = document.createElement('p');
            p.className = 'result-option';
            if (option === currentQuestion.dogruCevap) {
                p.classList.add('correct');
            } else {
                p.classList.add('incorrect');
            }
            p.textContent = option;
            resultOptionsContainer.appendChild(p);
        });
        resultOptionsContainer.classList.remove('hidden');
    } else {
        resultOptionsContainer.classList.add('hidden');
    }

    dynamicScoreInputs.innerHTML = '';
    groups.forEach((group, index) => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'score-group';
        groupDiv.innerHTML = `
            <label for="score-g${index}">${group.name}</label>
            <input type="number" id="score-g${index}" data-group-index="${index}" value="0">
        `;
        dynamicScoreInputs.appendChild(groupDiv);
    });
}

function submitScores() {
    const inputs = document.querySelectorAll('#dynamic-score-inputs input[type="number"]');
    inputs.forEach(input => {
        const index = parseInt(input.dataset.groupIndex);
        const score = parseInt(input.value) || 0;
        groups[index].score += score;
    });

    currentQuestionIndex++; 

    if (currentQuestionIndex % 5 === 0 && currentQuestionIndex > 0) {
        updateLeaderboard();
        showScreen('scoreboard-screen');
    } else {
        showQuestion();
    }
}

function updateLeaderboard() {
    dynamicLeaderboard.innerHTML = '';
    const sortedGroups = [...groups].sort((a, b) => b.score - a.score);
    
    sortedGroups.forEach(group => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'leaderboard-item';
        itemDiv.innerHTML = `
            <span>${group.name}:</span>
            <span>${group.score}</span>
        `;
        dynamicLeaderboard.appendChild(itemDiv);
    });
}

function showTrophyScreen() {
    const scoreArray = [...groups].sort((a, b) => b.score - a.score);

    const winner1 = scoreArray[0];
    const winner2 = scoreArray[1];
    const winner3 = scoreArray[2];

    if (winner1) {
        winner1Name.textContent = winner1.name;
        winner1Score.textContent = `Puan: ${winner1.score}`;
    }
    if (winner2) {
        winner2Name.textContent = winner2.name;
        winner2Score.textContent = `Puan: ${winner2.score}`;
    }
    if (winner3) {
        winner3Name.textContent = winner3.name;
        winner3Score.textContent = `Puan: ${winner3.score}`;
    } else {
        winner3Name.textContent = '...';
        winner3Score.textContent = 'Puan: 0';
    }

    showScreen('trophy-screen');
}


function pauseTimer() {
    isPaused = true;
    backgroundMusic.pause();
    pauseBtn.classList.add('hidden');
    resumeBtn.classList.remove('hidden');
}

function resumeTimer() {
    isPaused = false;
    backgroundMusic.play();
    pauseBtn.classList.remove('hidden');
    resumeBtn.classList.add('hidden');
}

startBtn.addEventListener('click', startGame);
showResultsBtn.addEventListener('click', showResults);
submitScoresBtn.addEventListener('click', submitScores);
continueGameBtn.addEventListener('click', showQuestion); 
restartBtn.addEventListener('click', () => {
    showScreen('home-screen');
}); 

pauseBtn.addEventListener('click', pauseTimer);
resumeBtn.addEventListener('click', resumeTimer);
finishBtn.addEventListener('click', timeUp); 

groupsBtn.addEventListener('click', () => showScreen('groups-screen'));
addGroupBtn.addEventListener('click', addGroup);
saveGroupsBtn.addEventListener('click', saveGroups);
groupList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-group-btn')) {
        const index = parseInt(e.target.dataset.index);
        deleteGroup(index);
    }
});

groupNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addGroup();
    }
});