"use client";
import React from "react";

interface FilterButtonGroupProps<T extends string | number> {
  options: T[];
  selectedOptions: T[];
  onSelect: (value: T) => void;
  label?: string;
}

export const FilterButtonGroup = <T extends string | number>({
  options,
  selectedOptions,
  onSelect,
  label,
}: FilterButtonGroupProps<T>) => {
  return (
    <div className="flex flex-nowrap gap-2  overflow-auto" aria-label={label}>
      {options.map((option) => {
        const active = selectedOptions.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            aria-pressed={active}
            className={`w-12 h-10 flex items-center justify-center border rounded-md transition font-medium
              ${
                active
                  ? "bg-blue-100 border-blue-500 text-blue-700"
                  : "border-gray-300 hover:bg-blue-50 hover:border-blue-300 text-gray-700"
              }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};
