import { useQuiz } from "../contexts/QuizContext";

function FinishScreen() {
  const context = useQuiz();
  if (!context) return null;
  const { points, maxPossiblePoints, highscore, dispatch } = context;

  const percentage = (points / maxPossiblePoints) * 100;

  enum emojiResult {
    emoji100 = "🥇",
    emoji80 = "🎉",
    emoji50 = "🙃",
    emoji30 = "🤨",
    emoji0 = "🤦‍♂️",
    emoji = "",
  }
  let emoji: emojiResult = emojiResult.emoji;
  if (percentage === 100) emoji = emojiResult.emoji100;
  if (percentage >= 80 && percentage < 100) emoji = emojiResult.emoji80;
  if (percentage >= 50 && percentage < 80) emoji = emojiResult.emoji50;
  if (percentage >= 0 && percentage < 50) emoji = emojiResult.emoji30;
  if (percentage === 0) emoji = emojiResult.emoji0;

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishScreen;
