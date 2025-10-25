import React, { useCallback } from "react";
import { debounce } from "lodash";

const useDebouncedInput = (
	value: string | undefined,
	setValue: (newValue: string | undefined) => void,
	delay: number
) => {
	// Debounced function to update the value
	const debouncedSetValue = useCallback(
		debounce((newValue: string) => {
			setValue(newValue);
		}, delay),
		[delay]
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		debouncedSetValue(event.target.value);
	};

	return {
		value,
		handleChange,
	};
};

export default useDebouncedInput;
