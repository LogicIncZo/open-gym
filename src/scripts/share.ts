import QRCode from "qrcode";

function toast(msg: string) {
  const el = document.createElement("div");
  el.textContent = msg;
  el.className = "og-toast";
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add("is-on"));
  setTimeout(() => {
    el.classList.remove("is-on");
    setTimeout(() => el.remove(), 250);
  }, 1900);
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast("Link copied");
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    toast("Link copied");
  }
}

export function initShare() {
  const roots = Array.from(document.querySelectorAll<HTMLElement>("[data-share]"));
  for (const root of roots) {
    if (root.dataset.shareReady) continue;
    root.dataset.shareReady = "1";

    const urlFor = () => root.dataset.shareUrl || window.location.href;
    const textFor = () => root.dataset.shareText || document.title;

    root.querySelectorAll<HTMLElement>("[data-share-action]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const action = btn.dataset.shareAction;
        if (action === "wa") {
          const msg = `${textFor()}\n${urlFor()}`;
          window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
        } else if (action === "copy") {
          await copy(urlFor());
        } else if (action === "print") {
          window.print();
        } else if (action === "qr") {
          const dialog = root.querySelector<HTMLDialogElement>("dialog[data-qr]");
          const holder = root.querySelector<HTMLElement>("[data-qr-canvas]");
          if (!dialog || !holder) return;
          const dataUrl = await QRCode.toDataURL(urlFor(), {
            margin: 1,
            width: 320,
            color: { dark: "#221f19", light: "#fffdf6" },
          });
          holder.innerHTML = `<img src="${dataUrl}" alt="QR code linking to this page" width="240" height="240">`;
          const label = holder.parentElement?.querySelector("[data-qr-url]");
          if (label) label.textContent = urlFor();
          dialog.showModal();
        }
      });
    });

    root.querySelectorAll<HTMLDialogElement>("dialog[data-qr]").forEach((d) => {
      d.querySelectorAll("[data-qr-close]").forEach((b) => b.addEventListener("click", () => d.close()));
      d.addEventListener("click", (ev) => {
        if (ev.target === d) d.close();
      });
    });
  }
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShare);
  } else {
    initShare();
  }
  document.addEventListener("astro:page-load", initShare);
}
