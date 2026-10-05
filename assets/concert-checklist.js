(() => {
 const key = 'kpop-concert-checklist-v1';
 const items = [...document.querySelectorAll('[data-concert-item]')];
 const status = document.getElementById('concert-progress');
 const storage = document.getElementById('concert-storage');
 let canSave = true;
 try {
   const saved = JSON.parse(localStorage.getItem(key) || '[]');
   if (Array.isArray(saved)) items.forEach(item => { item.checked = saved.includes(item.id); });
   storage.textContent = 'Ticks are saved only in this browser on this device. Clear them when planning a new concert.';
 } catch (_) { canSave = false; storage.textContent = 'Browser saving is unavailable. You can still use and print this checklist during this visit.'; }
 function update(save) {
   const checked = items.filter(item => item.checked);
   status.textContent = `${checked.length} of ${items.length} steps checked${checked.length === items.length ? ' — checklist complete.' : ''}`;
   document.getElementById('concert-meter').value = checked.length;
   if (save && canSave) {
     try { localStorage.setItem(key, JSON.stringify(checked.map(item => item.id))); }
     catch (_) { canSave = false; storage.textContent = 'Browser saving is unavailable. You can still use and print this checklist during this visit.'; }
   }
 }
 items.forEach(item => item.addEventListener('change', () => update(true)));
 document.getElementById('concert-reset').addEventListener('click', () => { items.forEach(item => { item.checked = false; }); update(true); });
 document.getElementById('concert-print').addEventListener('click', () => window.print());
 update(false);
})();
