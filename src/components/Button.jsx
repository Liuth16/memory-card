export default function Button({ onClick, text, buttonClass }) {
  return (
    <button onClick={onClick} className={buttonClass}>
      {text}
    </button>
  );
}
