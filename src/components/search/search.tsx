import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import useSearch from "./hooks/useSearch";

type Props = {
  onSearchChange: (searchData: { value: string; label: string } | null) => void;
};


export type SearchOption = {
  value: string;
  label: string;
};

const Search = ({ onSearchChange }: Props) => {
  const { loadOptions } = useSearch();
  const [search, setSearch] = useState<SearchOption | null>(null);

  const handleOnChange = (searchData: SearchOption | null) => {
    setSearch(searchData);
    if (searchData) {
      onSearchChange(searchData);
    }
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      loadOptions={loadOptions}
      onChange={handleOnChange}
    />
  );
};

export default Search;
