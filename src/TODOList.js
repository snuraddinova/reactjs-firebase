import React from "react";
import firebase from './firebase'

const style = {
  main: {
    display: "flex", 
    justifyContent: "space-between"
  },
  spell: {
      marginRight: "10px", 
      minWidth: "80px"
  },
}

export const TODOList = ({ spell, onDelete }) => {
  const [name, setName] = React.useState(spell.name);
  const [update, setUpdate] = React.useState(false);

  const onUpdate = () => {
    const db = firebase.firestore()
    db.collection('spells').doc(spell.id).set({...spell, name})
    setUpdate(false);
  }

  const onEdit = () => {
    setUpdate(true);
  }

  return (
    <div style={style.main}>
      <div>
        {update ? <input style = {style.spell} value={name} onChange={e => {setName(e.target.value);}}/> : <span style = {style.spell}>{name}</span>} 
      </div>
      <div>
        {update ? <button onClick={onUpdate}>Update</button> : <button onClick={onEdit}>Edit</button> }
        <button onClick={() => onDelete(spell)}>Delete</button>
      </div>
    </div>
  );
};
