import React from "react";
import "./ContactItem.css";

const ContactItem = (props) => {
  console.log("Ejecutado render contactItem: " + props.contact.name);

  return (
    <div className="contact-item" key={props.contact.id}>
      <img className="contact-item__image" src={props.contact.imageUrl} alt={"Imagen de " + props.contact.name} />
      <div className="contact-item__info">
        <p className="contact-item__name">{props.contact.name} {props.contact.lastname}</p>
        <p className="contact-item__phone">{props.contact.phone}</p>
        <button className="contact-item__delete-button" onClick={() => props.deleteItem(props.contact)}>ELIMINAR</button>
      </div>
    </div>
  );
}

const ContactItemMemo = React.memo(ContactItem);

export default ContactItemMemo;