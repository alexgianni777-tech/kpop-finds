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
    result.hidden = false; print.hidden = false;
  }
  form.addEventListener('submit', update);
  form.addEventListener('input', () => { result.hidden = true; print.hidden = true; });
  print.addEventListener('click', () => window.print());
  update();
})();
