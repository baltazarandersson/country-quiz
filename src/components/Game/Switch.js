const selectedStyle = "bg-indigo-400 text-indigo-100";

export function Switch({ setter, selected, optionA, optionB }) {
  return (
    <div
      className={`overflow-hidden relative cursor-pointer flex items-center justify-between text-xl rounded-xl border-2 text-indigo-500 border-indigo-400`}
    >
      <button
        className={`w-1/2 px-4 py-2 ${
          optionA.payload === selected && selectedStyle
        }`}
        onClick={() => setter(optionA.payload)}
      >
        {optionA.name}
      </button>

      <button
        className={`w-1/2 px-4 py-2 ${
          optionB.payload === selected && selectedStyle
        }`}
        onClick={() => setter(optionB.payload)}
      >
        {optionB.name}
      </button>
    </div>
  );
}
