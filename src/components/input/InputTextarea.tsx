import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";

import { Textarea } from "../ui/textarea";

interface IInputTextArea<T extends FieldValues> {
  control?: Control<T>;
  label: string;
  name: Path<T>;
  id: string;
  error?: string;
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  hook?: boolean;
  className?: string;
  value?: string | undefined;
  searchIcon?: boolean;
  debounced?: number; // Optional delay for debounce
}

export default function InputTextArea<T extends FieldValues>({
  control,
  label,
  placeholder,
  name,
  id,
  value,
  error,
  className,
  onChange,
  hook = false,
  searchIcon = false,
}: IInputTextArea<T>) {
  // Handle immediate input change

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      {hook ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Textarea
              aria-label={label}
              placeholder={placeholder}
              id={id}
              className={className}
              defaultValue={value}
              {...field}
            />
          )}
        />
      ) : (
        <div className="relative w-fit">
          <Textarea
            aria-label={label}
            placeholder={placeholder}
            id={id}
            name={name}
            value={value}
            className={className}
            onChange={onChange}
          />
          {searchIcon && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              aria-label={"search article"}
            >
              <FaSearch className="text-secondary" />
            </Button>
          )}
        </div>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
