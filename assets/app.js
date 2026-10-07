const artist=document.querySelector('#artist');
const type=document.querySelector('#type');
const button=document.querySelector('#find');
const results=document.querySelector('#results');

const artists={
  bts:{name:'BTS',guide:'./guides/bts.html',official:'https://shop.weverse.io/en/shop/USD/artists/2'},
  blackpink:{name:'BLACKPINK',guide:'./guides/blackpink.html',official:'https://shop.weverse.io/en/shop/USD/artists/32'},
  'kpop-demon-hunters':{name:'KPop Demon Hunters',guide:'./guides/kpop-demon-hunters.html',official:'https://www.netflix.shop/collections/kpop-demon-hunters'},
  'stray-kids':{name:'Stray Kids',guide:'./guides/stray-kids.html',official:'https://jypj-store.com/collections/stray-kids-official-goods'},
  katseye:{name:'KATSEYE',guide:'./guides/katseye.html',official:'https://shop.katseye.world/'},
  enhypen:{name:'ENHYPEN',guide:'./guides/enhypen.html',official:'https://shop.weverse.io/en/shop/USD/artists/10'},
  aespa:{name:'aespa',guide:'./guides/aespa.html',official:'https://global.shop.smtown.com/collections/aespa'},
  twice:{name:'TWICE',guide:'./guides/twice.html',official:'https://twiceshop.com/'},
  ive:{name:'IVE',guide:'./guides/ive.html',official:'https://www.starship-square.com/product/list.html?cate_no=57'},
  'le-sserafim':{name:'LE SSERAFIM',guide:'./guides/le-sserafim.html',official:'https://shop.weverse.io/en/shop/USD/artists/50'},
  illit:{name:'ILLIT',guide:'./guides/illit.html',official:'https://shop.weverse.io/en/shop/USD/artists/120'},
  riize:{name:'RIIZE',guide:'./guides/riize.html',official:'https://shop.weverse.io/en/shop/USD/artists/151'}
};

const typeTerms={
  album:['album vinyl','collector edition album','CD photobook'],
  light:['light stick concert','fanlight accessories','concert merch'],
  wear:['tour shirt hoodie','official merch apparel','fan t-shirt'],
  small:['keychain charm','photocard holder','small gift'],
  collect:['plush collectible','figure doll','collector merch']
};

const typeLabels={
  album:'collector & music',
  light:'concert-ready',
  wear:'wearable merch',
  small:'small-gift route',
  collect:'collectible route'
};

function search(q){
  return 'https://www.amazon.com/s?k='+encodeURIComponent(q)+'&tag=unicornmagic2-20';
}

function render(){
  if(!artist||!type||!results)return;
  const a=artists[artist.value];
  const terms=typeTerms[type.value];
  results.innerHTML=
    '<div class="result-head"><strong>'+a.name+' — '+typeLabels[type.value]+'</strong><a href="'+a.guide+'">Open fandom guide →</a></div>'+
    '<div class="finder-note">Start with the <a href="'+a.official+'" target="_blank" rel="noopener noreferrer">official merch source ↗</a> to understand current naming and versions. Then compare marketplace listings carefully.</div>'+
    terms.map((term,i)=>
      '<a class="result-item" target="_blank" rel="sponsored nofollow noopener noreferrer" href="'+search(a.name+' '+term)+'"><strong>'+(i+1)+'. '+a.name+' '+term+'</strong><span>Amazon search ↗</span></a>'
    ).join('')+
    '<p class="small">Paid links. Check the seller, exact version and whether the listing clearly identifies official/licensed merchandise before purchase.</p>';
}

if(button)button.addEventListener('click',()=>{ if(typeof gtag==='function') gtag('event','gift_finder_use',{fandom:artist?.value||'',gift_type:type?.value||'',page_path:location.pathname}); render(); });

document.querySelectorAll('.route-chip').forEach(chip=>{
  chip.addEventListener('click',()=>{
    if(!artist||!type)return;
    artist.value=chip.dataset.artist;
    type.value=chip.dataset.type;
    render();
    document.querySelector('#finder')?.scrollIntoView({behavior:'smooth',block:'start'});
  });
});

render();
