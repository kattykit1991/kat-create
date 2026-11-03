// Place the complete EAVA folder under public/styles/EAVA; load its entry files in index.html.
import { useEffect, useId } from 'react';
export default function EavaExample() {
  const dialogId = useId();
  const titleId = useId();
  useEffect(() => { window.EavaTheme?.sync(); }, []);
  return <main className="eava-container eava-stack">
    <h1>Mein Projekt</h1>
    <label className="eava-field">Darstellung
      <select data-eava-theme defaultValue="system">
        <option value="system">System</option><option value="light">Hell</option><option value="dark">Dunkel</option>
      </select>
    </label>
    <button type="button" className="eava-button eava-button--primary" data-pack-dialog={dialogId}>Notiz öffnen</button>
    <button type="button" className="eava-button" disabled>Nicht verfügbar</button>
    <dialog className="eava-dialog" id={dialogId} aria-labelledby={titleId}>
      <h2 id={titleId}>Eigene Notiz</h2><button type="button" className="eava-button" data-pack-close>Schließen</button>
    </dialog>
  </main>;
}
