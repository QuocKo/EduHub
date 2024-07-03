import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

function NotificationMessage({ messageText, by, time, ProfileImage, onClick }) {
  return (
    <div className="body-section" onClick={onClick}>
      <div className="section">
        <div className="catagory"></div>
        <div className="message" style={{ cursor: "pointer" }}>
          <div className="message_text">{messageText}</div>
          <div className="createdBy">
            <div className="by">{by}</div>
            <span className="breadcrumb">.</span>
            <div className="date">{time}</div>
          </div>
        </div>
        <div className="photo">
          <img src={ProfileImage} alt="Profile Picture" />
        </div>
      </div>
    </div>
  );
}

// PropTypes validation
NotificationMessage.propTypes = {
  messageText: PropTypes.string.isRequired,
  by: PropTypes.string.isRequired,
  time: PropTypes.node.isRequired,
  ProfileImage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NotificationMessage;
