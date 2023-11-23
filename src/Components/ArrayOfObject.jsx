import React, { useCallback, useState } from 'react';

export default function ArrayOfObject() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0); // Start with index 0

  const [count, setCount] = useState(2);
  const [data, setData] = useState([
    {
      id: 1,
      name: "kalash"
    },
    {
      id: 2,
      name: "bharti"
    }
  ]);

  const addElement = useCallback(() => {
    const temp = count + 1;
    setCount(temp);
    const newElement = {
      id: temp,
      name: text
    };

    const newData = [...data, newElement];
    setData(newData);
  }, [setCount, setData, count, text, data]);

  const editElement = useCallback(() => {
    const updatedData = data.map((item, i) => {
      if (i === index) {
        return { ...item, name: text };
      }
      return item;
    });

    setData(updatedData);
  }, [setData, index, text, data]);

  const deleteElement = useCallback(() => {
    // delete indexed object in array data
    const updatedData = data.filter((item, i) => i !== index);
    setData(updatedData);
  }, [setData, index, data]);

  return (
    <div>
      <h2>Enter any text</h2>
      <input type="number" onInput={(e) => setIndex(parseInt(e.target.value))} />
      <input type="text" onInput={(e) => setText(e.target.value)} />

      <button onClick={addElement}>Add Element</button>
      <button onClick={editElement}>Edit Element</button>
      <button onClick={deleteElement}>DELETE Element</button>
      <ul>
        {data.map((e) => {
          return <li key={e.id}>id: {e.id} name: {e.name}</li>
        })}
      </ul>
    </div>
  );
}
