const steps=[
{key:'answer',q:'دوست داری بریم بیرون خوشگلم؟ ❤️',type:'single',o:['😍 آره، با کمال میل','😊 یک وقت دیگه']},

{key:'company',q:'این دفعه چطوری بریم؟ ❤️',type:'single',o:['👨‍👩‍👧 با دختر کوچولو و بامزمون هایلین بریم','❤️ فقط من و تو']},

{key:'date',q:'چه تاریخی برات مناسبه؟',type:'date'},

{key:'time',q:'چه ساعتی راحت‌تری؟',type:'time'},

{key:'city',q:'کدوم شهر بریم؟',type:'text',ph:'مثلاً برلین'},

{key:'activities',q:'دوست داری چه کارهایی انجام بدیم؟',type:'multi',o:[
'🍽️ رستوران',
'🍦 بستنی',
'🚶 پیاده‌روی',
'☕ کافه',
'🎬 سینما',
'🌳 پارک',
'🌅 دیدن غروب',
'🚗 دور زدن با ماشین',
'🛍️ خرید',
'🎳 بولینگ'
]},

{key:'cuisine',q:'اگر رستوران رفتیم، چه نوع غذایی دوست داری؟',type:'single',o:[
'🇮🇷 ایرانی',
'🇨🇳 چینی',
'🇹🇷 ترکی',
'🇦🇫 افغانی',
'🍕 فرقی نداره'
]},

{key:'food',q:'حالا کدوم غذا رو انتخاب می‌کنی؟ 😋',type:'food'},

{key:'dessert',q:'بعدش چه دسری بخوریم؟',type:'multi',o:[
'🍦 بستنی وانیلی',
'🍫 بستنی شکلاتی',
'🍓 بستنی توت‌فرنگی',
'🍰 کیک',
'🧇 وافل',
'☕ قهوه',
'❌ فعلاً هیچ‌کدوم'
]}
];

const foodMap={
'🇮🇷 ایرانی':[
'🍢 چلوکباب',
'🍗 جوجه‌کباب',
'🍚 زرشک‌پلو با مرغ',
'🥘 قورمه‌سبزی',
'🍛 فسنجان',
'🍲 دیزی'
],

'🇨🇳 چینی':[
'🍜 نودل',
'🥟 دامپلینگ',
'🍚 برنج سرخ‌شده',
'🍗 مرغ کونگ‌پائو',
'🥣 سوپ ونتون',
'🍤 میگو'
],

'🇹🇷 ترکی':[
'🥙 اسکندر کباب',
'🍢 آدانا کباب',
'🥧 پیده',
'🌮 لاهماجون',
'🥟 مانتی',
'🍖 دونر'
],

'🇦🇫 افغانی':[
'🍚 قابلی پلو',
'🥟 منتو',
'🫓 بولانی',
'🍢 کباب افغانی',
'🥣 آشک',
'🍲 شوروا'
],

'🍕 فرقی نداره':[
'❤️ هرچی سارا دوست داشته باشه'
]
};

let i=0,a={};

const q=document.getElementById('q');
const ans=document.getElementById('answers');
const next=document.getElementById('next');

function start(){
welcome.classList.add('hidden');
app.classList.remove('hidden');
render();
}

function render(){
const s=steps[i];

q.textContent=s.q;
ans.innerHTML='';
next.classList.add('hidden');

bar.style.width=((i+1)/steps.length*100)+'%';

if(s.type==='single') single(s);
if(s.type==='multi') multi(s);
if(['date','time','text'].includes(s.type)) input(s);
if(s.type==='food') food(s);
}

function btn(t){
const b=document.createElement('button');
b.className='option';
b.textContent=t;
return b;
}

function single(s){
s.o.forEach(x=>{

const b=btn(x);

b.onclick=()=>{

if(s.key==='answer'&&x.includes('یک وقت')){
app.classList.add('hidden');
done.classList.remove('hidden');

done.innerHTML=`
<div class="heart">🌹</div>
<h2>اشکالی نداره خوشگلم ❤️</h2>
<p>هر وقت دوست داشتی، با هم یک روز قشنگ می‌سازیم.</p>
<h3>با عشق، سینا ❤️</h3>
`;

return;
}

a[s.key]=x;
nextStep();
};

ans.appendChild(b);
});
}

function multi(s){

let list=a[s.key]||[];

s.o.forEach(x=>{

const b=btn(x);

if(list.includes(x)){
b.classList.add('selected');
}

b.onclick=()=>{

const k=list.indexOf(x);

if(k>=0){
list.splice(k,1);
}else{
list.push(x);
}

a[s.key]=list;

b.classList.toggle('selected');

next.classList.toggle('hidden',!list.length);
};

ans.appendChild(b);
});

next.classList.toggle('hidden',!list.length);
}

function input(s){

const el=document.createElement('input');

el.className='field';

el.type=s.type==='text'?'text':s.type;

el.placeholder=s.ph||'';

el.value=a[s.key]||'';

el.oninput=()=>{

a[s.key]=el.value;

next.classList.toggle('hidden',!el.value);
};

ans.appendChild(el);

next.classList.toggle('hidden',!el.value);
}

function food(){

const list=foodMap[a.cuisine]||foodMap['🍕 فرقی نداره'];

list.forEach(x=>{

const b=btn(x);

b.onclick=()=>{

a.food=x;

nextStep();
};

ans.appendChild(b);
});
}

function nextStep(){

if(i<steps.length-1){

i++;

render();

}else{

finish();
}
}

function finish(){

app.classList.add('hidden');

done.classList.remove('hidden');

summary.innerHTML=`

👨‍👩‍👧 <b>همراه:</b> ${a.company||'—'}

<br>

📅 <b>تاریخ:</b> ${a.date||'—'}

<br>

⏰ <b>ساعت:</b> ${a.time||'—'}

<br>

📍 <b>شهر:</b> ${a.city||'—'}

<br>

✨ <b>برنامه:</b> ${(a.activities||[]).join('، ')}

<br>

🍽️ <b>نوع غذا:</b> ${a.cuisine||'—'}

<br>

🥘 <b>غذا:</b> ${a.food||'—'}

<br>

🍨 <b>دسر:</b> ${(a.dessert||[]).join('، ')}

`;

localStorage.setItem(
'saraDate',
JSON.stringify(a)
);

burst(40);
}

async function sharePlan(){

const t=`

جواب‌های سارا ❤️

همراه: ${a.company||'—'}

تاریخ: ${a.date||'—'}

ساعت: ${a.time||'—'}

شهر: ${a.city||'—'}

برنامه: ${(a.activities||[]).join('، ')}

نوع غذا: ${a.cuisine||'—'}

غذا: ${a.food||'—'}

دسر: ${(a.dessert||[]).join('، ')}

با عشق، سینا ❤️
`;

if(navigator.share){

await navigator.share({text:t});

}else{

await navigator.clipboard.writeText(t);

alert('کپی شد ❤️');
}
}

function heart(){

const h=document.createElement('div');

h.className='floating';

h.textContent=[
'❤️',
'💗',
'💕'
][Math.floor(Math.random()*3)];

h.style.left=Math.random()*100+'vw';

h.style.fontSize=
(18+Math.random()*22)+'px';

h.style.animationDuration=
(5+Math.random()*5)+'s';

document.body.appendChild(h);

setTimeout(
()=>h.remove(),
11000
);
}

function burst(n){

for(let j=0;j<n;j++){

setTimeout(
heart,
j*30
);
}
}

setInterval(
heart,
800
);
