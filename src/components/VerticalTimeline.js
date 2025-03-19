import React from "react";
import "./VerticalTimeline.css";

const VerticalTimeline = ({ events }) => {
  return (
    <div className="timeline-container">
      <div className="timeline">
        {events.map((event, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <time className="timeline-date">{event.date}</time>
                <h3 className="timeline-title">{event.title}</h3>
              </div>
              <p className="timeline-description">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalTimeline;
