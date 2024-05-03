import React from "react";
const CardAnnouncement = (props) => {
  let { title } = props
  return (
    <div className="card m-auto mt-4" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">Thông báo</h5>
        <p className="card-text">{title}</p>
      </div>
    </div>
  );
}

export default CardAnnouncement;