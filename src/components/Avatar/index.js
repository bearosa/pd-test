import cls from "classnames";
import PropTypes from "prop-types";

import st from "./avatar.module.scss";

const Avatar = ({className, pictures, firstName, lastName, ...props}) => {
  return (
    <div className={cls(className, st.avatar, {[st.noPhoto]: !pictures})} {...props} >
      {!!pictures ? 
          <picture>
            <source media="(min-width: 512px)" srcSet={pictures[512]} />
            <img className={st.logo} src={pictures[128]} alt={firstName} />
          </picture>
        : 
          `${firstName?.trim().charAt(0).toUpperCase()}${lastName ? lastName.trim().charAt(0).toUpperCase() : ""}`
      }
    </div>
  )
}

Avatar.defaultProps = { 
  className: undefined,
  pictures: undefined,
  firstName: undefined,
  lastName: undefined
};

Avatar.propTypes = {
  className: PropTypes.string,
  pictures: PropTypes.object,
  firstName: PropTypes.string,
  lastName: PropTypes.string
};

export default Avatar;