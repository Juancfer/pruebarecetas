import React from "react";
import "./BookList.css";
import RecipesCardMemo from "../RecipesCard/RecipesCard";
import SelectedRecipe from "../SelectedRecipe/SelectedRecipe";

const bookList = React.memo(() => {

  const API_URL = "http://localhost:4000/recipes";

  const [bookList, setBookList] = React.useState([]);
  const [newBook, setNewBook] = React.useState({ name: "", numPeople: "", imageUrl: "" });
  const [fullRecipe, setFullRecipe] = React.useState({});

  React.useEffect(() => {
    getAllBooksFromApi();
  }, []);

  const getAllBooksFromApi = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setBookList(data));
  }

  const addnewBook = (event) => {
    event.preventDefault();

    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(newBook),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(() => {
        getAllBooksFromApi();
        setNewBook({
          name: "",
          numPeople: "",
          imageUrl: "",
        });
      });
  }

  const clickedRecipe = (id) => {
    const fullRecipe = bookList.filter(element => element.id === id)
      .reduce((obj, item) => Object.assign(obj, item), {});
    setFullRecipe(fullRecipe);
  }

  const addIngredients = (ingredient) => {
    const newRecipe = {
      ...fullRecipe,
      ingredients: [...fullRecipe.ingredients, ingredient]
    }

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe)
    };
    fetch(`${API_URL}/${fullRecipe.id}`, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  const removeIngredients = (ingredients) => {
    const newRecipe = {
      ...fullRecipe,
      ingredients: fullRecipe.ingredients.filter(ingredient => ingredient.name !== ingredients.name)
    }

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe)
    };

    fetch(`${API_URL}/${fullRecipe.id}`, requestOptions).then(response => response.json())
      .then(data => console.log(data));
  }

  return (
    <div className="book-list">

      {/* formulario para añadir recetas */}
      <div className="book-list__form">
        <h2 className="book-list__title">Añade una nueva receta</h2>
        <form onSubmit={(event) => addnewBook(event)}>
          <p className="book-list__text">
            <label>Introduce un nombre: </label>
            <br />
            <input type="text" name="name" id="name" value={newBook.name} onChange={(event) => setNewBook({
              ...newBook,
              name: event.target.value,
            })} />
          </p>
          <p className="book-list__text">
            <label>Introduce el numero de personas: </label>
            <br />
            <input type="number" name="numPeople" id="numPeople" value={newBook.numPeople} onChange={(event) => setNewBook({
              ...newBook,
              numPeople: event.target.value ? parseInt(event.target.value) : '',
            })} />
          </p>
          <p className="book-list__text">
            <label>Introduce la URL de la imagen: </label>
            <br />
            <input type="text" name="imageUrl" id="imageUrl" value={newBook.imageUrl} onChange={(event) => setNewBook({
              ...newBook,
              imageUrl: event.target.value,
            })} />
          </p>
          <button type="submit">Añadir Receta</button>
        </form>
      </div>
      <div className="book-list__cards">
        <h2 className="book-list__title">Listado de Recetas:</h2>

       {bookList.map(recipeCard =>
          <RecipesCardMemo
            key={recipeCard.id}
            recipeCard={recipeCard}
            onClick={(id) => clickedRecipe(id)}
          ></RecipesCardMemo>)}
      </div>
      <div className="book-list__selected">
        <h2 className="book-list__title">Receta seleccionada:</h2>
        {Object.keys(fullRecipe).length > 0 &&
          <SelectedRecipe
            selectedRecipe={fullRecipe}
            onClickAddIngredients={ingredients => addIngredients(ingredients)}
            onClickRemoveIngredients={ingredients => removeIngredients(ingredients)}
          />
        }
      </div>
    </div>
  );

});

export default bookList;