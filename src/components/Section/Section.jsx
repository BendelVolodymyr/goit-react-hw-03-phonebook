const Section = ({ title, children }) => {
  return (
    <section className="section">
      <div>
        {title !== undefined && <h2>{title}</h2>}
        {children !== undefined && children}
      </div>
    </section>
  );
};

export default Section;
