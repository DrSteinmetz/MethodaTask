import React from 'react';

const AddTransactionForm = ({ statuses, onTransactionAdd }) => {

  const onFormHandle = (event) => {
    event.preventDefault();
    const { transactionName, from, to } = event.target;
    console.log(transactionName, from, to);
    onTransactionAdd({ name: transactionName.value, from: from.value, to: to.value });
  }

  const options = statuses.map(status => <option value={status._id}>{status.name}</option>);
  return (
    <form onSubmit={onFormHandle}>
      <input type="text" name="transactionName" />
      <select name="from">{options}</select>
      <select name="to">{options}</select>
      <input type="submit" value="Add Transaction" />
    </form>
  );
}

export default AddTransactionForm;
