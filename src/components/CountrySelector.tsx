import React from "react";
import { Select } from "@chakra-ui/react";
import countries from "../data/countries";

interface Props {
  selectedCountry: string;
  onSelect: (countryCode: string) => void;
  placeholder?: string;
}

const CountrySelector = ({
  selectedCountry,
  onSelect,
  placeholder = "Select country",
}: Props) => {
  return (
    <Select
      value={selectedCountry}
      onChange={(e) => onSelect(e.target.value)}
      placeholder={placeholder}
    >
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </Select>
  );
};

export default CountrySelector;
