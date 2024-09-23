import React, { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule } from "ag-grid-community";
import { GridOptions, ColDef, ModuleRegistry } from "ag-grid-community";
import { CsvExportModule } from "ag-grid-community";
import * as XLSX from "xlsx";

ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule]);

const ImportExport: React.FC = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<any[]>([]);
  const [csvData, setCsvData] = useState<string>("");

  const columnDefs: ColDef[] = [
    { field: "athlete", minWidth: 180 },
    { field: "age" },
    { field: "country", minWidth: 150 },
    { field: "year" },
    { field: "date", minWidth: 130 },
    { field: "sport", minWidth: 100 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];

  const gridOptions: GridOptions = {
    columnDefs,
    defaultColDef: {
      minWidth: 80,
      flex: 1,
    },
  };

  const importExcel = () => {
    fetch("https://www.ag-grid.com/example-assets/olympic-data.xlsx")
      .then((response) => response.arrayBuffer())
      .then((data: ArrayBuffer) => {
        const workbook = convertDataToWorkbook(data);
        populateGrid(workbook);
      });
  };

  const convertDataToWorkbook = (dataRows: ArrayBuffer) => {
    const data = new Uint8Array(dataRows);
    const arr: string[] = [];

    for (let i = 0; i !== data.length; ++i) {
      arr[i] = String.fromCharCode(data[i]);
    }

    const bstr = arr.join("");
    return XLSX.read(bstr, { type: "binary" });
  };

  const populateGrid = (workbook: XLSX.WorkBook) => {
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    const columns: Record<string, string> = {
      A: "athlete",
      B: "age",
      C: "country",
      D: "year",
      E: "date",
      F: "sport",
      G: "gold",
      H: "silver",
      I: "bronze",
      J: "total",
    };

    const rowData: any[] = [];
    let rowIndex = 2;

    while (worksheet["A" + rowIndex]) {
      const row: any = {};
      Object.keys(columns).forEach((column) => {
        row[columns[column]] = worksheet[column + rowIndex].w;
      });

      rowData.push(row);
      rowIndex++;
    }

    setRowData(rowData);
  };

  const clearGrid = () => {
    setRowData([]);
  };

  const exportCsv = () => {
    gridRef.current!.api.exportDataAsCsv();
  };

  const showCsvData = () => {
    const csvString = gridRef.current!.api.getDataAsCsv();
    setCsvData(csvString || "No data available");
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={importExcel}>Import Excel</button>
        <button onClick={clearGrid}>Clear Grid</button>
        <button onClick={exportCsv}>Export as CSV</button>
        <button onClick={showCsvData}>Show CSV Data</button>
      </div>
      <div
        id="myGrid"
        className="ag-theme-quartz"
        style={{ height: "500px", width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          gridOptions={gridOptions}
        />
      </div>
      <textarea
        style={{ width: "100%", height: "200px", marginTop: "10px" }}
        value={csvData}
        readOnly
        placeholder="CSV data will appear here"
      ></textarea>
    </div>
  );
};

export default ImportExport;
