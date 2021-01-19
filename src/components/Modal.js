import './Modal.css';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

function Modal({title, message, close}) {
  return (
    <div className="modal">
      <div className={modal__header}>
        <h3>{title}</h3>
        <CloseRoundedIcon style={{fontSize: 24}} onClick={close}/>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default Modal;
