import React from "react";
import "./RecipesCard.css";

const RecipesCard = (props) => {
  console.log("Ejecutado render RecipesCard: " + props.recipeCard.name);

  return (
    <div 
      className="recipeCard-item" 
      key={props.recipeCard.id} 
      onClick={() => props.onClick(props.recipeCard.id)}
    >
      <img className="recipeCard-item__image" src={props.recipeCard.imageUrl} alt={"Imagen de " + props.recipeCard.name} />
      <div className="recipeCard-item__info">
        <p className="recipeCard-item__name">{props.recipeCard.name}</p>
        <p className="recipeCard-item__phone">Numero de personas: {props.recipeCard.numPeople}</p>
        {/* <button className="recipeCard-item__delete-button" onClick={() => props.deleteItem(props.recipeCard)}>ELIMINAR</button>*/}
      </div>
    </div>
  );
}

const RecipesCardMemo = React.memo(RecipesCard);

export default RecipesCardMemo;