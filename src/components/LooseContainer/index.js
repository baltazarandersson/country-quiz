import svg from "../../assets/icons/win.svg";

export function LooseContainer({ score, onClick }) {
  return (
    <div className="flex flex-col w-full items-center gap-12">
      <img className="w-1/2" src={svg} alt="icon" />
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-5xl font-bold text-slate-700">Results</h2>
        <p className="text-xl text-slate-700">
          You got{" "}
          <span className="text-4xl font-bold text-green-400">{score}</span>{" "}
          correct answers.
        </p>
      </div>
      <button
        className={`px-12 py-4 font-bold text-slate-600 border-2 border-slate-600 rounded-lg`}
        onClick={onClick}
      >
        Try Again
      </button>
    </div>
  );
}
