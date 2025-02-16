import cls from "classnames";
import { useState } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

import api from "api";
import organization from "assets/organization.svg";
import Avatar from "components/Avatar";
import Modal from "components/Modal";

import st from "./list-element.module.scss";

const ListElement = ({person, index, refetch, className}) => {
  //consts (custom fields)
  const assistant = "bff2c8b4ca9b3591be6f56b61108531ffcdb4a61";
  const groups = "b0cc020463afa8d79510c0f9c577b85163ce4a55";

  //state
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //modals content and actions
  const infoModalContent = () => {
    //render
    return (
      <div className={st.modalContent}>
        <Avatar className={st.modalAvatar}
          pictures={person.picture_id?.pictures} 
          firstName={person.first_name} 
          lastName={person.last_name} />
          <p className={st.name}>{person.name}</p>
          <p className={st.phone}>{person.phone[0].value}</p>
        <div className={st.additionalInfo}>
          <p>Email</p>
          <p>{person.email[0].value}</p>
          <p>Organization</p>
          <p>{person.org_name}</p>
          {person[assistant] && 
            <>
              <p>Assistant</p>
              <p>{person[assistant]}</p>
            </>
          }
          {person[groups] && 
            <>
              <p>Groups</p>
              <p>{person[groups]}</p>
            </>
          }
          <p>Location</p>
          <p>{person.org_id?.address}</p>
        </div>
      </div>
    )
  }

  const infoModalActions = () => {
    //handlers
    const handleOnClick = () => {
      setShowInfoModal(false);
      setShowDeleteModal(true);
    }

    //render
    return (
      <button data-testid="info-modal-delete-button" onClick={handleOnClick} className={st.deleteButton}>
        delete person
      </button>
    )
  }

  const deleteModalContent = () => {
    //render
    return (
      <div className={st.modalContent}>
        You're about to delete <strong>{person.name}</strong>. Are you sure?
      </div>
    )
  }

  const deleteModalActions = () => {
    //handlers
    const handleOnBack = () => {
      setShowDeleteModal(false);
      setShowInfoModal(true);
    }

    const handleOnDelete = () => {
      api().deletePerson({id: person.id}).then(() => refetch())
    }

    //render
    return (
      <>
        <button data-testid="delete-modal-back-button"  onClick={handleOnBack} className={st.backButton}>
          back
        </button>
        <button data-testid="delete-modal-delete-button" onClick={handleOnDelete} className={st.deleteButton}>
          delete person
        </button>
      </>
    )
  }

  //render
  return (
    <>
      <Draggable draggableId={person.id.toString()} index={index}>
        {provided => (
          <div 
            data-testid="list-element"
            className={cls(className, st.element)} 
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            <div className={st.info}>
              <button data-testid="list-element-name" className={st.name} onClick={() => setShowInfoModal(true)}>{person.name}</button>
              <p className={st.organization}>
                <img className={st.logo} src={organization} alt="organization" />
                {person.org_name}
              </p>
            </div>
            <Avatar 
              data-testid="avatar"
              className={st.avatar}
              pictures={person.picture_id?.pictures} 
              firstName={person.first_name} 
              lastName={person.last_name}
              onClick={() => setShowInfoModal(true)} />
          </div>
        )}
            
      </Draggable>
      {showInfoModal && 
        <Modal 
          data-testid="info-modal"
          onClose={() => setShowInfoModal(false)} 
          title="Person Information" 
          actions={infoModalActions()}>
          {infoModalContent()}
        </Modal>
      }
      {showDeleteModal && 
        <Modal 
          data-testid="delete-modal"
          onClose={() => setShowDeleteModal(false)} 
          title="Delete Person" 
          actions={deleteModalActions()}>
          {deleteModalContent()}
        </Modal>
      }
    </>    
  )
}

ListElement.defaultProps = { 
  className: undefined,
  refetch: () => {}, 
  index: 0,
};

ListElement.propTypes = {
  person: PropTypes.object.isRequired,
  index: PropTypes.number,
  className: PropTypes.string,
  refetch: PropTypes.func,
};

export default ListElement;