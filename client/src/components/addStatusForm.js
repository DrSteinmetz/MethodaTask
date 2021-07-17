import React from 'react';

const AddStatusForm = ({ onStatusAdd }) => {

  const onFormHandle = (event) => {
    event.preventDefault();
    const { statusName } = event.target;
    onStatusAdd({ name: statusName.value, lable: 'Initial' });
  }

  return (
    <form onSubmit={onFormHandle}>
      <input type="text" name="statusName" />
      {/* <select name="statusLable">
        <option value="Initial">Initial</option>
        <option value="Orphan">Orphan</option>
        <option value="Final">Final</option>
      </select> */}
      <input type="submit" value="Add Status" />
    </form>
  );
}

export default AddStatusForm;