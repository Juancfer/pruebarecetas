import React from "react";
import IngredientDetail from "../IngredientDetail/IngredientDetail";
import "./SelectedRecipe.css";

const SelectedRecipe = (props) => {
    console.log("Ejecutado render RecipesCard: " + props.selectedRecipe.name);

    const [newIngredients, setNewIngredients] = React.useState({ name: "", quantity: "" });
    const [ingredients, setIngredients] = React.useState()
    
    React.useEffect(() => {
        setIngredients(props.selectedRecipe.ingredients)
    },[props.selectedRecipe])
    
    const deleteIngredient = value => {
        setIngredients(oldValues => {
          return oldValues.filter(ingredient => ingredient.name !== value.name)
        })
        props.onClickRemoveIngredients(value)
    }

    const addIngredients = () => {
        const newIngredient = [...ingredients, newIngredients]

        setIngredients(newIngredient)  

       
    }
    
    return (
        <div className="selectedRecipe-item" key={props.selectedRecipe.id}>
            <img className="selectedRecipe-item__image" src={props.selectedRecipe.imageUrl} alt={"Imagen de " + props.selectedRecipe.name} />
            <div className="selectedRecipe-item__info">
                <p className="selectedRecipe-item__name">{props.selectedRecipe.name}</p>
                <p className="selectedRecipe-item__phone">Numero de personas: {props.selectedRecipe.numPeople}</p>
            </div>
            <div>
                {ingredients && <table className="selectedRecipe-item__table">
                    <tbody>
                        <tr>
                            <th>Ingredientes</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                        {ingredients.map(ingredient => 
                            <IngredientDetail 
                                key={ingredient.name} 
                                ingredients={ingredient}
                                onClick={() => deleteIngredient(ingredient)}
                            />
                        )}
                        <tr>
                            <td>
                                <input className="selectedRecipe-item__input" type="text" name="name" id="name" value={newIngredients.name} onChange={(event) => setNewIngredients({
                                    ...newIngredients,
                                    name: event.target.value,
                                })} />
                            </td>
                            <td>
                                <input className="selectedRecipe-item__input" type="number" name="quantity" id="quantity" value={newIngredients.quantity} onChange={(event) => setNewIngredients({
                                    ...newIngredients,
                                    quantity: event.target.value,
                                })} />
                            </td>
                            <td>
                                <button onClick={() => {
                                    props.onClickAddIngredients(newIngredients)
                                        setNewIngredients({
                                        name: "",
                                        quantity: ""
                                    })
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

export default SelectedRecipe;