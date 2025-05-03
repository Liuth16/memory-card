import "../styles/Card.css";

export default function Card({ name, image, onClick }) {
  const upperName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div className="card-container" onClick={onClick}>
      <img src={image} alt={name} loading="lazy" />
      <div className="card-title">{upperName}</div>
    </div>
  );
}
