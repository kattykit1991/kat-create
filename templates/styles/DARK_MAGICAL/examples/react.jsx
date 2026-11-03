// Place the full DARK_MAGICAL folder under public/styles/DARK_MAGICAL and load style.css + ui.js in index.html.
import { useId } from 'react';
export default function ReadyStyleExample() {
  const dialogId = useId();
  const titleId = useId();
  const base = import.meta.env.BASE_URL;
  return <main className="kat-ui" data-kat-theme="dark">
    <div className="kat-container kat-stack">
      <h1>Mein Projekt</h1>
      <button type="button" className="kat-button kat-button--primary" data-kat-dialog-open={dialogId}>Notiz öffnen</button>
      <button type="button" className="kat-button" disabled>Nicht verfügbar</button>
      <button type="button" className="kat-button kat-button--icon" aria-label="Suchen">
        <img src={base + 'styles/DARK_MAGICAL/icons/search.svg'} width="24" height="24" alt="" />
      </button>
      <dialog className="kat-dialog" id={dialogId} aria-labelledby={titleId}>
        <form method="dialog"><button type="submit" className="kat-button">Schließen</button></form>
        <h2 id={titleId}>Lokale Notiz</h2>
      </dialog>
    </div>
  </main>;
}
