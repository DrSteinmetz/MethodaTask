import React from 'react'

const Status = ({ statusInfo, onStatusDelete }) => {
  const { _id: id, name, lable } = statusInfo;
  return (
    <div className='status'>
      <p>Name: { name }</p>
      <p>Label: { lable }</p>
      <button onClick={() => onStatusDelete(id)}>Delete</button>
  </div>
  );
}

export default Status;
