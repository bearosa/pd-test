import cls from "classnames";
import PropTypes from "prop-types";

import close from "assets/close.svg";

import st from "./modal.module.scss";

const Modal = ({className, children, onClose, title, actions, 'data-testid': dataTestId}) => {
  //handlers
  const handleClose = ev => {
    ev.stopPropagation();
    onClose();
  }

  //render
  return (
    <div className={cls(st.overlay)} data-testid={dataTestId || "modal"}>
      <div className={cls(className, st.modal)}>
        <div className={st.titleContainer}>
          <p className={st.title}>{title}</p>
          <button data-testid="close-button" className={st.closeButton} onClick={handleClose}>
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
  'data-testid': undefined,
  className: undefined,
  children: <></>,
  show: false,
  onClose: () => {},
  title: undefined,
};

Modal.propTypes = {
  'data-testid': PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string
};

export default Modal;