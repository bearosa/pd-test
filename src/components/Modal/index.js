import cls from "classnames";
import PropTypes from "prop-types";

import close from "assets/close.svg";

import st from "./modal.module.scss";

const Modal = ({className, children, show, onClose, title, actions}) => {
  const handleClose = ev => {
    ev.stopPropagation();
    onClose();
  }

  return (
    <div className={cls(st.overlay, {[st.show]: show})} onClick={handleClose}>
      <div className={cls(className, st.modal)}>
        <div className={st.titleContainer}>
          <p className={st.title}>{title}</p>
          <button className={st.closeButton} onClick={handleClose}>
            <img src={close} alt="close" className={st.closeIcon} />
          </button>
        </div>
        <div className={st.content}>{children}</div>
        <div className={st.actions}>{actions}</div>
      </div>
    </div>
  )
}

Modal.defaultProps = {
  className: undefined,
};

Modal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default Modal;