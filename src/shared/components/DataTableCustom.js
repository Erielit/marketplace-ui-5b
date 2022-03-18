import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { CustomLoader } from "./CustomLoader";
import { FilterComponent } from "./FilterComponent";

export const DataTableCustom = ({ columns, data, isLoading }) => {
  const [filterText, setFilterText] = useState("");

  const filteredItems = data.filter(
    (item) =>
      item.description &&
      item.description.toLowerCase().includes(filterText.toLowerCase())
  );

  const paginationOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
  };

  const searchComponent = React.useMemo(() => {
    const clear = () => {
      if (filterText) {
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        filterText={filterText}
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={clear}
      />
    );
  }, [filterText]);

  return (
    <DataTable
      title="Listado"
      columns={columns}
      data={filteredItems}
      pagination
      paginationComponentOptions={paginationOptions}
      progressPending={isLoading}
      progressComponent={<CustomLoader />}
      subHeader
      subHeaderComponent={searchComponent}
    />
  );
};
