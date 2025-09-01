import s from "./_s.module.scss";

const Contact = () => {
  const contacts = [
    {
      name: "Logistics Rep",
      email: "logistics@maisonpyramide.com",
    },
    {
      name: "Sales Rep",
      email: "showroom@maisonpyramide.com",
    },
  ];

  return (
    <div className={s.c}>
      <div className={s.c_h}>
        <h2>Contact</h2>
      </div>
      <div className={s.c_b}>
        {contacts.map((contact) => (
          <div className={s.p}>
            <figure></figure>
            <div className={s.p_info}>
              <h3>{contact.name}</h3>
              <p>{contact.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
