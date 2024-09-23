import { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "./style.css";
import {
  ColDef,
  FirstDataRenderedEvent,
  GridReadyEvent,
} from "ag-grid-community";
import { getData } from "./data";
import {
  ChartRef,
  ChartToolPanelsDef,
  ChartType,
  SelectionOptions,
} from "ag-grid-charts-enterprise";
let chartRef: ChartRef;

const ChartSample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: "100%", height: 1000 }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs] = useState<ColDef[]>([
    {
      field: "period",
      chartDataType: "category",
      headerName: "Financial Period",
      width: 150,
    },
    {
      field: "recurring",
      chartDataType: "series",
      headerName: "Recurring revenue",
    },
    {
      field: "individual",
      chartDataType: "series",
      headerName: "Individual sales",
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);
  const popupParent = useMemo<HTMLElement | null>(() => {
    return document.body;
  }, []);
  const selection = useMemo<SelectionOptions>(() => {
    return { mode: "cell" };
  }, []);
  const chartToolPanelsDef = useMemo<ChartToolPanelsDef>(() => {
    return {
      defaultToolPanel: "settings",
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    getData().then((rowData: any) =>
      params.api.setGridOption("rowData", rowData)
    );
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    chartRef = params.api.createRangeChart({
      chartContainer: document.querySelector("#myChart") as any,
      cellRange: {
        columns: ["period", "recurring", "individual"],
      },
      chartType: "groupedColumn",
    })!;
  }, []);

  const updateChart = useCallback(
    (chartType: ChartType) => {
      gridRef.current!.api.updateChart({
        type: "rangeChartUpdate",
        chartId: `${chartRef.chartId}`,
        chartType: chartType,
      });
    },
    [chartRef]
  );

  return (
    <div style={containerStyle}>
      <div className="wrapper">
        <div className="button-container">
          <button onClick={() => updateChart("groupedColumn")}>
            Grouped Column
          </button>
          <button onClick={() => updateChart("stackedColumn")}>
            Stacked Column
          </button>
          <button onClick={() => updateChart("normalizedColumn")}>
            Normalized Column
          </button>
          <button onClick={() => updateChart("groupedBar")}>Grouped Bar</button>
          <button onClick={() => updateChart("stackedBar")}>Stacked Bar</button>
          <button onClick={() => updateChart("normalizedBar")}>
            Normalized Bar
          </button>
        </div>

        <div style={gridStyle} className={"ag-theme-quartz"}>
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            popupParent={popupParent}
            selection={selection}
            enableCharts={true}
            chartToolPanelsDef={chartToolPanelsDef}
            onGridReady={onGridReady}
            onFirstDataRendered={onFirstDataRendered}
          />
        </div>
        <div id="myChart" className="ag-theme-quartz"></div>
      </div>
    </div>
  );
};

export default ChartSample;
