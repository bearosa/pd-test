import cls from "classnames";
import { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import api from "api";
import add from "assets/add.svg";
import Modal from "components/Modal";

import ListElement from "./ListElement";
import st from "./people-list.module.scss";
import AddPersonForm from "components/forms/AddPersonForm";

const PeopleList = ({people, setPeople, refetch, className}) => {
  const addForm = useRef(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [personToAdd, setPersonToAdd] = useState({})

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const peopleReordered = reorder(
      people,
      result.source.index,
      result.destination.index
    );

    setPeople([...peopleReordered]);
  }

  const handleChange = useCallback((person) => {
    setPersonToAdd(person);
  }, [])

  const handleAddPerson = async() => {
    const isValid = addForm.current.validate();
    if(isValid) {
      const { organization } = personToAdd;
      const { data } = await api().addOrganization(organization)
      
      const person = {...personToAdd, org_id: data.id};
      delete person.organization;

      api().addPerson(person).then(() => {
        setShowAddModal(false);
        refetch();
      })
    }
  }

  const modalContent = () => {
    return <AddPersonForm ref={addForm} onChange={handleChange} />;
  }

  const modalActions = () => {
    return (
      <button data-testid="add-modal-add-button" className={st.addButton} onClick={handleAddPerson}>
        Add person
      </button>
    )
  }

  return (
    <div className={cls(className, st.list)}>
      <button data-testid="add-button" className={st.addButton} onClick={() => setShowAddModal(true)}>
        <img className={st.icon} src={add} alt="add person" />
        Add person
      </button>
      {people.length > 0 ? 
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {provided => (
              <div className={st.listContainer} ref={provided.innerRef} {...provided.droppableProps}>
                {
                  people.map((el, index) => <ListElement person={el} className={st.element} refetch={refetch} index={index} key={el.id} />)
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext> 
      : 
        <div className={st.emptyState}>No people found</div>
      }
      {showAddModal && 
        <Modal 
          data-testid="add-modal"
          onClose={() => setShowAddModal(false)} 
          title="Add Person" 
          actions={modalActions()}>
            {modalContent()}
        </Modal>
      }
    </div>
  )
}

PeopleList.defaultProps = { 
  people: [], 
  setPeople: () => {},
  refetch: () => {},
  className: undefined 
};

PeopleList.propTypes = {
  people: PropTypes.array,
  setPeople: PropTypes.func,
  refetch: PropTypes.func,
  className: PropTypes.string,
};

export default PeopleList;