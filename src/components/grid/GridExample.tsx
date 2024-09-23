import { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "./GridExample.css";
import { GridData } from "./GridData";
import { FilterModel } from "ag-grid-community";
import ElectricFilter from "./ElectricFilter";

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const savedFilterState = useRef<FilterModel>();

  const getColumnData = useCallback(() => {
    console.log("all columns", gridRef.current?.api.getAllGridColumns());
    console.log(
      "visible columns",
      gridRef.current?.api.getAllDisplayedColumns()
    );
    console.log("model column", gridRef.current?.api.getColumn("model"));
  }, []);

  const getColumnPinned = useCallback(() => {
    gridRef.current?.api.setColumnsPinned(["model"], "left");
  }, []);

  const saveFilter = useCallback(() => {
    const filterModel = gridRef.current?.api.getFilterModel();
    savedFilterState.current = filterModel;
  }, []);

  const applyFilter = useCallback(() => {
    const filterModel = savedFilterState.current;
    gridRef.current?.api.setFilterModel(filterModel!);
  }, []);

  const MyCellComponent = (p: { value: string; buttonText: string }) => {
    return (
      p?.value && (
        <>
          <button onClick={() => window.alert(`${p.value}`)}>
            {p.buttonText}
          </button>
          {p.value}
        </>
      )
    );
  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: "agMultiColumnFilter", // true | agTextColumnFilter | agNumberColumnFilter | agDateColumnFilter | agSetColumnFilter
      floatingFilter: true,
      filterParams: {
        debounceMs: 0,
        // buttons: ["apply", "clear", "cancel", "reset"],
      },
      editable: true,
      enableRowGroup: true,
      headerTooltip: "AG Grid",
      cellRendererSelector: (p: { value: boolean }) => {
        return {
          component:
            p.value == undefined
              ? null
              : p.value === true
              ? CheckedComponent
              : UnCheckedComponent,
        };
      },
      // width: 500,
      // lockPinned: true,
      // resizable: false,
    };
  }, []);

  const rowClassRules = useMemo(
    () => ({
      "blue-row": (p: { data: { make: string } }) => p?.data?.make == "Toyota",
    }),
    []
  );

  const CheckedComponent = (p: { value: boolean }) => {
    return (
      <img
        alt={`${p.value}`}
        src={`https://www.ag-grid.com/example-assets/icons/tick-in-circle.png`}
        style={{ width: "20", height: "20" }}
      />
    );
  };
  const UnCheckedComponent = (p: { value: boolean }) => {
    return (
      <img
        alt={`${p.value}`}
        src={`https://www.ag-grid.com/example-assets/icons/cross-in-circle.png`}
        style={{ width: "20", height: "20" }}
      />
    );
  };

  const [rowData] = useState(GridData);

  const [colDefs] = useState([
    {
      field: "make",
      headerName: "Company",
      cellRenderer: MyCellComponent,
      cellRendererParams: {
        buttonText: "Alert",
      },
      pinned: "left",
      tooltipField: "model",
      cellRendererSelector: null,
      // valueGetter: (p) => p.data.make + " " + p.data.price,
      // cellEditor: "agSelectCellEditor",
      // cellEditorParams: { values: ["Tesla", "Ford", "Toyota"] },
      // checkboxSelection: true,
    },
    {
      field: "model",
      sortable: false,
      cellRendererSelector: null,
      lockPosition: true,
      // hide: true
    },
    {
      field: "price",
      valueFormatter: (p: { value: number }) =>
        p && p.value && "Rs." + " " + p.value.toLocaleString(),
      cellClassRules: {
        "green-cell": (p: { value: number }) => p.value > 40000,
      },
      tooltipValueGetter: () => Math.random(),
      cellRendererSelector: null,
    },
    {
      field: "electric",
      filter: ElectricFilter,
      // floatingFilterComponent: FloatingElectricFilter,
      // floatingFilterComponentParams: {
      //   suppressFloatingFilterButton: true, // Optional: hide default filter button
      // },
    },
    {
      headerName: "Performance",
      marryChildren: true,
      children: [
        {
          field: "performance.good",
          headerName: "Good",
          columnGroupShow: "open",
        },
        {
          field: "performance.bad",
          headerName: "Bad",
          columnGroupShow: "open",
        },
        {
          field: "performance.average",
          headerName: "Average",
          columnGroupShow: "open",
        },
        {
          field: "performance.type",
          headerName: "Type",
          columnGroupShow: "closed",
          cellRendererSelector: null,
        },
      ],
    },
    {
      field: "manufacturingDate",
      cellRendererSelector: null,
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: (filterLocalDate: Date, cellValue: string) => {
          const dateParts = cellValue.split("-");
          const cellDate = new Date(
            Number(dateParts[0]),
            Number(dateParts[1]) - 1,
            Number(dateParts[2])
          );

          if (filterLocalDate.getTime() === cellDate.getTime()) {
            return 0;
          }
          return cellDate < filterLocalDate ? -1 : 1;
        },
      },
      valueFormatter: (p: { value: string }) =>
        p.value ? new Date(p.value).toLocaleDateString() : "",
    },
  ]);
  return (
    <div className="ag-theme-quartz-dark" style={{ height: 600 }}>
      <div className="button-group">
        <button onClick={getColumnData}>Get Column Data</button>
        <button onClick={getColumnPinned}>Pin Model to left</button>
        <button onClick={saveFilter}>Save Filter</button>
        <button onClick={applyFilter}>Apply Filter</button>
      </div>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowSelection={"multiple"}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20]}
        rowClassRules={rowClassRules}
        rowGroupPanelShow="always"
        popupParent={document.body}
      />
    </div>
  );
};

export default GridExample;
