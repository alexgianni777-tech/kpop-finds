(() => {
  const cfg = window.KPOP_ADSENSE || {};
  const publisherId = (cfg.publisherId || "").trim();
  const slots = cfg.slots || {};
  if (!publisherId || !publisherId.startsWith("ca-pub-")) return;

  const active = [...document.querySelectorAll(".ad-slot[data-ad-key]")].filter(node => {
    const slot = (slots[node.dataset.adKey] || "").trim();
    if (!slot) return false;
    node.hidden = false;
    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.dataset.adClient = publisherId;
    ins.dataset.adSlot = slot;
    ins.dataset.adFormat = "auto";
    ins.dataset.fullWidthResponsive = "true";
    node.querySelector(".ad-mount").appendChild(ins);
    return true;
  });

  // The official AdSense verification/Auto Ads script is embedded directly in page <head>.
  // Queue any manual units here; AdSense processes the queue when its async script is ready.
  active.forEach(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) {}
  });
})();
