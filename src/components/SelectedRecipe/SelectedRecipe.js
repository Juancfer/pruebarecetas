import React from "react";
import IngredientDetail from "../IngredientDetail/IngredientDetail";
import "./SelectedRecipe.css";

const SelectedRecipe = (props) => {
    console.log("Ejecutado render RecipesCard: " + props.selectedRecipe.name);
    const nameRef = React.useRef(null)
    const quantityRef = React.useRef(null)

    const deleteIngredient = value => {
        const newRecipe = {
            ...props.selectedRecipe,
            ingredients: [...props.selectedRecipe.ingredients]
        }
       newRecipe.ingredients = newRecipe.ingredients.filter(ingredient => ingredient.name !== value.name)
        props.onClickRemoveIngredients(newRecipe)
    }

    const addIngredients = () => {
        const newIngredient = {
            name: nameRef.current.value,
            quantity: quantityRef.current.value
        }
        const newRecipe = {
            ...props.selectedRecipe,
            ingredients: [...props.selectedRecipe.ingredients]
        }
        newRecipe.ingredients.push(newIngredient)
        props.onClickAddIngredients(newRecipe)

        nameRef.current.value = ""
        quantityRef.current.value = ""
    }
    
    return (
        <div className="selectedRecipe-item" key={props.selectedRecipe.id}>
            <img className="selectedRecipe-item__image" src={props.selectedRecipe.imageUrl} alt={"Imagen de " + props.selectedRecipe.name} />
            <div className="selectedRecipe-item__info">
                <p className="selectedRecipe-item__name">{props.selectedRecipe.name}</p>
                <p className="selectedRecipe-item__phone">Numero de personas: {props.selectedRecipe.numPeople}</p>
            </div>
            <div>
                {props.selectedRecipe.ingredients && <table className="selectedRecipe-item__table">
                    <tbody>
                        <tr>
                            <th>Ingredientes</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                        {props.selectedRecipe.ingredients.map(ingredient => 
                            <IngredientDetail 
                                key={ingredient.name} 
                                ingredients={ingredient}
                                onClick={() => deleteIngredient(ingredient)}
                            />
                        )}
                        <tr>
                            <td>
                                <input ref={nameRef} className="selectedRecipe-item__input" type="text" name="name" id="name" />
                            </td>
                            <td>
                                <input ref={quantityRef} className="selectedRecipe-item__input" type="text" name="quantity" id="quantity" />
                            </td>
                            <td>
                                <button onClick={() => {
                                    addIngredients()
                                }} type="button">Añadir</button>
                            </td>
                        </tr>
                    </tbody>
                </table>}
            </div>
        </div>
    );
}

const SelectedRecipeMemo = React.memo(SelectedRecipe);
export default SelectedRecipeMemo;