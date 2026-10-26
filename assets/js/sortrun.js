/* Sort Run: 45-second parcel sorting game. Shared by the landing page (#sortrun section) and /sort-run/. Needs assets/js/common.js loaded first (uses track). */
(function(){
  /* ===== Language: English by default; French when the page is <html lang="fr..."> (strings only; analytics values stay English so reports match) ===== */
  var FR=(document.documentElement.lang||"").slice(0,2)==="fr";
  var T=FR?{
    osName:"Étagère hors format", osSub:"Colis lourds ou volumineux", oversize:"HORS FORMAT",
    friend:function(n){return "Un ami a obtenu "+n+" points. Réussirez-vous à le battre ?";},
    streak:"Belle série.", osMiss:"Celui-là était hors format. Il va sur l’étagère.", routeMiss:"Vérifiez la liste des routes pour ce code postal.",
    r1:"Vétéran du quai", m1:"Rapide et précis. Vous vous sentiriez comme chez vous sur le plancher du terminal.",
    r2:"Trieur solide", m2:"Bon rythme. Après quelques parties, la liste des routes n’aura plus de secrets pour vous.",
    r3:"Vous prenez vos repères", m3:"Tout le monde commence lentement. Apprendre la liste des routes, c’est l’essentiel du tri.",
    win:function(b){return "Vous avez battu les "+b+" points de votre ami.";}, tie:function(b){return "Égalité avec les "+b+" points de votre ami.";},
    lose:function(d,b){return "Il vous manque "+d+" points pour égaler les "+b+" points de votre ami. Rejouer ?";},
    cIScored:"J’ai obtenu", cBang:"!", cKeep:"Saurez-vous suivre ?", cStats:function(c,a){return c+" colis triés  |  "+a+"\u00a0% de précision";},
    cPlay:"Jouez à Sort Run", cBeat:"45 secondes. Battez mon pointage.", cBrand:"Precision Deliveries  |  une entreprise du Groupe FastFrate",
    shareText:function(s){return "J’ai obtenu "+s+" points\u00a0! Saurez-vous suivre\u00a0? Cliquez pour jouer à Sort Run, le jeu de tri de colis de 45 secondes de Precision Deliveries, et essayez de me battre.";},
    shareTitle:function(s){return "J’ai obtenu "+s+" points à Sort Run";},
    drawing:"Un instant, votre carte est encore en cours de création. Réessayez.", saved:"Carte de pointage enregistrée. Ajoutez-la à votre story, à votre publication ou à votre message.",
    copied:"Lien copié. Collez-le où vous voulez.", copiedMsg:function(n){return "Message et lien copiés. Enregistrez la carte de pointage ci-dessus et ajoutez-la à votre story ou à votre publication "+n+".";},
    copyFail:"Impossible de copier. Copiez ce lien\u00a0: "
  }:{
    osName:"Oversize shelf", osSub:"Heavy or large parcels", oversize:"OVERSIZE",
    friend:function(n){return "A friend scored "+n+" points. Can you beat it?";},
    streak:"Nice streak.", osMiss:"That one was oversize. It goes on the shelf.", routeMiss:"Check the route list for that postal code.",
    r1:"Dock veteran", m1:"Fast and clean. You’d feel at home on the terminal floor.",
    r2:"Solid sorter", m2:"Good rhythm. A few runs and the route list becomes second nature.",
    r3:"Getting your bearings", m3:"Everyone starts slow. Learning the route list is most of the skill.",
    win:function(b){return "You beat your friend’s "+b+" points.";}, tie:function(b){return "A tie with your friend’s "+b+" points.";},
    lose:function(d,b){return "You’re "+d+" points short of your friend’s "+b+". Play again?";},
    cIScored:"I scored", cBang:"!", cKeep:"Can you keep up?", cStats:function(c,a){return c+" parcels sorted  |  "+a+"% accuracy";},
    cPlay:"Play Sort Run", cBeat:"45 seconds. Beat my score.", cBrand:"Precision Deliveries  |  a FastFrate Group company",
    shareText:function(s){return "I scored "+s+"! Can you keep up? Click to play Sort Run, the 45-second parcel sorting game from Precision Deliveries, and try to beat me.";},
    shareTitle:function(s){return "I scored "+s+" on Sort Run";},
    drawing:"One moment, your card is still drawing. Try again.", saved:"Score card saved. Add it to your story, post or message.",
    copied:"Link copied. Paste it anywhere.", copiedMsg:function(n){return "Message and link copied. Save the score card above and add it to your "+n+" story or post.";},
    copyFail:"Couldn’t copy. Copy this link: "
  };
  var RANKKEY={1:"Dock veteran",2:"Solid sorter",3:"Getting your bearings"};   // analytics always receives the English rank name

  /* ===== Data ===== */
  var ROUTES=[
    {n:"Route 1",c:"#2d7bff",fsa:["L8L","L8M","L8N","L8P","L8R","L8S"]},
    {n:"Route 2",c:"#17e1c4",fsa:["L8E","L8G","L8H","L8J","L8K"]},
    {n:"Route 3",c:"#a62dff",fsa:["L9A","L9B","L9C"]},
    {n:"Route 4",c:"#ff2d95",fsa:["L9G","L9H","L9K"]}
  ];
  var OS={n:T.osName,c:"#ffd400",p:T.osSub};
  var LETTERS="ABCEGHJKLMNPRSTVWXYZ", DURATION=45;

  var $=function(id){return document.getElementById(id)};
  var game=$("sortrun"), intro=$("sr-intro"), play=$("sr-play"), res=$("sr-result"), binsEl=$("sr-bins"), parcelEl=$("sr-parcel");
  if(!game) return;
  var S={score:0,streak:0,correct:0,total:0,left:DURATION,answer:-1,running:false,locked:false,timer:null,t0:0,rank:""};
  function rnd(n){return Math.floor(Math.random()*n)}
  function ldu(){return (1+rnd(9))+LETTERS[rnd(LETTERS.length)]+rnd(10)}

  /* ===== Challenge link: ?beat=NN shows a friend's score ===== */
  var beat=0;
  try{ var b=parseInt(new URLSearchParams(location.search).get("beat"),10); if(b>0&&b<=2000) beat=b; }catch(e){}
  if(beat){ var ch=$("sr-challenge"); ch.textContent=T.friend(beat); ch.hidden=false; }

  /* ===== Build bins ===== */
  function build(){
    binsEl.innerHTML="";
    ROUTES.forEach(function(r,i){ binsEl.appendChild(cell(i,r.n,r.fsa.join(" "),r.c,false)); });
    binsEl.appendChild(cell(4,OS.n,OS.p,OS.c,true));
  }
  function cell(i,name,sub,color,os){
    var d=document.createElement("div"); d.className="cell"+(os?" os":""); d.style.setProperty("--i",i);
    var b=document.createElement("button"); b.type="button"; b.className="opt rb";
    b.style.setProperty("--c",color);
    b.innerHTML='<b><i class="dot" aria-hidden="true"></i>'+(i+1)+". "+name+'</b><span class="p">'+sub+"</span>";
    b.addEventListener("click",function(){ choose(i,d); });
    d.appendChild(b); return d;
  }

  /* ===== Game loop ===== */
  function nextParcel(){
    var os=Math.random()<0.18, r=ROUTES[rnd(ROUTES.length)], f=r.fsa[rnd(r.fsa.length)];
    S.answer=os?4:ROUTES.indexOf(r);
    parcelEl.className="sr-parcel";
    parcelEl.innerHTML='<div class="sr-lbl"><div class="sr-code">'+f+" "+ldu()+'</div><div class="sr-city">Hamilton, ON</div></div>'+(os?'<span class="sr-tag">'+T.oversize+' · '+(18+rnd(20))+" kg</span>":"");
    void parcelEl.offsetWidth; parcelEl.className="sr-parcel in";
    S.locked=false;
  }
  function hud(){
    $("sr-score").textContent=S.score; $("sr-streak").textContent=S.streak;
    $("sr-time").textContent=Math.ceil(S.left);
    $("sr-bar").style.transform="scaleX("+Math.max(0,S.left/DURATION)+")";
  }
  function choose(i,cellEl){
    if(!S.running||S.locked) return;
    S.locked=true; S.total++;
    if(cellEl){ cellEl.classList.remove("pulse"); void cellEl.offsetWidth; cellEl.classList.add("pulse"); }
    var ok=(i===S.answer), h=$("sr-hint");
    if(ok){
      S.correct++; S.streak++; S.score+=10+Math.min(S.streak,5)*2;
      parcelEl.className="sr-parcel ok"; h.textContent=S.streak>=3?T.streak:"";
    }else{
      S.streak=0; S.score=Math.max(0,S.score-5);
      parcelEl.className="sr-parcel no";
      h.textContent=S.answer===4?T.osMiss:T.routeMiss;
    }
    hud();
    setTimeout(function(){ if(S.running) nextParcel(); }, ok?170:400);
  }
  function tick(){ S.left=Math.max(0,DURATION-(Date.now()-S.t0)/1000); hud(); if(S.left<=0) finish(); }
  function start(){
    S.score=0;S.streak=0;S.correct=0;S.total=0;S.left=DURATION;S.running=true;S.t0=Date.now();
    intro.hidden=true; res.hidden=true; play.hidden=false; $("sr-hint").textContent="";
    game.classList.add("run");
    binsEl.classList.add("in"); setTimeout(function(){ binsEl.classList.remove("in"); },1100);
    hud(); nextParcel(); clearInterval(S.timer); S.timer=setInterval(tick,100);
    track("sort_start");
    play.scrollIntoView({behavior:"smooth",block:"start"});
  }
  /* Colourful burst when the result pops open (same as the playlist game; skipped for visitors who prefer reduced motion) */
  function burst(host){
    if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var cols=["#ff2d95","#ff7a00","#ffd400","#2dff7a","#17e1c4","#2d7bff","#a62dff"], w=document.createElement("div");
    w.className="burst"; w.setAttribute("aria-hidden","true");
    for(var i=0;i<16;i++){ var d=document.createElement("i"), a=Math.PI*2*i/16+Math.random()*.3, r=90+Math.random()*70;
      d.style.setProperty("--dx",Math.round(Math.cos(a)*r)+"px"); d.style.setProperty("--dy",Math.round(Math.sin(a)*r)+"px"); d.style.background=cols[i%cols.length]; w.appendChild(d); }
    host.appendChild(w); setTimeout(function(){ if(w.parentNode) w.parentNode.removeChild(w); },1400);
  }
  function finish(){
    S.running=false; clearInterval(S.timer); game.classList.remove("run");
    play.hidden=true; res.hidden=false;
    res.classList.remove("pop"); void res.offsetWidth; res.classList.add("pop"); burst(res);   // pops open like a balloon
    var acc=S.total?Math.round(S.correct/S.total*100):0, rank, msg, rk;
    if(S.correct>=22&&acc>=90){rk=1; rank=T.r1; msg=T.m1;}
    else if(S.correct>=12){rk=2; rank=T.r2; msg=T.m2;}
    else{rk=3; rank=T.r3; msg=T.m3;}
    S.rank=rank; S.acc=acc; S.played=true;
    $("sr-rank").textContent=rank; $("sr-msg").textContent=msg;
    $("sr-r-count").textContent=S.correct; $("sr-r-acc").textContent=acc+"%"; $("sr-r-score").textContent=S.score;
    var vs=$("sr-vs");
    if(beat){ vs.hidden=false; vs.textContent = S.score>beat ? T.win(beat) : (S.score===beat ? T.tie(beat) : T.lose(beat-S.score,beat)); }
    $("sr-sharepanel").hidden=true; $("sr-share").setAttribute("aria-expanded","false"); $("sr-sharemsg").textContent="";
    S.blob=null; S.file=null; buildCard();
    track("sort_complete",{parcels:S.correct,accuracy:acc,score:S.score,rank:RANKKEY[rk],challenge:beat?"yes":"no"});
    $("sr-rank").focus({preventScroll:true});
    res.scrollIntoView({behavior:"smooth",block:"center"});
  }
  document.addEventListener("keydown",function(e){
    if(!S.running) return; var k=parseInt(e.key,10);
    if(k>=1&&k<=5) choose(k-1, binsEl.children[k-1]);
  });
  $("sr-start").addEventListener("click",start);
  $("sr-again").addEventListener("click",start);
  build();

  /* ===== Glow and motion run only while the game is on screen (same approach as the main page) ===== */
  if("IntersectionObserver" in window){ new IntersectionObserver(function(en){ game.classList.toggle("live",en[0].isIntersecting); },{threshold:0.05}).observe(game); } else { game.classList.add("live"); }

  /* ===== Share: message with score + Facebook, WhatsApp, LinkedIn, Instagram, TikTok, copy link, phone share menu ===== */
  var shBtn=$("sr-share"), shP=$("sr-sharepanel"), shMsg=$("sr-sharemsg");
  if(navigator.share) shP.querySelector('[data-net="native"]').hidden=false;
  /* ===== Score card image: drawn in the player's browser, never uploaded or stored ===== */
  var logoImg=null;
  function loadLogo(){ return new Promise(function(res){ if(logoImg) return res(logoImg); var i=new Image(); i.onload=function(){ logoImg=i; res(i); }; i.onerror=function(){ res(null); }; i.src=(game.getAttribute("data-logo")||"assets/img/precision-logo.png"); }); }
  var RB=["#ff2d95","#ff7a00","#ffd400","#2dff7a","#17e1c4","#2d7bff","#a62dff"];
  function rainbow(x,x0,x1){ var g=x.createLinearGradient(x0,0,x1,0); RB.forEach(function(c,i){ g.addColorStop(i/(RB.length-1),c); }); return g; }
  function rrect(x,px,py,w,h,r){ x.beginPath(); x.moveTo(px+r,py); x.arcTo(px+w,py,px+w,py+h,r); x.arcTo(px+w,py+h,px,py+h,r); x.arcTo(px,py+h,px,py,r); x.arcTo(px,py,px+w,py,r); x.closePath(); }
  function drawCard(logo){
    var c=$("sr-card"), x=c.getContext("2d"), W=1080, H=1080, F='Archivo, Arial, Helvetica, sans-serif', i;
    c.width=W; c.height=H;
    x.fillStyle="#0A1033"; x.fillRect(0,0,W,H);
    var gl=x.createRadialGradient(W*.72,H*.32,10,W*.72,H*.32,720); gl.addColorStop(0,"rgba(30,42,230,.6)"); gl.addColorStop(1,"rgba(30,42,230,0)"); x.fillStyle=gl; x.fillRect(0,0,W,H);
    x.fillStyle=rainbow(x,0,W); for(i=0;i<W;i+=22){ x.fillRect(i,0,15,14); x.fillRect(i,H-14,15,14); }
    x.textAlign="center"; x.textBaseline="alphabetic";
    // logo chip
    if(logo){ var lh=70, lw=Math.round(logo.width*lh/logo.height), cw=lw+36, ch=lh+24; x.fillStyle="#fff"; rrect(x,(W-cw)/2,50,cw,ch,16); x.fill(); x.drawImage(logo,(W-lw)/2,62,lw,lh); }
    // "I scored" + big score
    x.fillStyle="#C9CFEA"; x.font="600 64px "+F; x.fillText(T.cIScored,W/2,290);
    var big=String(S.score)+T.cBang, size=300; x.font="800 "+size+"px "+F;
    while(x.measureText(big).width>880&&size>120){ size-=10; x.font="800 "+size+"px "+F; }
    x.fillStyle="#fff"; x.fillText(big,W/2,290+size*0.86);
    var y=290+size*0.86+110;
    x.font="800 86px "+F; x.fillText(T.cKeep,W/2,y);
    x.fillStyle="#5CE1FF"; x.font="700 46px "+F; x.fillText(S.rank,W/2,y+68);
    x.fillStyle="#C9CFEA"; x.font="500 38px "+F; x.fillText(T.cStats(S.correct,S.acc),W/2,y+124);
    // call-to-action panel with LED outline
    var py=H-250, ph=190, pw=860, px=(W-pw)/2;
    x.save(); x.shadowColor="rgba(120,140,255,.9)"; x.shadowBlur=26; x.lineWidth=6; x.strokeStyle=rainbow(x,px,px+pw); rrect(x,px,py,pw,ph,26); x.stroke(); x.restore();
    x.fillStyle="#0C123C"; rrect(x,px+3,py+3,pw-6,ph-6,24); x.fill();
    x.fillStyle="#fff"; x.font="800 64px "+F; x.fillText(T.cPlay,W/2,py+80);
    x.fillStyle="#C9CFEA"; x.font="500 34px "+F; x.fillText(T.cBeat,W/2,py+128);
    x.fillStyle="#8E98D6"; x.font="500 26px "+F; x.fillText(T.cBrand,W/2,py+168);
    c.toBlob(function(b){
      S.blob=b;
      try{ S.file=new File([b],"sort-run-score.jpg",{type:"image/jpeg"}); }catch(e){ S.file=null; }
      var ib=shP.querySelector('[data-net="image"]');
      ib.hidden=!(S.file&&navigator.canShare&&navigator.canShare({files:[S.file]}));
    },"image/jpeg",0.92);
  }
  function buildCard(){
    var fonts=(document.fonts&&document.fonts.load)?Promise.all([document.fonts.load("800 100px Archivo"),document.fonts.load("600 40px Archivo"),document.fonts.load("500 40px Archivo")]).catch(function(){}):Promise.resolve();
    Promise.all([fonts,loadLogo()]).then(function(r){ drawCard(r[1]); });
  }

  function shareText(){ return T.shareText(S.score); }
  function shareUrl(net){ return location.origin+location.pathname+"?utm_source=game_share&utm_medium=referral&utm_campaign=sort_run&utm_content="+encodeURIComponent(net)+"&beat="+S.score+"#sortrun"; }
  function copyText(t){
    if(navigator.clipboard&&navigator.clipboard.writeText) return navigator.clipboard.writeText(t);
    return new Promise(function(res,rej){ var ta=document.createElement("textarea"); ta.value=t; ta.setAttribute("readonly",""); ta.style.position="fixed"; ta.style.opacity="0"; document.body.appendChild(ta); ta.select();
      var ok=false; try{ ok=document.execCommand("copy"); }catch(e){} document.body.removeChild(ta); ok?res():rej(); });
  }
  shBtn.addEventListener("click",function(){ var opening=shP.hidden; shP.hidden=!opening; shBtn.setAttribute("aria-expanded",String(opening)); if(opening) track("sort_share_open"); });
  shP.addEventListener("click",function(e){
    var b=e.target.closest("[data-net]"); if(!b) return;
    var net=b.getAttribute("data-net"), url=shareUrl(net), txt=shareText(); shMsg.textContent="";
    track("sort_share",{method:net,score:S.score});
    if(net==="image"){ if(S.file){ navigator.share({files:[S.file],title:T.shareTitle(S.score),text:txt+" "+url}).catch(function(){}); } return; }
    if(net==="save"){
      if(!S.blob){ shMsg.textContent=T.drawing; return; }
      var a=document.createElement("a"); a.href=URL.createObjectURL(S.blob); a.download="sort-run-score.jpg"; document.body.appendChild(a); a.click(); document.body.removeChild(a);
      shMsg.textContent=T.saved; return;
    }
    if(net==="native"){ navigator.share({title:T.shareTitle(S.score),text:txt+" "+url}).catch(function(){}); return; }
    if(net==="facebook"){ window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(url),"_blank","noopener,width=600,height=500"); return; }
    if(net==="whatsapp"){ window.open("https://wa.me/?text="+encodeURIComponent(txt+" "+url),"_blank","noopener"); return; }
    if(net==="linkedin"){ window.open("https://www.linkedin.com/sharing/share-offsite/?url="+encodeURIComponent(url),"_blank","noopener,width=600,height=600"); return; }
    var done=copyText(txt+" "+url);   // Instagram and TikTok have no web share link, so copy the message and open the site
    if(net==="instagram") window.open("https://www.instagram.com/","_blank","noopener");
    if(net==="tiktok") window.open("https://www.tiktok.com/","_blank","noopener");
    done.then(function(){ shMsg.textContent = net==="copy" ? T.copied : T.copiedMsg(net==="instagram"?"Instagram":"TikTok"); })
        .catch(function(){ shMsg.textContent=T.copyFail+url; });
  });

  /* ===== Pop-up mode (landing page only): opens once per visit when the visitor scrolls past the section named in data-after,
     from the menu link, or from a shared challenge link. Easy to close (X, Esc, tap outside). ===== */
  var modal=$("sr-modal");
  if(modal){
    var closeBtn=$("sr-close"), lastFocus=null, root=document.documentElement;
    var seenKey="sr_popup_seen";
    function alreadySeen(){ try{ return sessionStorage.getItem(seenKey)==="1"; }catch(e){ return false; } }
    function openSR(why){
      if(!modal.hidden) return;
      lastFocus=document.activeElement; modal.hidden=false; root.classList.add("sr-lock"); game.classList.add("live");
      if(launch) launch.hidden=true;
      try{ sessionStorage.setItem(seenKey,"1"); }catch(e){}
      modal.scrollTop=0; track("sort_popup_open",{trigger:why});
      setTimeout(function(){ closeBtn.focus({preventScroll:true}); },60);
    }
    var launch=$("sr-launch"), launchBtn=$("sr-launch-btn"), launchX=$("sr-launch-x"), clicked=false;
    function launcherOff(){ try{ return sessionStorage.getItem("sr_launch_off")==="1"; }catch(e){ return false; } }
    function showLauncher(){
      if(!launch||launcherOff()) return;
      launch.classList.toggle("calm",clicked||!!S.played);
      launch.classList.remove("in"); launch.hidden=false; void launch.offsetWidth; launch.classList.add("in");
    }
    function closeSR(){
      if(modal.hidden) return;
      if(S.running){ S.running=false; clearInterval(S.timer); game.classList.remove("run"); play.hidden=true; res.hidden=true; intro.hidden=false; }
      root.classList.remove("sr-lock"); track("sort_popup_close");
      var box=modal.querySelector(".sr-modal-box");
      function finishClose(){
        modal.hidden=true; modal.style.background=""; modal.style.transition="";
        if(box&&box.getAnimations) box.getAnimations().forEach(function(a){ if(a.id==="srzoom") a.cancel(); });
        showLauncher();
        if(lastFocus&&lastFocus.focus&&document.contains(lastFocus)) lastFocus.focus({preventScroll:true});
      }
      var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
      if(!launch||launcherOff()||reduce||!box||!box.animate){ finishClose(); return; }
      // zoom the pop-up toward where the side tab will appear
      launch.hidden=false; launch.style.visibility="hidden";
      var L=launch.getBoundingClientRect(), B=box.getBoundingClientRect();
      var dx=(L.left+L.width/2)-(B.left+B.width/2), dy=(L.top+L.height/2)-(B.top+B.height/2);
      launch.hidden=true; launch.style.visibility="";
      modal.style.transition="background-color .42s"; modal.style.background="rgba(4,7,26,0)";
      var a=box.animate([{transform:"none",opacity:1},{transform:"translate("+dx+"px,"+dy+"px) scale(.05)",opacity:.2}],{duration:460,easing:"cubic-bezier(.55,0,.75,.35)",fill:"forwards",id:"srzoom"});
      a.onfinish=finishClose; a.oncancel=function(){};
    }
    if(launchBtn) launchBtn.addEventListener("click",function(){ clicked=true; track("sort_tab_click"); openSR("tab"); });
    if(launchX) launchX.addEventListener("click",function(){ try{ sessionStorage.setItem("sr_launch_off","1"); }catch(e){} launch.hidden=true; track("sort_tab_hide"); });
    closeBtn.addEventListener("click",closeSR);
    modal.addEventListener("click",function(e){ if(e.target===modal) closeSR(); });
    document.addEventListener("keydown",function(e){
      if(modal.hidden) return;
      if(e.key==="Escape"){ closeSR(); return; }
      if(e.key==="Tab"){   // keep keyboard focus inside the pop-up
        var f=[].filter.call(modal.querySelectorAll("button,a[href]"),function(el){ return !el.hidden && el.offsetParent!==null; });
        if(!f.length) return; var first=f[0], last=f[f.length-1];
        if(e.shiftKey&&document.activeElement===first){ e.preventDefault(); last.focus(); }
        else if(!e.shiftKey&&document.activeElement===last){ e.preventDefault(); first.focus(); }
      }
    });
    // Menu link and any other link to #sortrun
    document.addEventListener("click",function(e){
      var a=e.target.closest&&e.target.closest('a[href="#sortrun"]'); if(!a) return;
      e.preventDefault(); openSR("menu");
    });
    // Shared challenge link (?beat=N) or #sortrun in the address
    if(location.hash==="#sortrun"||beat){ setTimeout(function(){ openSR("shared_link"); },500); }
    // Auto-open once, when the visitor scrolls past the section named in data-after (checked on scroll, so a fast flick or jump can't skip it)
    var after=document.getElementById(modal.getAttribute("data-after")||""), touched=false, ticking=false;
    ["wheel","touchmove","keydown","mousedown"].forEach(function(ev){ window.addEventListener(ev,function(){ touched=true; },{passive:true,once:true}); });
    function checkPast(){
      ticking=false;
      if(!after||!touched||!modal.hidden||alreadySeen()) return;
      if(after.getBoundingClientRect().bottom<0){ setTimeout(function(){ if(modal.hidden&&!alreadySeen()) openSR("scroll"); },300); }
    }
    window.addEventListener("scroll",function(){ if(!ticking){ ticking=true; requestAnimationFrame(checkPast); } },{passive:true});
  }
})();
