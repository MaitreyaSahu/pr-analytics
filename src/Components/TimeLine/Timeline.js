import React from "react";
import PropTypes from "prop-types";
import "./Timeline.css";

export const Timeline = ({ events }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="swiper-container">
          <div className="swiper-wrapper timeline">
            {events.map((event, index) => (
              <div className="swiper-slide" key={index}>
                <div className="timestamp">
                  <span className="date">
                    {new Date(event.date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </span>
                </div>
                <div className="status">
                  <span>{event.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
};

Timeline.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};
