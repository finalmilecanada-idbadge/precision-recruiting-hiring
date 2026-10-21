/* Sort Run: 45-second parcel sorting game. Shared by the landing page (#sortrun section) and /sort-run/. Needs assets/js/common.js loaded first (uses track). */
(function(){
  /* ===== Data ===== */
  var ROUTES=[
    {n:"Route 1",c:"#2d7bff",fsa:["L8L","L8M","L8N","L8P","L8R","L8S"]},
    {n:"Route 2",c:"#17e1c4",fsa:["L8E","L8G","L8H","L8J","L8K"]},
    {n:"Route 3",c:"#a62dff",fsa:["L9A","L9B","L9C"]},
    {n:"Route 4",c:"#ff2d95",fsa:["L9G","L9H","L9K"]}
  ];
  var OS={n:"Oversize shelf",c:"#ffd400",p:"Heavy or large parcels"};
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
  if(beat){ var ch=$("sr-challenge"); ch.textContent="A friend scored "+beat+" points. Can you beat it?"; ch.hidden=false; }

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
    parcelEl.innerHTML='<div class="sr-lbl"><div class="sr-code">'+f+" "+ldu()+'</div><div class="sr-city">Hamilton, ON</div></div>'+(os?'<span class="sr-tag">OVERSIZE · '+(18+rnd(20))+" kg</span>":"");
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
      parcelEl.className="sr-parcel ok"; h.textContent=S.streak>=3?"Nice streak.":"";
    }else{
      S.streak=0; S.score=Math.max(0,S.score-5);
      parcelEl.className="sr-parcel no";
      h.textContent=S.answer===4?"That one was oversize. It goes on the shelf.":"Check the route list for that postal code.";
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
    var acc=S.total?Math.round(S.correct/S.total*100):0, rank, msg;
    if(S.correct>=22&&acc>=90){rank="Dock veteran"; msg="Fast and clean. You’d feel at home on the terminal floor.";}
    else if(S.correct>=12){rank="Solid sorter"; msg="Good rhythm. A few runs and the route list becomes second nature.";}
    else{rank="Getting your bearings"; msg="Everyone starts slow. Learning the route list is most of the skill.";}
    S.rank=rank; S.acc=acc;
    $("sr-rank").textContent=rank; $("sr-msg").textContent=msg;
    $("sr-r-count").textContent=S.correct; $("sr-r-acc").textContent=acc+"%"; $("sr-r-score").textContent=S.score;
    var vs=$("sr-vs");
    if(beat){ vs.hidden=false; vs.textContent = S.score>beat ? "You beat your friend’s "+beat+" points." : (S.score===beat ? "A tie with your friend’s "+beat+" points." : "You’re "+(beat-S.score)+" points short of your friend’s "+beat+". Play again?"); }
    $("sr-sharepanel").hidden=true; $("sr-share").setAttribute("aria-expanded","false"); $("sr-sharemsg").textContent="";
    S.blob=null; S.file=null; buildCard();
    track("sort_complete",{parcels:S.correct,accuracy:acc,score:S.score,rank:rank,challenge:beat?"yes":"no"});
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
    x.fillStyle="#C9CFEA"; x.font="600 64px "+F; x.fillText("I scored",W/2,290);
    var big=String(S.score)+"!", size=300; x.font="800 "+size+"px "+F;
    while(x.measureText(big).width>880&&size>120){ size-=10; x.font="800 "+size+"px "+F; }
    x.fillStyle="#fff"; x.fillText(big,W/2,290+size*0.86);
    var y=290+size*0.86+110;
    x.font="800 86px "+F; x.fillText("Can you keep up?",W/2,y);
    x.fillStyle="#5CE1FF"; x.font="700 46px "+F; x.fillText(S.rank,W/2,y+68);
    x.fillStyle="#C9CFEA"; x.font="500 38px "+F; x.fillText(S.correct+" parcels sorted  |  "+S.acc+"% accuracy",W/2,y+124);
    // call-to-action panel with LED outline
    var py=H-250, ph=190, pw=860, px=(W-pw)/2;
    x.save(); x.shadowColor="rgba(120,140,255,.9)"; x.shadowBlur=26; x.lineWidth=6; x.strokeStyle=rainbow(x,px,px+pw); rrect(x,px,py,pw,ph,26); x.stroke(); x.restore();
    x.fillStyle="#0C123C"; rrect(x,px+3,py+3,pw-6,ph-6,24); x.fill();
    x.fillStyle="#fff"; x.font="800 64px "+F; x.fillText("Play Sort Run",W/2,py+80);
    x.fillStyle="#C9CFEA"; x.font="500 34px "+F; x.fillText("45 seconds. Beat my score.",W/2,py+128);
    x.fillStyle="#8E98D6"; x.font="500 26px "+F; x.fillText("Precision Deliveries  |  a FastFrate Group company",W/2,py+168);
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

  function shareText(){ return "I scored "+S.score+"! Can you keep up? Play Sort Run, the 45-second parcel sorting game from Precision Deliveries, and try to beat me."; }
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
    if(net==="image"){ if(S.file){ navigator.share({files:[S.file],title:"I scored "+S.score+" on Sort Run",text:txt+" "+url}).catch(function(){}); } return; }
    if(net==="save"){
      if(!S.blob){ shMsg.textContent="One moment, your card is still drawing. Try again."; return; }
      var a=document.createElement("a"); a.href=URL.createObjectURL(S.blob); a.download="sort-run-score.jpg"; document.body.appendChild(a); a.click(); document.body.removeChild(a);
      shMsg.textContent="Score card saved. Add it to your story, post or message."; return;
    }
    if(net==="native"){ navigator.share({title:"I scored "+S.score+" on Sort Run",text:txt,url:url}).catch(function(){}); return; }
    if(net==="facebook"){ window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(url),"_blank","noopener,width=600,height=500"); return; }
    if(net==="whatsapp"){ window.open("https://wa.me/?text="+encodeURIComponent(txt+" "+url),"_blank","noopener"); return; }
    if(net==="linkedin"){ window.open("https://www.linkedin.com/sharing/share-offsite/?url="+encodeURIComponent(url),"_blank","noopener,width=600,height=600"); return; }
    var done=copyText(txt+" "+url);   // Instagram and TikTok have no web share link, so copy the message and open the site
    if(net==="instagram") window.open("https://www.instagram.com/","_blank","noopener");
    if(net==="tiktok") window.open("https://www.tiktok.com/","_blank","noopener");
    done.then(function(){ shMsg.textContent = net==="copy" ? "Link copied. Paste it anywhere." : "Message and link copied. Save the score card above and add it to your "+(net==="instagram"?"Instagram":"TikTok")+" story or post."; })
        .catch(function(){ shMsg.textContent="Couldn’t copy. Copy this link: "+url; });
  });
})();
