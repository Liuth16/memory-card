import "../styles/Card.css";

export default function Card({ name, image }) {
  return (
    <div className="card-container">
      <img src={image} alt={name} loading="lazy" />
      <div className="card-title">{name}</div>
    </div>
  );
}
