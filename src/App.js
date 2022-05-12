import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Game } from "./components/Game";
import { fetchCountries } from "./slices/countries";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  return (
    <div className="min-w-full min-h-full flex items-center justify-center">
      <section className="flex flex-col items-start gap-4 min-w-full sm:min-w-[40%]">
        <h1 className="text-slate-50 font-bold text-2xl ml-8 sm:ml-0 sm:text-4xl">
          COUNTRY QUIZ
        </h1>

        <Game />
      </section>
    </div>
  );
}

export default App;
