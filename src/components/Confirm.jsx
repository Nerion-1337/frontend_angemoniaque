/** Écran de confirmation minimal (enregistrement avec modifications, suppression) :
 *  question + deux choix ; clic sur l'arrière-plan = annuler. */
export default function Confirm({ msg, ok = 'Valider', cancel = 'Annuler', onOk, onCancel }) {
  return <div className="confirm" onClick={onCancel}>
    <div className="ccard" onClick={e => e.stopPropagation()}>
      <p className="cmsg">{msg}</p>
      <div className="crow">
        <button className="primary" onClick={onOk}>{ok}</button>
        <button className="btnlike" onClick={onCancel}>{cancel}</button>
      </div>
    </div>
  </div>;
}
