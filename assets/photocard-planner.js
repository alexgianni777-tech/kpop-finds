// A local text download keeps the calculated list usable away from this page.
function addPlanDownload(result, title, filename, source) {
  const text = title + '\n\n' + result.innerText + '\n\nSource: ' + source + '\nEstimates only. Check sizes, quantities and current retailer details before buying.\n';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'button pc-button plan-download';
  button.textContent = 'Download shopping list (.txt)';
  button.addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([text], {type: 'text/plain;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    // Allow the browser to start reading the file before releasing the object URL.
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  });
  result.append(button);
}

(() => {
  function calculate(cards, spare, slots, pack) {
    if (![cards, spare, slots, pack].every(Number.isInteger) || cards < 1 || cards > 100000 || spare < 0 || spare > 100000 || ![4, 8, 9, 18].includes(slots) || pack < 1 || pack > 10000) return null;
    const target = cards + spare;
    const sheets = Math.ceil(target / slots);
    return { target, sheets, spaces: sheets * slots, packs: Math.ceil(target / pack), sleeves: Math.ceil(target / pack) * pack };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = calculate;
  if (typeof document === 'undefined') return;
  const form = document.getElementById('pc-form');
  const result = document.getElementById('pc-result');
  const print = document.getElementById('pc-print');
  function update(event) {
    if (event) event.preventDefault();
    const values = ['cards', 'spare', 'slots', 'pack'].map(id => Number(document.getElementById('pc-' + id).value));
    if (!form.reportValidity()) return;
    const plan = calculate(...values);
    if (!plan) return;
    result.replaceChildren();
    const heading = document.createElement('strong');
    heading.textContent = `${plan.sheets} sheets · ${plan.packs} sleeve packs`;
    const details = document.createElement('p');
    details.textContent = `Plan for ${values[0]} cards + ${values[1]} future cards: ${plan.target} total. Your sheets provide ${plan.spaces} slots (${plan.spaces - plan.target} beyond your plan). Your packs provide ${plan.sleeves} sleeves (${plan.sleeves - plan.target} beyond your plan).`;
    const check = document.createElement('p');
    check.textContent = 'Check pocket dimensions, ring spacing and binder sheet capacity before buying. Sleeve counts assume one sleeve per planned card; double-sleeving needs a separate inner and outer sleeve supply.';
    result.append(heading, details, check);
    const next = document.createElement('p');
    next.textContent = plan.target <= 360
      ? `Your ${plan.target}-card plan is within the 360-slot count of the fixed-page binder example below. Pocket fit still needs checking. Its pages are included, so do not buy ${plan.sheets} refill sheets for that binder.`
      : `Your ${plan.target}-card plan exceeds the 360-slot binder example by ${plan.target - 360} cards. Compare a larger suitable setup or split the collection; do not order one 360-slot binder expecting it to hold the whole plan.`;
    const compare = document.createElement('a');
    compare.href = plan.target <= 360 ? '#binder-example' : '#choose-storage';
    compare.className = 'pc-button';
    compare.textContent = plan.target <= 360 ? 'Check the binder example and Amazon link' : 'Compare storage formats before buying';
    const sizing = document.createElement('a');
    sizing.href = '#size-guide'; sizing.textContent = 'Check sleeve and pocket sizes';
    const actions = document.createElement('p');
    actions.append(compare, document.createTextNode(' · '), sizing);
    result.append(next, actions);
    result.hidden = false; print.hidden = false;
    addPlanDownload(result, "Photocard storage shopping list", "photocard-shopping-list.txt", "https://kpopfinds.online/guides/kpop-photocard-binder-guide.html");
  }
  form.addEventListener('submit', update);
  form.addEventListener('input', () => { result.hidden = true; print.hidden = true; });
  print.addEventListener('click', () => window.print());
  update();
})();


// Saving is opt-in and stays in this browser; no plan values are sent to a server.
(() => {
  if (typeof document === 'undefined') return;
  const form = document.getElementById('pc-form');
  if (!form) return;
  const key = 'kpop-photocard-calculator-v1';
  const fields = [...form.querySelectorAll('input[id], select[id]')]
    .filter(field => field.type === 'number' || field.tagName === 'SELECT');
  const panel = document.createElement('section');
  panel.className = 'plan-save-controls';
  panel.setAttribute('aria-label', 'Save your calculator');
  const help = document.createElement('p');
  help.textContent = 'Coming back later? Save your calculator values in this browser. Checklist ticks are not saved. Nothing is uploaded; clearing browser data removes the saved plan.';
  const save = document.createElement('button');
  save.type = 'button'; save.className = 'button'; save.textContent = 'Save calculator';
  const forget = document.createElement('button');
  forget.type = 'button'; forget.className = 'button'; forget.textContent = 'Forget saved calculator';
  const status = document.createElement('p');
  status.setAttribute('role', 'status');
  panel.append(help, save, document.createTextNode(' '), forget, status);
  form.after(panel);
  const style = document.createElement('style');
  style.textContent = '.plan-save-controls{margin:1rem 0;padding:1rem;border:1px solid currentColor;border-radius:12px}.plan-save-controls button{margin:.25rem;min-height:44px}.plan-save-controls p{margin:.5rem 0}@media print{.plan-save-controls,.plan-download{display:none}}';
  document.head.append(style);
  let saved = false;
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const data = JSON.parse(raw);
      if (data.version !== 1 || !data.values || typeof data.values !== 'object') throw new Error('Invalid saved plan');
      const originals = fields.map(field => field.value);
      for (const field of fields) {
        const val = data.values[field.id];
        if (typeof val !== 'string' || val.length > 32) continue;
        if (field.tagName === 'SELECT' && ![...field.options].some(option => option.value === val)) continue;
        if (field.type === 'number' && val !== '' && !Number.isFinite(Number(val))) continue;
        field.value = val;
      }
      if (!form.checkValidity()) {
        fields.forEach((field, index) => { field.value = originals[index]; });
        throw new Error('Invalid saved plan');
      }
      form.dispatchEvent(new Event('input', {bubbles: true}));
      form.dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));
      saved = true;
      status.textContent = 'Saved calculator restored. Save again after changing values.';
    }
  } catch (_) {
    status.textContent = 'The saved calculator could not be restored. You can still calculate and print.';
  }
  save.addEventListener('click', () => {
    if (!form.reportValidity()) return;
    try {
      localStorage.setItem(key, JSON.stringify({version: 1, values: Object.fromEntries(fields.map(field => [field.id, field.value]))}));
      saved = true;
      status.textContent = 'Saved in this browser. Return to this page to continue.';
    } catch (_) {
      status.textContent = 'This browser could not save the calculator. Print your plan to keep a copy.';
    }
  });
  forget.addEventListener('click', () => {
    try {
      localStorage.removeItem(key);
      saved = false;
      status.textContent = 'Saved copy removed. Your current values stay on screen until you leave.';
    } catch (_) {
      status.textContent = 'The saved copy could not be removed. Use your browser settings to clear this site’s data.';
    }
  });
  form.addEventListener('input', () => {
    if (saved) status.textContent = 'Changes are not saved yet. Select Save calculator to keep them.';
  });
})();
