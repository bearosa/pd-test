import cls from "classnames";

import Avatar from "components/Avatar";
import organization from "assets/organization.svg";

import st from "./list-element.module.scss";

const ListElement = ({person, className}) => {
  return (
    <div className={cls(className, st.element)}>
      <div className={st.info}>
        <p className={st.name}>{person.name}</p>
        <p className={st.organization}>
          <img className={st.logo} src={organization} alt="organization" />
          {person.org_id.name}
        </p>
      </div>
      <Avatar 
        className={st.avatar}
        pictures={person.picture_id?.pictures} 
        firstName={person.first_name} 
        lastName={person.last_name} />
    </div>
  )
}

export default ListElement;