import { useSelector } from "react-redux";

export function useText() {
  const language = useSelector((state) => state.user.language);

  if (language === "EN") {
    return {
      lang: "EN",
      menu: {
        title: "Welcome!... Set your options",
        button: "Start",
      },
      gameContainer: {
        title: "Guess the country ...",
        points: "SCORE:",
        button: "Next Round",
      },
      looseContainer: {
        title: "Results",
        subtitle: {
          first: "You got",
          second: "correct answers.",
        },
        button: "Try Again",
      },
    };
  } else if (language === "ES") {
    return {
      lang: "ES",
      menu: {
        title: "Bienvenido!... Selecciona tus opciones",
        button: "Empezar",
      },
      gameContainer: {
        title: "Adivina el país ...",
        points: "PUNTOS:",
        button: "Siguiente Ronda",
      },
      looseContainer: {
        title: "Resultados",
        subtitle: {
          first: "Obtuviste",
          second: "respuestas correctas.",
        },
        button: "Volver a Intentar",
      },
    };
  }
}
