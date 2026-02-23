let score = 0;
let timeLeft = 30;
let gameActive = true;

const canvas = document.getElementById('game-canvas');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

// دالة لإنشاء دائرة عشوائية
function createTarget() {
    if (!gameActive) return;

    const target = document.createElement('div');
    target.className = 'target';
    
    // حجم الدائرة (بين 45 و 85 بكسل لسهولة اللمس)
    const size = Math.floor(Math.random() * 40) + 45;
    
    // ألوان عشوائية
    const colors = ['#ff4757', '#1e90ff', '#2ed573', '#eccc68', '#ffa502', '#ff6b81'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // الإحداثيات (تجنب الحواف)
    const x = Math.random() * (window.innerWidth - size);
    const y = Math.random() * (window.innerHeight - size - 80) + 80;

    target.style.width = size + 'px';
    target.style.height = size + 'px';
    target.style.backgroundColor = color;
    target.style.left = x + 'px';
    target.style.top = y + 'px';

    // حدث الضغط (للماوس واللمس معاً)
    target.addEventListener('mousedown', hitTarget);
    target.addEventListener('touchstart', hitTarget);

    canvas.appendChild(target);

    // تختفي الدائرة بعد 1.5 ثانية إذا لم تُلمس
    setTimeout(() => {
        if (target.parentElement) {
            target.remove();
            createTarget();
        }
    }, 1500);
}

function hitTarget(e) {
    e.preventDefault(); // لمنع السلوك الافتراضي للمتصفح في الموبايل
    if (gameActive) {
        score++;
        scoreDisplay.innerText = score;
        this.remove(); 
        createTarget();
    }
}

// عداد الوقت التنازلي
const timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft;
    
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endGame();
    }
}, 1000);

function endGame() {
    gameActive = false;
    canvas.innerHTML = ""; // مسح الدوائر المتبقية
    alert("اللعبة انتهت! \nنقاطك النهائية: " + score);
    location.reload(); 
}

// ابدأ بـ 3 دوائر فورياً
for(let i = 0; i < 3; i++) {
    createTarget();
}