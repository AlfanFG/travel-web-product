import InputSelect from "@/components/input/InputSelect";
import { useFetchCategory } from "./hooks/useFetchCategory";
import type { Control, FieldValues } from "react-hook-form";

interface ISelectCategory<T extends FieldValues> {
  control?: Control<T>;
  value?: string;
  valueName?: string;
  error?: string | undefined;
  onChange?: (value: string) => void | React.SetStateAction<string>;
}

export default function SelectCategory<T extends FieldValues>({
  control,
  value,
  valueName,
  error,
  onChange,
}: ISelectCategory<T>) {
  const { data: categories, isPending } = useFetchCategory();
  return (
    <InputSelect
      control={control}
      isLoading={isPending}
      name="category"
      error={error}
      id="category"
      className="w-full"
      onChange={onChange}
      value={value}
      placeholder="Search Category"
      option={categories?.data?.map((category) => {
        const key = (valueName ?? "id") as keyof typeof category;
        return {
          label: category.name,
          value: String(category[key]),
        };
      })}
      label="Category"
    />
  );
}
