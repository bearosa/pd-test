import ListElement from "./ListElement";
import cls from "classnames";

import st from "./people-list.module.scss";

const PeopleList = ({people, className}) => {
  return (
    <div className={cls(className, st.list)}>
      {
        people.map(el => <ListElement person={el} className={st.element} key={el.id} />)
      }
    </div>
  )
}

export default PeopleList;