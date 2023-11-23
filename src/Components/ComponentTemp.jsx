import React, { useCallback, useEffect, useState } from 'react';

export default function ComponentTemp() {
  const [val, setVal] = useState([{text:"text"}]);
  const [index, setIndex] = useState(1);
  const [del, setDel] = useState(0);
  const [update, setUpdate] = useState(0);

  const handler = useCallback(() => {
    setIndex(index + 1);
    setVal((prevVal) => [...prevVal, {text:index}]);
  }, [index]);

  const deleteHandle = useCallback(() => {
    const updatedItems = [...val];
    updatedItems.splice(del, 1); // Specify the index and the number of elements to remove

    // Update the state with the new array
    setVal(updatedItems);
  }, [del, val]);

  const upDateTextAt = useCallback(() => {
    const updatedItems = [...val];
    setIndex(index + 1);
    updatedItems.splice(update, 0, {text:index}); // Insert the value at the specified index
    setVal(updatedItems);
  }, [update, val]);
  

  
  useEffect(() => {
    console.log(val);
  }, [val]);

  return (
    <div style={{ color: "white" }}>
      <button onClick={handler}>Add</button>
      <input type="number" onInput={(e) => setDel(e.target.value)} />
      <button onClick={deleteHandle}>Delete</button>

      <input type="number" onInput={(e) => setUpdate(e.target.value)} />
      <button onClick={upDateTextAt}>insert At</button>

      <ul>
        {val.map((e, index) => {
          return <li key={e.id }>{e.text}</li>;
        })}
      </ul>
    </div>
  );
}
