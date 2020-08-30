import React from "react";



function TodoItem({ id, item, onCheck, ids }) {
    return (
        <>
        <li>
            {item}  
            <button onClick={() => {onCheck(id,ids)}} className="deleteItem">X</button>
        </li>
        
        </>
    )
}

export default TodoItem;