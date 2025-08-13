import { memo, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import CountryView from "../../components/country-view/CountryView";

export interface ICountry {
  id: string;
  name: string;
  capital: string;
  population: string;
  area: string;
}

const Home = () => {
  const { data, error, loading } = useFetch<ICountry[]>("country");
  const [countries, setCountries] = useState<ICountry[]>([]);

  useEffect(() => {
    if (data) {
      setCountries(data);
    }
  }, [data]);

  if (loading)
    return (
      <div className="h-[60vh] flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  if (error) return <p>Something went wrong :(</p>;

  return <CountryView data={countries} setData={setCountries} />;
};


export default memo(Home);
