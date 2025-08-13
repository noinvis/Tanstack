import {
  memo,
  useState,
  type ChangeEvent,
  type FC,
  type FormEvent,
} from "react";
import type { ICountry } from "../../pages/home/Home";

interface Props {
  data: ICountry[];
  setData: React.Dispatch<React.SetStateAction<ICountry[]>>;
}

const initialState: ICountry = {
  id: "",
  name: "",
  capital: "",
  population: "",
  area: "",
};

const CountryView: FC<Props> = ({ data, setData }) => {
  const [formData, setFormData] = useState(initialState);
  const [updateItem, setUpdateItem] = useState<ICountry | null>(null);
  // Create new country
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCountry: ICountry = {
      id: updateItem ? updateItem.id : Date.now().toString(),
      name: formData.name,
      capital: formData.capital,
      population: formData.population,
      area: formData.area,
    };

    if (updateItem) {
      // Update
      setData((prev) =>
        prev.map((country) =>
          country.id === updateItem.id ? newCountry : country
        )
      );
      setUpdateItem(null);
    } else {
      // Create
      setData((prev) => [...prev, newCountry]);
    }

    setFormData(initialState);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Delete
  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((country) => country.id !== id));
  };
  // Update
  const handleUpdate = (item: ICountry) => {
    setUpdateItem(item);
    setFormData({
      id: item.id,
      name: item.name,
      capital: item.capital,
      population: item.population,
      area: item.area,
    });
  };

  if (data.length === 0) {
    return <p className="text-center">No countries found</p>;
  }

  return (
    <div className="container py-[30px]">
      <form
        onSubmit={handleSubmit}
        action=""
        className="w-[500px] max-[530px]:w-full shadow-lg mx-auto rounded-2xl p-[1rem] my-[30px]"
      >
        <p className="text-center text-[24px]">
          {updateItem ? "Update Country" : "Create Country"}
        </p>
        <div className="flex flex-col gap-[10px] my-[30px]">
          <input
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Enter Name"
            className="w-full outline-0 border border-[#999] rounded-2xl py-[10px] indent-5 focus:border-[green]"
          />
          <input
            required
            name="capital"
            value={formData.capital}
            onChange={handleChange}
            type="text"
            placeholder="Enter Capital"
            className="w-full outline-0 border border-[#999] rounded-2xl py-[10px] indent-5 focus:border-[green]"
          />
          <input
            required
            name="population"
            value={formData.population}
            onChange={handleChange}
            type="number"
            placeholder="Enter Population"
            className="w-full outline-0 border border-[#999] rounded-2xl py-[10px] indent-5 focus:border-[green]"
          />
          <input
            required
            name="area"
            value={formData.area}
            onChange={handleChange}
            type="number"
            placeholder="Enter Area"
            className="w-full outline-0 border border-[#999] rounded-2xl py-[10px] indent-5 focus:border-[green]"
          />
        </div>
        <button className="w-full bg-green-500 rounded-2xl text-white py-[8px] font-medium cursor-pointer">
          {updateItem ? "Update" : "Create"}
        </button>
      </form>
      <p className="text-center text-[40px] mb-[10px]">Country</p>
      <div className="grid grid-cols-5 gap-[25px] max-[1085px]:grid-cols-4 max-[930px]:grid-cols-3 max-[680px]:grid-cols-2 max-[460px]:grid-cols-1">
        {data.map((item) => (
          <div
            className="shadow-md rounded-2xl p-[1rem] flex flex-col gap-[5px]"
            key={item.id}
          >
            <p>
              <strong>Name:</strong> {item.name}
            </p>
            <p>
              <strong>Capital:</strong> {item.capital}
            </p>
            <p>
              <strong>Population:</strong> {item.population} rate
            </p>
            <p>
              <strong>Area:</strong> {item.area} km
            </p>
            <div className="flex gap-[10px] mt-[10px]">
              <button
                onClick={() => handleDelete(item.id)}
                className="w-full bg-red-500 text-white rounded-2xl py-[5px] font-medium cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={() => handleUpdate(item)}
                className="w-full bg-blue-500 text-white rounded-2xl py-[5px] font-medium cursor-pointer"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(CountryView);
