import React from 'react';

function Status(props) {
  return (
    <div className={`status ${props.visi}`}>
      {props.visi === "visible" ? (
        <div className="alert">
          <p>Try reloading the page inside the topic to remove any discrepancy.</p>
        </div>
      ) : (
        <div className="h-4 bg-transparent border-transparent" role="alert"></div>
      )}
    </div>
  );
}

export default Status;
