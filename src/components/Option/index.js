import { useText } from "../../hooks/useText";

export function Option({ country }) {
  const text = useText();
  if (text.lang === "EN") {
    return (
      <>
        <p>{country.name.common}</p>
      </>
    );
  }
  if (text.lang === "ES") {
    return (
      <>
        <p>{country.translations.spa.common}</p>
      </>
    );
  }
}
