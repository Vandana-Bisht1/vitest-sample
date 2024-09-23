import { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { getData } from "./data";
import { ColDef } from "ag-grid-community";

const SparkLine = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: 700 }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData] = useState<any[]>(getData());
  const [columnDefs] = useState<ColDef[]>([
    { field: "symbol", maxWidth: 120 },
    { field: "name", minWidth: 250 },
    {
      field: "change",
      cellRenderer: "agSparklineCellRenderer",
      cellRendererParams: {
        sparklineOptions: {
          type: "area",
          fill: "rgba(216, 204, 235, 0.6)",
          line: {
            stroke: "rgb(119,77,185)",
            strokeWidth: 2,
          },
          highlightStyle: {
            fill: "rgb(143,185,77)",
          },
          axis: {
            stroke: "rgb(204, 204, 235)",
          },
        },
      },
    },
    {
      field: "volume",
      type: "numericColumn",
      maxWidth: 140,
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className={"ag-theme-quartz"}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowHeight={50}
        />
      </div>
    </div>
  );
};

export default SparkLine;
