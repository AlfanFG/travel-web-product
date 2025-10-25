import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import Loading from "../ui/loading";

export interface IinputSelect<T extends FieldValues> {
  className?: string;
  control?: Control<T>;
  label: string;
  name: Path<T> | string;
  id: string;
  option: { value: string; label: string }[] | undefined;
  error?: string | undefined;
  placeholder: string;
  onChange?: (value: string) => void | React.SetStateAction<string>;
  hook?: boolean;
  value?: string;
  isLoading?: boolean;
  trigger?: () => void;
}

export default function InputSelect<T extends FieldValues>({
  control,
  label,
  option,
  name,
  id,
  error,
  hook,
  value,
  placeholder,
  className,
  isLoading,
  onChange,
}: IinputSelect<T>) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label} </Label>
      <div className="relative">
        {isLoading && (
          <Loading variant={"xs"} className="absolute right-0 bottom-0 " />
        )}
        {hook ? (
          <Controller
            name={name as Path<T>}
            control={control}
            render={({ field }) => (
              <Select {...field} defaultValue={field.value}>
                <SelectTrigger className={className}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {option?.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        ) : (
          <Select
            name={name as string}
            value={value}
            onValueChange={(value) => {
              if (onChange) onChange(value);
            }}
          >
            <SelectTrigger className={className}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent id={id}>
              {option?.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
