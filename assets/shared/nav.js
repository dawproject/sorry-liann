/* Navigasi bersama: "Our Little Archive" + Previous/Next Story. Terisolasi dengan Shadow DOM
   supaya tidak bentrok dengan CSS/JS website mana pun. Data diambil dari data/websites.json. */
(async function(){
  try{
    var root=new URL('../../',document.currentScript.src);
    var m=location.pathname.match(/\/maaf\/(\w+)/); var id=m&&m[1];
    var list=await (await fetch(new URL('data/websites.json',root))).json();
    var av=list.filter(function(w){return w.status==='available'}).sort(function(a,b){return a.id>b.id?1:-1});
    var i=av.findIndex(function(w){return w.id===id});
    var prev=i>0?av[i-1]:null, next=i>=0&&i<av.length-1?av[i+1]:null;
    function host(css,html,fixed){
      var h=document.createElement('div');var s=h.attachShadow({mode:'open'});
      s.innerHTML='<style>*{box-sizing:border-box}a{font:500 12px/1 system-ui,sans-serif;color:#B97883;text-decoration:none}'+css+'</style>'+html;
      document.body.appendChild(h);return h;
    }
    host('.p{position:fixed;left:10px;bottom:calc(10px + env(safe-area-inset-bottom,0px));z-index:2147483000;background:rgba(255,249,243,.92);border:1px solid #F5EBDD;border-radius:999px;padding:9px 13px;box-shadow:0 4px 14px rgba(128,105,93,.15);opacity:.85;min-height:36px;display:flex;align-items:center}.p:hover{opacity:1}',
      '<a class="p" href="'+root.pathname+'">🌿 Our Little Archive</a>');
    if(prev||next){
      host('.n{display:flex;justify-content:space-between;gap:12px;max-width:520px;margin:0 auto;padding:18px 18px calc(64px + env(safe-area-inset-bottom,0px));position:relative;z-index:5}a{padding:10px 4px}',
        '<div class="n"><span>'+(prev?'<a href="'+prev.url+'">← Previous Story</a>':'')+'</span><span>'+(next?'<a href="'+next.url+'">Next Story →</a>':'')+'</span></div>');
    }
  }catch(e){}
})();
