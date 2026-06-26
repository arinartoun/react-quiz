import { useQuiz } from "../contexts/QuizContext";
interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}
interface OptionsProps {
  question: Question;
}
function Options({ question }: OptionsProps) {
  const context = useQuiz();
  if (!context) return null;
  const { dispatch, answer } = context;

  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
