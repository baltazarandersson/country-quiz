import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Game } from "./components/Game";
import { fetchCountries } from "./slices/countries";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center min-w-full min-h-full">
      <section className="flex flex-col items-start gap-4 min-w-full sm:min-w-[40%]">
        <h1 className="ml-8 text-2xl font-bold text-slate-50 sm:ml-0 sm:text-4xl">
          COUNTRY QUIZ
        </h1>

        <Game />
      </section>
    </div>
  );
}

export default App;
