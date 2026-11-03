/* KATCODED UI 0.1 · optional enhancement for native HTML components.
   No requests, storage, framework, icon loading or user content injection. */
(function(global){
 'use strict';
 if(global.KatUI)return;
 const roots=new WeakSet(),seenClicks=new WeakSet(),seenKeys=new WeakSet();
 function init(root=document){
  if(roots.has(root))return;
  roots.add(root);
  const doc=root.ownerDocument||root;
  const dropdowns=()=>[...root.querySelectorAll('details[data-kat-dropdown][open]')];
  root.addEventListener('click',event=>{
   if(seenClicks.has(event))return;
   seenClicks.add(event);
   const target=event.target.closest?event.target:null;
   if(!target)return;
   dropdowns().forEach(details=>{if(!details.contains(target))details.open=false;});
   const toggle=target.closest('button[data-kat-toggle]');
   if(toggle&&!toggle.disabled){toggle.setAttribute('aria-pressed',String(toggle.getAttribute('aria-pressed')!=='true'));}
   const opener=target.closest('button[data-kat-dialog-open]');
   if(opener&&!opener.disabled){
    const dialog=doc.getElementById(opener.dataset.katDialogOpen);
    if(dialog&&typeof dialog.showModal==='function'&&!dialog.open)dialog.showModal();
   }
   const closer=target.closest('button[data-kat-dialog-close]');
   if(closer&&!closer.disabled){const dialog=closer.closest('dialog');if(dialog)dialog.close();}
   const link=target.closest('.kat-menu a[href]');
   if(link){const details=link.closest('details[data-kat-dropdown]');if(details)details.open=false;}
  });
  root.addEventListener('keydown',event=>{
   if(seenKeys.has(event))return;
   seenKeys.add(event);
   const target=event.target.closest?event.target:null;
   if(!target)return;
   const details=target.closest('details[data-kat-dropdown]');
   if(!details)return;
   const summary=details.querySelector('summary');
   if(event.key==='Escape'&&details.open){event.preventDefault();details.open=false;summary.focus();return;}
   if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;
   const items=[...details.querySelectorAll('.kat-menu a[href],.kat-menu button:not(:disabled)')].filter(el=>!el.hidden);
   if(!items.length)return;
   event.preventDefault();
   details.open=true;
   const index=items.indexOf(doc.activeElement);
   const next=event.key==='Home'?0:event.key==='End'?items.length-1:index===-1?(event.key==='ArrowUp'?items.length-1:0):(index+(event.key==='ArrowDown'?1:-1)+items.length)%items.length;
   items[next].focus();
  });
 }
 global.KatUI={version:'0.1.0',init};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>init(),{once:true});else init();
})(window);
