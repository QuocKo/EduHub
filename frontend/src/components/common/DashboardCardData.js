import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

function CardData({ number, name, icon }) {
  return (
    <>
      <div className="cards">
        <div className="name-details">
          <div className="number">{number}</div>
          <div className="name">{name}</div>
        </div>
        <div className="card-icons">{icon}</div>
      </div>
    </>
  );
}

// PropTypes validation
CardData.propTypes = {
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default CardData;
