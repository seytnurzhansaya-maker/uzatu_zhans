/* =====================================
   ELEMENTS
===================================== */

const intro = document.getElementById("intro");
const website = document.getElementById("website");

const openInvitation =
document.getElementById("openInvitation");

const music =
document.getElementById("music");

const musicBtn =
document.getElementById("musicBtn");

const langButtons =
document.querySelectorAll(".lang-btn");

/* =====================================
   START
===================================== */

website.style.display = "none";

musicBtn.style.display = "none";

/* =====================================
   OPEN INVITATION
===================================== */

openInvitation.addEventListener("click", () => {

intro.style.opacity = "0";

setTimeout(() => {

intro.style.display = "none";

website.style.display = "block";

document.body.style.overflow = "auto";

/* плавное появление */

website.animate(

[
{
opacity:0,
transform:"translateY(30px)"
},

{
opacity:1,
transform:"translateY(0)"
}

],

{
duration:900,
fill:"forwards"
}

);

/* музыка */

music.volume = 0.35;

music.play().catch(() => {});

musicBtn.style.display = "flex";

},600);

});

/* =====================================
   MUSIC
===================================== */

let musicPlaying = true;

musicBtn.addEventListener("click",()=>{

if(music.paused){

music.play();

musicPlaying = true;

musicBtn.innerHTML = "🔊";

}else{

music.pause();

musicPlaying = false;

musicBtn.innerHTML = "🔇";

}

});

/* =====================================
   LANGUAGE
===================================== */

langButtons.forEach(button=>{

button.addEventListener("click",()=>{

langButtons.forEach(btn=>
btn.classList.remove("active")
);

button.classList.add("active");

const lang =
button.dataset.lang;

document.body.classList.remove(
"lang-kz",
"lang-ru"
);

document.body.classList.add(
`lang-${lang}`
);

localStorage.setItem(
"language",
lang
);

});

});

/* =====================================
   LOAD LANGUAGE
===================================== */

const savedLanguage =
localStorage.getItem("language");

if(savedLanguage){

document.body.classList.remove(
"lang-kz",
"lang-ru"
);

document.body.classList.add(
`lang-${savedLanguage}`
);

langButtons.forEach(btn=>{

btn.classList.remove("active");

if(btn.dataset.lang===savedLanguage){

btn.classList.add("active");

}

});

}

/* =====================================
   SMOOTH LINKS
===================================== */

document.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const section =
document.querySelector(
this.getAttribute("href")
);

if(section){

section.scrollIntoView({

behavior:"smooth"

});

}

});

});/* =====================================
   COUNTDOWN TIMER
===================================== */

const weddingDate = new Date(
"2026-09-19T18:00:00"
).getTime();

const daysEl =
document.getElementById("days");

const hoursEl =
document.getElementById("hours");

const minutesEl =
document.getElementById("minutes");

const secondsEl =
document.getElementById("seconds");

/* Добавление ведущего нуля */

function formatTime(number){

return number < 10
? "0" + number
: number;

}

/* Обновление таймера */

function updateCountdown(){

const now = new Date().getTime();

const difference =
weddingDate - now;

/* Если праздник уже наступил */

if(difference <= 0){

daysEl.textContent = "00";
hoursEl.textContent = "00";
minutesEl.textContent = "00";
secondsEl.textContent = "00";

clearInterval(countdownInterval);

return;

}

/* Расчеты */

const days =
Math.floor(
difference /
(1000*60*60*24)
);

const hours =
Math.floor(
(difference %
(1000*60*60*24))
/
(1000*60*60)
);

const minutes =
Math.floor(
(difference %
(1000*60*60))
/
(1000*60)
);

const seconds =
Math.floor(
(difference %
(1000*60))
/
1000
);

/* Вывод */

daysEl.textContent =
formatTime(days);

hoursEl.textContent =
formatTime(hours);

minutesEl.textContent =
formatTime(minutes);

secondsEl.textContent =
formatTime(seconds);

}

/* Первый запуск */

updateCountdown();

/* Обновление каждую секунду */

const countdownInterval =
setInterval(
updateCountdown,
1000
);

/* =====================================
   АНИМАЦИЯ ЦИФР
===================================== */

const timerBoxes =
document.querySelectorAll(".time-box");

timerBoxes.forEach(box=>{

box.addEventListener("mouseenter",()=>{

box.animate(

[
{
transform:"translateY(0)"
},

{
transform:"translateY(-8px)"
},

{
transform:"translateY(0)"
}

],

{
duration:350
}

);

});

});/* =====================================
   SCROLL ANIMATIONS
===================================== */

