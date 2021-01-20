import cls from "classnames";
import { useState } from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import add from "assets/add.svg";
import Modal from "components/Modal";

import ListElement from "./ListElement";
import st from "./people-list.module.scss";

const PeopleList = ({people, setPeople, className}) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const modalActions = () => {
    return (
      <button className={st.addButton}>
        Add person
      </button>
    )
  }

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


  return (
    <div className={cls(className, st.list)}>
      <button className={st.addButton} onClick={()=>setShowAddModal(true)}>
        <img className={st.icon} src={add} alt="add person" />
        Add person
        </button>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {provided => (
              <div className={st.listContainer} ref={provided.innerRef} {...provided.droppableProps}>
                {
                  people.map((el, index) => <ListElement person={el} className={st.element} index={index} key={el.id} />)
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      <Modal show={showAddModal} onClose={()=>setShowAddModal(false)} title="Add Person" actions={modalActions()}>test</Modal>
    </div>
  )
}

PeopleList.defaultProps = { 
  people: [], 
  setPeople: () => {},
  className: undefined 
};

PeopleList.propTypes = {
  people: PropTypes.array,
  setPeople: PropTypes.func,
  className: PropTypes.string,
};

export default PeopleList;