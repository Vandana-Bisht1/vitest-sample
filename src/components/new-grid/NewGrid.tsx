import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";

const NewGrid = () => {
  const CompanyLogoRenderer = (params: { value: string }) => {
    return (
      <span
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
        }}
      >
        {params.value && (
          <img
            alt={`${params.value} Flag`}
            src={`https://www.ag-grid.com/example-assets/space-company-logos/${params.value.toLowerCase()}.png`}
            style={{
              display: "block",
              width: "25px",
              height: "auto",
              maxHeight: "50%",
              marginRight: "12px",
              filter: "brightness(1.1)",
            }}
          />
        )}
        <p
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {params.value}
        </p>
      </span>
    );
  };

  const MissionResultRenderer = (params: { value: boolean }) =>
    params.value !== undefined && (
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          alignItems: "center",
        }}
      >
        {
          <img
            alt={`${params.value}`}
            src={`https://www.ag-grid.com/example-assets/icons/${
              params.value ? "tick-in-circle" : "cross-in-circle"
            }.png`}
            style={{ width: "auto", height: "auto" }}
          />
        }
      </span>
    );

  const dateFormatter = (params: { value: string }) => {
    return (
      params.value &&
      new Date(params.value).toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    );
  };

  const [rowData, setRowData] = useState([]);
  const [colDefs] = useState([
    {
      field: "mission",
      checkboxSelection: true,
    },
    {
      field: "company",
      cellRenderer: CompanyLogoRenderer,
    },
    {
      field: "location",
    },
    {
      field: "date",
      valueFormatter: dateFormatter,
    },
    {
      field: "price",
    },
    {
      field: "successful",
      sortable: false,
      cellRenderer: MissionResultRenderer,
    },
    { field: "rocket" },
  ]);

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/space-mission-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      editable: true,
      filter: true,
      floatingFilter: true,
      enableRowGroup: true,
    };
  }, []);
  return (
    <div className="ag-theme-quartz-dark" style={{ height: 700 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true}
        paginationPageSize={50}
        paginationPageSizeSelector={[50, 100, 200]}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        onSelectionChanged={() => console.log("Row Selected!")}
        onCellValueChanged={(event) =>
          console.log(`New Cell Value: ${event.value}`)
        }
        rowGroupPanelShow="always"
      />
    </div>
  );
};

export default NewGrid;
