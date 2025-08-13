import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { memo, useState, type ChangeEvent, type FormEvent } from "react";
import { api } from "../../api";

interface IPhone {
  id: string;
  title: string;
  price: string;
  storage: string;
  ram: string;
  brand: string;
}

const initialState: IPhone = {
  id: "",
  title: "",
  price: "",
  storage: "",
  ram: "",
  brand: "",
};

const Phone = () => {
  const [formData, setFormData] = useState<IPhone>(initialState);
  const [updateItem, setUpdateItem] = useState<IPhone | null>(null);
  const queryClient = useQueryClient();

  const { data = [] } = useQuery({
    queryKey: ["phoneKey"],
    queryFn: () => api.get("phone").then((res) => res.data),
  });

  // Create new phone
  const createMutation = useMutation({
    mutationFn: (newPhone: Omit<IPhone, "id">) => api.post("phone", newPhone),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phoneKey"] });
      setFormData(initialState);
    },
  });

  // Delete
  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`phone/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phoneKey"] });
    },
  });

  // Update
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<IPhone, "id"> }) =>
      api.put(`phone/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phoneKey"] });
      setUpdateItem(null);
      setFormData(initialState);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "storage" || name === "ram"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Update
    if (updateItem) {
      updateMutation.mutate({ id: updateItem.id, data: formData });
    } else {
      // Create
      const { id, ...newData } = formData;
      createMutation.mutate(newData);
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleUpdate = (item: IPhone) => {
    setUpdateItem(item);
    setFormData(item);
  };

  return (
    <div className="container py-[30px]">
      <form
        onSubmit={handleSubmit}
        className="w-[500px] max-[530px]:w-full shadow-lg mx-auto rounded-2xl p-[1rem] my-[30px]"
      >
        <p className="text-center text-[24px]">
          {updateItem ? "Update Phone" : "Create Phone"}
        </p>
        <div className="flex flex-col gap-[10px] my-[30px]">
          <input
            className="w-full outline-0 border border-[#999] rounded-2xl py-[10px] indent-5 focus:border-[green]"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Title"
            required
          />
          <input
            className="w-full outline-0 border border-[#999] rounded-2xl py-[10px] indent-5 focus:border-[green]"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter Price"
            required
          />
          <input
            className="w-full outline-0 border border-[#999] rounded-2xl py-[10px] indent-5 focus:border-[green]"
            name="storage"
            type="number"
            value={formData.storage}
            onChange={handleChange}
            placeholder="Enter Storage"
            required
          />
          <input
            className="w-full outline-0 border border-[#999] rounded-2xl py-[10px] indent-5 focus:border-[green]"
            name="ram"
            type="number"
            value={formData.ram}
            onChange={handleChange}
            placeholder="Enter RAM"
            required
          />
          <input
            className="w-full outline-0 border border-[#999] rounded-2xl py-[10px] indent-5 focus:border-[green]"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter Brand"
            required
          />
        </div>
        <button className="w-full bg-green-500 rounded-2xl text-white py-[8px] font-medium cursor-pointer">
          {updateItem ? "Update" : "Create"}
        </button>
      </form>

      <p className="text-center text-[30px] mb-[10px]">Phones</p>
      <div className="grid grid-cols-4 gap-[20px] max-[1010px]:grid-cols-3 max-[800px]:grid-cols-2 max-[530px]:grid-cols-1">
        {data.map((item: IPhone) => (
          <div key={item.id} className="shadow-md rounded-2xl p-[1rem]">
            <p>
              <strong>Title:</strong> {item.title}
            </p>
            <p>
              <strong>Price:</strong> {item.price} USD
            </p>
            <p>
              <strong>Storage:</strong> {item.storage} GB
            </p>
            <p>
              <strong>RAM:</strong> {item.ram} GB
            </p>
            <p>
              <strong>Brand:</strong> {item.brand}
            </p>
            <div className="flex gap-[10px] mt-[10px]">
              <button
                onClick={() => handleDelete(item.id)}
                className="w-full bg-red-500 text-white rounded-2xl py-[5px]"
              >
                Delete
              </button>
              <button
                onClick={() => handleUpdate(item)}
                className="w-full bg-blue-500 text-white rounded-2xl py-[5px]"
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

export default memo(Phone);
