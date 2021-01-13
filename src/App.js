import React from "react";
import "./App.css";
import firebase from "./firebase";
import { TODOList } from "./TODOList";

function App() {
  const [spells, setSpells] = React.useState([]);
  const [newSpellName, setNewSpellName] = React.useState('');  
  
  const fetchData = async () => {
    const db = firebase.firestore();
    const data = await db.collection("spells").get();
    setSpells(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const onCreate = async () => {
    if(newSpellName !== null && newSpellName !== undefined && newSpellName.length > 0){
      const db = firebase.firestore();
      const spell = await db.collection("spells").add({ name: newSpellName });
      setSpells( spells => [...spells, {id: spell.id, name: newSpellName}])
      setNewSpellName('');
    }
  };

  const onDelete = spell => {
    const db = firebase.firestore()
    db.collection('spells').doc(spell.id).delete();
    const newSpells = spells.filter(s => {
        return s.id !== spell.id;
    });
    setSpells(newSpells);
  }

  return (
    <>
    <h1 style={{textAlign: "center"}}>TODO</h1>
    <div style={{display:"flex", justifyContent: "space-around" }}>
        <div>
            <input
            name="inTodo"
            value={newSpellName}
            onChange={e => {setNewSpellName(e.target.value)}}
          />
          <button onClick={onCreate}>Create</button>
        </div>
        <div>
         <ul>
        {spells.map(spell => (
        <li key={spell.id}>
          <TODOList spell={spell} onDelete={onDelete} />
        </li>
      ))}
        </ul>
        </div>
    </div>
    </>      
  );
}

export default App;
