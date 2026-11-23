const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const wait=ms=>new Promise(r=>setTimeout(r,ms));
let cur=0,tok=0;
function go(n){
  tok++;cur=n;
  $$('.scr').forEach((e,i)=>e.classList.toggle('on',i===n));
  window.scrollTo({top:0,behavior:'smooth'});
  if(n===1)narr();if(n===2)chat();if(n===5)flower();
}
$$('[data-go]').forEach(b=>b.onclick=()=>go(+b.dataset.go));
async function narr(){
  const t=["Kadang kita lupa bahwa di balik setiap percakapan, ada dua orang dengan perasaan masing-masing.","Ada hal-hal kecil yang mungkin dianggap biasa oleh satu orang, tetapi ternyata berarti bagi orang lain.","Ada janji yang ingin dijaga, waktu yang ingin dihargai, perhatian yang ingin dimengerti, dan perasaan yang terkadang sulit disampaikan.","Kita pernah salah memahami.<br>Kita pernah kecewa.<br>Kita pernah membuat satu sama lain merasa kurang dimengerti.","Tapi bukankah kita memang masih sama-sama belajar?"];
  const box=$('#nar'),my=tok;box.innerHTML='';$('#b1').classList.add('hide');
  for(const x of t){if(my!==tok)return;const p=document.createElement('p');p.className='ln';p.innerHTML=x;box.appendChild(p);await wait(2300)}
  if(my===tok)$('#b1').classList.remove('hide');
}
const conv=[["m","Maaf kalau selama ini aku terkadang terlalu fokus sama perasaanku sendiri."],["l","Maaf juga kalau aku masih sering kurang peka sama keadaan kamu."],["m","Aku juga sadar kalau aku punya banyak kekurangan. Aku nggak selalu bisa menyampaikan sesuatu dengan cara yang tepat."],["l","Aku tahu kita sama-sama masih belajar memahami satu sama lain."],["m","Aku nggak pernah menganggap kamu sebagai beban, Lian. Aku cuma ingin kita sama-sama punya kemauan untuk belajar."],["l","Aku juga nggak mau kamu terus merasa harus mengalah atau mengubah dirimu sendiri hanya karena menghadapi aku."],["m","Karena bukan cuma kamu yang perlu belajar menjadi lebih baik. Aku juga."],["l","Aku ingin kita bisa saling menghargai, bukan hanya ketika semuanya baik-baik saja."],["m","Kalau suatu saat kita melakukan kesalahan lagi, semoga kita bisa membicarakannya baik-baik."],["l","Tanpa harus terus mencari siapa yang paling salah."],["m","Karena pada akhirnya, kita berdua punya kekurangan dan kita berdua punya perasaan yang perlu dijaga."],["l","Ayo kita belajar tumbuh bersama."]];
async function chat(){
  const c=$('#chat'),my=tok;c.innerHTML='';$('#b2').classList.add('hide');
  let h=19,m=4;
  for(const [w,x] of conv){
    if(my!==tok)return;
    const ty=document.createElement('div');ty.className='b ty '+(w==='m'?'me':'li');ty.innerHTML='<i></i><i></i><i></i>';
    c.appendChild(ty);ty.scrollIntoView({block:'end',behavior:'smooth'});
    await wait(Math.min(2600,900+x.length*22));
    if(my!==tok)return;
    m+=1;const ts=h+':'+String(m).padStart(2,'0');
    ty.className='b '+(w==='m'?'me':'li');ty.innerHTML=(w==='m'?'':'<b style="font-size:11px;color:#B97883">Lian</b><br>')+x+'<small>'+ts+'</small>';
    ty.scrollIntoView({block:'end',behavior:'smooth'});await wait(700);
  }
  if(my===tok){$('#b2').classList.remove('hide');$('#b2').scrollIntoView({block:'end',behavior:'smooth'})}
}
$$('.card').forEach(c=>c.onclick=()=>c.classList.toggle('open'));
async function flower(){
  const f=$('#fl'),my=tok,cap=$('#cap');f.className.baseVal='';$('#b5').classList.add('hide');
  const cs=["Setiap hal indah selalu bermula dari suatu tempat.","Memaafkan memberi kita tempat untuk memulai.","Saling menghormati dan memahami membuat kita tumbuh.","Sesuatu yang indah tumbuh ketika kita sama-sama peduli."];
  cap.textContent=cs[0];
  for(let i=1;i<4;i++){
    await wait(3200);if(my!==tok)return;
    cap.style.opacity=0;await wait(300);
    f.classList.add('s'+(i+1));if(i>=1)f.classList.add('s2');if(i>=2)f.classList.add('s3');
    cap.textContent=cs[i];cap.style.opacity=1;
  }
  await wait(2500);if(my===tok)$('#b5').classList.remove('hide');
}
$$('.fw').forEach(b=>b.onclick=()=>{$$('.fw').forEach(x=>x.classList.remove('on'));b.classList.add('on');$('#gm').textContent=b.dataset.m});
$('#env').onclick=async()=>{
  $('#env').classList.add('hide');$('#envt').classList.add('hide');
  const l=$('#ltr');l.style.display='block';
  $$('#ltr p').forEach((p,i)=>p.style.animationDelay=(0.4+i*0.7)+'s');
  await wait(600+$$('#ltr p').length*700);$('#b7').classList.remove('hide');$('#b7').scrollIntoView({behavior:'smooth',block:'center'});
};
function petals(n){
  for(let i=0;i<n;i++){
    const p=document.createElement('span');p.className='pet';p.textContent=['🌸','🌷','🌺'][i%3];
    p.style.left=Math.random()*100+'vw';p.style.fontSize=(14+Math.random()*14)+'px';
    p.style.setProperty('--dx',(Math.random()*120-60)+'px');
    p.style.animationDuration=(5+Math.random()*5)+'s';p.style.animationDelay=Math.random()*2+'s';
    document.body.appendChild(p);setTimeout(()=>p.remove(),12500);
  }
}
const o=new MutationObserver(()=>{if($('#s8').classList.contains('on'))petals(10)});
o.observe($('#s8'),{attributes:true,attributeFilter:['class']});
$('#grow').onclick=()=>{
  const b=$('#bigf');b.style.transition='transform 4s ease';b.style.transform='scale(1.8)';
  $('#grow').classList.add('hide');petals(40);
  setTimeout(()=>$('#thx').classList.remove('hide'),1800);
  $('#thx').style.animation='fi 2s ease both';
};
/* MUSIK: file sendiri di maaf/02/assets/musik.mp3 — hanya diputar saat tombol 🌿 diketuk (tidak autoplay) */
const bgm=document.getElementById('bgm');
$('#mus').onclick=()=>{
  if(bgm.paused){bgm.volume=.5;bgm.play().then(()=>$('#mus').textContent='🔊').catch(()=>{})}
  else{bgm.pause();$('#mus').textContent='🌿'}
};
