import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  id: string;
  name: string;
};

type DropdownProps = {
  options: Option[];
  onChangeHandler: (selectedId: string) => void;
};

const Dropdown = ({ options, onChangeHandler }: DropdownProps) => {
  return (
    <Select onValueChange={onChangeHandler}>
      <SelectTrigger className="select-field w-[180px] flex-center">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent className="bg-white shadow-md rounded-md overflow-hidden">
        {options.map((option) => (
          <SelectItem key={option.id} value={option.id} className="select-item">
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
