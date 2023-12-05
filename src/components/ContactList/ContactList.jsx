const ContactList = ({ createList, onDelete }) => {
  const newList = createList.map(({ id, name, number }) => {
    return (
      <li key={id}>
        <span>{name}:</span>
        <span>{number}</span>
        <button type="button" onClick={() => onDelete(id)}>
          remove contact
        </button>
      </li>
    );
  });
  return <ul className="contact__box">{newList}</ul>;
};

export default ContactList;
