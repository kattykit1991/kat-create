/* Local asset index only: no fetch, no storage, no dependency. */
'use strict';
const search=document.getElementById('asset-search'),category=document.getElementById('asset-category'),count=document.getElementById('asset-count');
function filter(){const term=search.value.trim().toLocaleLowerCase('de');let visible=0;document.querySelectorAll('[data-asset]').forEach(item=>{const show=item.dataset.search.includes(term)&&(category.value==='all'||category.value===item.dataset.category);item.hidden=!show;if(show)visible++;});count.textContent=visible+' Assetdateien'+(visible===0?' · Keine Treffer.':'');}
search.addEventListener('input',filter);category.addEventListener('change',filter);filter();
