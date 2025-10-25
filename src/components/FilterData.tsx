import SelectCategory from "@/feature/category/SelectCategory";
import InputSelect from "./input/InputSelect";
import InputText from "./input/InputText";
import type { SetStateAction } from "react";

export interface IFilterData {
  listFilter: listFilter;
}

export type listFilter = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  setFilter: React.Dispatch<SetStateAction<string | undefined>>;
  option?: { value: string; label: string }[];
  valueName?: string;
  refetch?: () => void;
}[];

export default function FilterData({ listFilter }: IFilterData) {
  return listFilter?.map((item) => {
    if (item?.type === "text")
      return (
        <InputText
          key={item?.name}
          name={item?.name}
          id={item?.name}
          placeholder={item?.placeholder}
          label={item?.label}
          className="w-full xl:w-72"
          searchIcon
          refetch={item?.refetch}
          onChange={(value) => item?.setFilter(value ?? "")}
        />
      );
    if (item?.type === "select")
      return (
        <InputSelect
          option={item?.option}
          onChange={(value) => item?.setFilter(value ?? "")}
          key={item?.name}
          label={item?.label}
          name={item?.name}
          id={item?.name}
          className="w-full xl:w-72"
          placeholder={item?.placeholder}
        />
      );
    if (item?.type === "select-category")
      return (
        <SelectCategory
          valueName={item?.valueName}
          onChange={(value) => item?.setFilter(value ?? "")}
          key={item?.name}
        />
      );
  });
}
