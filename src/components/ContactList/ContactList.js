import React from "react";
import "./ContactList.css";
import { useDebounce } from 'use-debounce';
import ContactItemMemo from "../ContactItem/ContactItem";

const contactList = React.memo(() => {

  const API_URL = "http://localhost:4000/contacts";

  const [contactList, setContactList] = React.useState([]);
  const [newContact, setNewContact] = React.useState({ name: "", lastname: "",  phone: "", imageUrl: "" });
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState(""); 

  React.useEffect(() => {
    const sum = contactList.reduce((acum, contact) => contact.id ? acum + 1 : acum, 0);
    setTotal(sum);
  }, [contactList]);

  React.useEffect(() => {
    getAllContactsFromApi();
  }, []);

  const [filterWithTime] = useDebounce(filter, 1000);

React.useEffect(() => {

  fetch(`${API_URL}?q=${filterWithTime}`)
    .then((response) => response.json())
    .then((data) => {
      setContactList(data);
    });

}, [filterWithTime]);

  const getAllContactsFromApi = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setContactList(data));
  }

  const deleteContact = React.useCallback((contact) => {
    fetch(`${API_URL}/${contact.id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() => getAllContactsFromApi());
  }, []);

  const addnewContact = (event) => {
    event.preventDefault();

    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(newContact),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(() => {
        getAllContactsFromApi();
        setNewContact({
          name: "",
          lastname: "",
          phone: "",
          imageUrl: "",
        });
      });
  }

  return (
    <div className="contact-linst">
      <h2>Mi agenda ({total})</h2>


      {contactList.map(contact =>
        <ContactItemMemo
          key={contact.id}
          contact={contact}
          deleteItem={deleteContact}
        ></ContactItemMemo>)}

    <h2>Buscar</h2>
       <label>Buscar: </label>
          <input type="text" value={filter} onChange={(event) => setFilter(event.target.value)}></input>

      {/* formulario para añadir contactos */}
      <h2>Añadir nuevo contacto</h2>
      <form onSubmit={(event) => addnewContact(event)}>
        <p>
          <label>Nombre: </label>
          <input type="text" name="name" id="name" value={newContact.name} onChange={(event) => setNewContact({
            ...newContact,
            name: event.target.value,
          })} />
        </p>
        <p>
          <label>Apellidos: </label>
          <input type="text" name="lastname" id="lastname" value={newContact.lastname} onChange={(event) => setNewContact({
            ...newContact,
            lastname: event.target.value,
          })} />
        </p>
        <p>
          <label>Telefono: </label>
          <input type="number" name="phone" id="phone" value={newContact.phone} onChange={(event) => setNewContact({
            ...newContact,
            phone: event.target.value ? parseInt(event.target.value) : '',
          })} />
        </p>
        <p>
          <label>URL de la imagen: </label>
          <input type="text" name="imageUrl" id="imageUrl" value={newContact.imageUrl} onChange={(event) => setNewContact({
            ...newContact,
            imageUrl: event.target.value,
          })} />
        </p>

        <button type="submit">Añadir contacto</button>

      </form>
    </div>
  );

});

export default contactList;