import React from 'react'

const Transaction = ({ transactionInfo, onTransactionDelete }) => {
  const { _id: id, name, from, to } = transactionInfo;
  return (
    <div className='status'>
    <p>Name: { name }</p>
    <p>From: { from.name }</p>
    <p>To: { to.name }</p>
    <button onClick={() => onTransactionDelete(name)}>Delete</button>
</div>
  );
}

export default Transaction;