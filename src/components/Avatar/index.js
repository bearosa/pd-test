import cls from "classnames";

import st from "./avatar.module.scss";

const Avatar = ({className, pictures, firstName, lastName}) => {
  return (
    <div className={cls(className, st.avatar, {[st.noPhoto]: !pictures})}>
      {!!pictures ? 
          <picture>
            <source media="(min-width: 512px)" srcSet={pictures[512]} />
            <img className={st.logo} src={pictures[128]} alt="" />
          </picture>
        : 
          `${firstName.trim().charAt(0).toUpperCase()}${lastName.trim().charAt(0).toUpperCase()}`
      }
    </div>
  )
}

export default Avatar;