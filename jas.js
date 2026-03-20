/* ---------- PAGE FLOW ---------- */
let currentPage = 1;
const totalPages = 4;

function nextPage() {
  if (currentPage < totalPages) {
    document.getElementById(`page${currentPage}`).classList.remove("active");
    currentPage++;
    document.getElementById(`page${currentPage}`).classList.add("active");
    runTyping();
  }
}

/* ---------- TYPING EFFECT ---------- */
const texts = {
  type1: "Hi Alishba ❤️",
  type2: "I made this just for you 🎄",
  type3:
    "This Christmas feels warmer just because of you. Your presence is my favorite gift, and I hope this little surprise brings a smile to your face ✨"
};

function typeText(id, text, speed = 45) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

function runTyping() {
  if (currentPage === 1) {
    typeText("type1", texts.type1);
    setTimeout(() => typeText("type2", texts.type2), 800);
  }
  if (currentPage === 2) {
    typeText("type3", texts.type3, 25);
  }
}

runTyping();

/* ---------- SWIPE GESTURE ---------- */
let startX = 0;

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 60) nextPage();
});

/* ---------- SNOW ---------- */
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
let w, h, flakes = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

for (let i = 0; i < 120; i++) {
  flakes.push({ x: Math.random()*w, y: Math.random()*h, r: Math.random()*3+1, d: Math.random()+1 });
}

function drawSnow() {
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  flakes.forEach(f => {
    ctx.beginPath();
    ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
    ctx.fill();
    f.y += f.d;
    if (f.y > h) { f.y = -5; f.x = Math.random()*w; }
  });
  requestAnimationFrame(drawSnow);
}
drawSnow();

/* ---------- AUDIO ---------- */
const bgm = new Audio("audio/bgm.mp3");
bgm.loop = true;
bgm.volume = 0.3;

const songs = {
  high: new Audio("audio/high-on-you.mp3"),
  reason: new Audio("audio/for-a-reason.mp3"),
  adore: new Audio("audio/i-adore-you.mp3")
};

Object.values(songs).forEach(s => s.volume = 0.9);

function playSong(key) {
  bgm.pause();
  Object.values(songs).forEach(s => { s.pause(); s.currentTime = 0; });
  const song = songs[key];
  song.play();
  song.onended = () => bgm.play();
}

// enable bgm after first interaction
document.addEventListener("click", () => {
  bgm.play().catch(()=>{});
}, { once:true });