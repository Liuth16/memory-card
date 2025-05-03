export default function Score({ currentScore, maxScore }) {
  return (
    <div>
      <h4>
        Current score: {currentScore}
        <br />
        Max Score: {maxScore}
      </h4>
    </div>
  );
}