/* Все секции, которые будут появляться */

const animatedSections = document.querySelectorAll(

"section, .card, .invite-card, .quote-card, .rsvp-card, footer"

);

/* Скрываем элементы */

animatedSections.forEach(element => {

element.style.opacity = "0";

element.style.transform = "translateY(60px)";

element.style.transition =
"opacity .8s ease, transform .8s ease";

});

/* Observer */

const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

observer.unobserve(entry.target);

}

});

},

{

threshold:0.15

}

);

animatedSections.forEach(section=>{

observer.observe(section);

});

/* =====================================
   HERO PARALLAX
===================================== */

const hero = document.querySelector(".hero");

window.addEventListener("scroll",()=>{

const offset = window.pageYOffset;

if(hero){

hero.style.backgroundPositionY =
offset * 0.45 + "px";

}

});

/* =====================================
   CARD HOVER EFFECT
===================================== */

const cards =
document.querySelectorAll(".card");

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect =
card.getBoundingClientRect();

const x =
e.clientX - rect.left;

const y =
e.clientY - rect.top;

card.style.background =

`radial-gradient(circle at ${x}px ${y}px,
rgba(202,164,93,.18),
white 65%)`;

});

card.addEventListener("mouseleave",()=>{

card.style.background="white";

});

});

/* =====================================
   BUTTON RIPPLE
===================================== */

const buttons =
document.querySelectorAll("button");

buttons.forEach(button=>{

button.addEventListener("click",(e)=>{

const circle =
document.createElement("span");

const size =
Math.max(

button.clientWidth,

button.clientHeight

);

circle.style.width=size+"px";

circle.style.height=size+"px";

circle.style.position="absolute";

circle.style.borderRadius="50%";

circle.style.background="rgba(255,255,255,.35)";

circle.style.left=

e.offsetX-size/2+"px";

circle.style.top=

e.offsetY-size/2+"px";

circle.style.pointerEvents="none";

circle.style.transform="scale(0)";

circle.style.transition=".6s";

button.style.position="relative";

button.style.overflow="hidden";

button.appendChild(circle);

requestAnimationFrame(()=>{

circle.style.transform="scale(3)";

circle.style.opacity="0";

});

setTimeout(()=>{

circle.remove();

},600);

});

});

/* =====================================
   HEADER SHADOW
===================================== */

const header =
document.querySelector("header");

window.addEventListener("scroll",()=>{

if(window.scrollY>40){

header.style.background=
"rgba(255,255,255,.96)";

header.style.backdropFilter=
"blur(12px)";

header.style.boxShadow=
"0 10px 30px rgba(0,0,0,.08)";

}else{

header.style.background="transparent";

header.style.boxShadow="none";

}

});/* =====================================
   RSVP FORM
===================================== */

const guestForm =
document.getElementById("guestForm");

const successModal =
document.getElementById("successModal");

const closeModal =
document.getElementById("closeModal");

guestForm.addEventListener("submit", async (e)=>{

e.preventDefault();

/* Получаем данные */

const formData = {

name:
guestForm.name.value.trim(),

guests:
guestForm.guests.value,

status:
guestForm.status.value,

wish:
guestForm.wish.value.trim()

};

/* Простая проверка */

if(formData.name===""){

alert("Аты-жөніңізді енгізіңіз / Введите имя");

return;

}
/* =====================================
   ДАЛЬШЕ ЗДЕСЬ БУДЕТ
   GOOGLE SHEETS
===================================== */

/* очищаем форму */

guestForm.reset();

guestForm.guests.value = 1;

/* показываем окно */

successModal.style.display = "flex";

document.body.style.overflow = "hidden";

});

/* =====================================
   CLOSE MODAL
===================================== */

closeModal.addEventListener("click",()=>{

successModal.style.display="none";

document.body.style.overflow="auto";

});

/* Закрытие по фону */

successModal.addEventListener("click",(e)=>{

if(e.target===successModal){

successModal.style.display="none";

document.body.style.overflow="auto";

}

});

/* =====================================
   ESC
===================================== */

document.addEventListener("keydown",(e)=>{

if(

e.key==="Escape"

&&

successModal.style.display==="flex"

){

successModal.style.display="none";

document.body.style.overflow="auto";

}

});

/* =====================================
   PRELOAD HERO IMAGE
===================================== */

const heroImage = new Image();

heroImage.src = "assets/images/hero-bg.jpg";

/* =====================================
   CONSOLE
===================================== */

console.log(

"%cUzatu Website Ready",

"color:#caa45d;font-size:18px;font-weight:bold;"

);

console.log(

"Created with ❤️"

);
