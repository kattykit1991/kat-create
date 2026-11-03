/* EAVA technical event delegation: works with static HTML and later React/Vite mounts. */
(function(global){'use strict';if(global.EavaUI)return;
 const openers=new WeakMap();
 document.addEventListener('click',event=>{const target=event.target.closest?event.target:null;if(!target)return;
 const opener=target.closest('button[data-pack-dialog]');if(opener&&!opener.disabled){const dialog=document.getElementById(opener.dataset.packDialog);if(dialog&&typeof dialog.showModal==='function'&&!dialog.open){openers.set(dialog,opener);dialog.showModal();}}
 const closer=target.closest('button[data-pack-close]');if(closer&&!closer.disabled){const dialog=closer.closest('dialog');if(dialog)dialog.close();}
 const toggle=target.closest('button[data-eava-toggle]');if(toggle&&!toggle.disabled)toggle.setAttribute('aria-pressed',String(toggle.getAttribute('aria-pressed')!=='true'));
 });
 document.addEventListener('close',event=>{const opener=openers.get(event.target);if(opener&&opener.isConnected)opener.focus();},true);
 document.addEventListener('submit',event=>{const form=event.target.closest?.('form[data-pack-form]');if(!form)return;event.preventDefault();if(!form.reportValidity())return;const status=form.querySelector('[data-pack-status]');if(status)status.textContent='Eingaben lokal geprüft. Es wurde nichts versendet.';});
 document.addEventListener('reset',event=>{const form=event.target.closest?.('form[data-pack-form]');const status=form?.querySelector('[data-pack-status]');if(status)status.textContent='Bereit zur lokalen Prüfung.';});
 global.EavaUI={version:'1.0.0'};
})(window);
