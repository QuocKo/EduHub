import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import * as MdIcons from "react-icons/md";
import { useDispatch } from "react-redux";

function CustomConfirm({
  title,
  msg,
  trueActivity,
  falseActivity,
  id,
  setDelete,
  PeformDelete,
  reverse = false,
  user,
}) {
  const dispatch = useDispatch();

  const doAction = () => {
    reverse
      ? dispatch(PeformDelete(id, true))
      : user
      ? dispatch(PeformDelete(id, user))
      : dispatch(PeformDelete(id));
    setDelete(false);
  };

  return (
    <React.Fragment>
      <div className="dialog-ovelay">
        <div className="dialog">
          <header>
            <h3>{title}</h3>
            <MdIcons.MdClose
              className="fa-close"
              onClick={() => setDelete(false)}
            />
          </header>

          <div className="dialog-msg">
            <p>{msg}</p>
          </div>
          <footer>
            <div className="controls">
              <button className="button button-danger" onClick={doAction}>
                {trueActivity}
              </button>
              <button
                className="button button-false"
                onClick={() => setDelete(false)}
              >
                {falseActivity}
              </button>
            </div>
          </footer>
        </div>
      </div>
    </React.Fragment>
  );
}

// PropTypes validation
CustomConfirm.propTypes = {
  title: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  trueActivity: PropTypes.string.isRequired,
  falseActivity: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setDelete: PropTypes.func.isRequired,
  PeformDelete: PropTypes.func.isRequired,
  reverse: PropTypes.bool,
  user: PropTypes.string,
};

export default CustomConfirm;
