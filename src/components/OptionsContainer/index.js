import { Option } from "../Option";

export function OptionsContainer({ handleClick, options, answer, userAnswer }) {
  return (
    <>
      {options.map((country) => {
        return (
          <div
            key={country.name.common}
            onClick={() => !userAnswer.answered && handleClick(country)}
            className={`flex items-center justify-between cursor-pointer px-4 py-2 text-xl gap-4 rounded-xl border-2 duration-300 ${
              userAnswer.answered
                ? answer === country
                  ? "bg-green-500 border-green-500 text-green-100"
                  : country === userAnswer.answeredCountry
                  ? "bg-red-500 border-red-500 text-red-100"
                  : "text-slate-500 border-slate-400"
                : "hover:bg-amber-400 hover:border-amber-400 hover:text-slate-100 text-slate-500 border-slate-400"
            }`}
          >
            <Option country={country} />
          </div>
        );
      })}
    </>
  );
}