import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

interface QuizContextType extends State {
  numQuestions: number;
  maxPossiblePoints: number;
  dispatch: React.Dispatch<Action>;
}

// Initialize with null
const QuizContext = createContext<QuizContextType | null>(null);
// const QuizContext = createContext<State | null>(null);

const SECS_PER_QUESTION = 30;
interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}
interface State {
  questions: Question[] | null;

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading" | "error" | "ready" | "active" | "finished";
  index: number;
  answer: null | number;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
}
// interface Action {
//   type: string;
//   payload: Question[] | number ;
// }
type Action =
  | { type: "dataReceived"; payload: Question[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "newAnswer"; payload: number }
  | { type: "nextQuestion" }
  | { type: "finish" }
  | { type: "restart" }
  | { type: "tick" };

const initialState: State = {
  questions: null,

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions!.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions!.at(state.index);
      if (!question) return state;

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    case "tick":
      if (!state.secondsRemaining) return state;
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unkonwn");
  }
}
interface QuizProviderProps {
  children: ReactNode;
}
function QuizProvider({ children }: QuizProviderProps) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions ? questions.length : 0;
  const maxPossiblePoints = questions
    ? questions.reduce((prev: number, cur: Question) => prev + cur.points, 0)
    : 0;

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
