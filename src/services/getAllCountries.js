export async function getAllCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countriesData = await response.json();
  const independentCountries = countriesData.filter(
    (country) => country.independent === true
  );
  return independentCountries;
}
