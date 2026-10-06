(() => {
 const cards = [...document.querySelectorAll('.verified-product')];
 const filters = [...document.querySelectorAll('.catalog-filter')];
 const query = document.getElementById('catalog-query');
 const normalize = text => text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
 const searchable = cards.map(card => normalize([card.dataset.slug, card.querySelector('h3').textContent, ...[...card.querySelectorAll('p,.product-badge')].map(n => n.textContent)].join(' ')));
 let fandom = 'all';
 function render() {
   const words = normalize(query.value).split(' ').filter(Boolean);
   let count = 0;
   cards.forEach((card, index) => {
     const show = (fandom === 'all' || card.dataset.slug === fandom) && words.every(word => searchable[index].includes(word));
     card.hidden = !show; if (show) count++;
   });
   filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === fandom)));
   document.getElementById('catalog-count').textContent = `${count} of ${cards.length} products`;
   const empty = document.getElementById('catalog-empty');
   empty.replaceChildren();
   if (count === 0) {
     const heading = document.createElement('strong'); heading.textContent = 'No matching products';
     const help = document.createElement('p'); help.textContent = 'Try a shorter word, another fandom, or reset both filters.';
     const reset = document.createElement('button'); reset.type = 'button'; reset.id = 'catalog-reset'; reset.textContent = 'Show all products';
     reset.addEventListener('click', () => { query.value = ''; fandom = 'all'; render(); query.focus(); });
     empty.append(heading, help, reset);
   }
   empty.hidden = count !== 0;
 }
 filters.forEach(button => button.addEventListener('click', () => { fandom = button.dataset.filter; render(); }));
 query.addEventListener('input', render);
 document.getElementById('catalog-clear').addEventListener('click', () => { query.value = ''; render(); query.focus(); });
 document.getElementById('catalog-search-controls').hidden = false;
 render();
})();
