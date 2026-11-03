/* EAVA only. No brand dependency. Load before CSS if mode persistence is wanted. */
(function(global){'use strict';
 if(global.EavaTheme)return;
 const root=document.documentElement;const key='eava-theme';
 let choice=['light','dark'].includes(root.dataset.theme)?root.dataset.theme:'system';
 try{const saved=localStorage.getItem(key);if(['light','dark'].includes(saved))choice=saved;}catch{}
 function sync(){document.querySelectorAll('select[data-eava-theme]').forEach(select=>{select.value=choice;});}
 function apply(){if(choice==='system')root.removeAttribute('data-theme');else root.dataset.theme=choice;sync();}
 apply();document.addEventListener('change',event=>{const select=event.target.closest?.('select[data-eava-theme]');if(!select||!['system','light','dark'].includes(select.value))return;choice=select.value;apply();try{if(choice==='system')localStorage.removeItem(key);else localStorage.setItem(key,choice);}catch{}});
 global.EavaTheme={sync,getChoice:()=>choice};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sync,{once:true});else sync();
})(window);
