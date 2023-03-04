import React from "react";
import "./IngredientDetail.css";


const IngredientDetail = (props) => {
    return (
        <tr>
            <td>{props.ingredients.name}</td>
            <td>{props.ingredients.quantity}</td>
            <td>
                <button 
                    onClick={() => props.onClick()} 
                    type="button"
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}

export default IngredientDetail;