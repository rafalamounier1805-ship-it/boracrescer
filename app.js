/* Cole aqui TODO o conteúdo que estava 
  dentro da tag <script>...</script> 
  (Menos o Addon do Sheets, que ficaria em sync-addon.js)
*/

/* ====== Util ====== */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
/* ... etc ... */

/* Splash -> Login (6s) + esconder logo do header */
setTimeout(()=>{
  headerActive(true);
  evo(true);
  goto('login');
  bootstrapAvatars();

  const logo = document.querySelector('.hdr-logo');
  if (logo) {
    logo.classList.add('is-hidden'); // Usa classe CSS
    setTimeout(()=>{ logo.style.display = 'none'; }, 650);
  }
}, 6000);

/* ... (todo o resto do seu JS) ... */
