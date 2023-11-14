import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../App.css";

export default function Table({ tableName, showTable }) {
  const gridRef = useRef(null);
  const [rowData, setRowData] = useState(null);
  const [columnDefs, setColumnDefs] = useState(null);

  // console.log(rowData);
  // console.log(columnDefs);

  useEffect(() => {
    let headers = [];

    const fetchCsv = async () => {
      const response = await fetch(`data/${tableName.toLowerCase()}.csv`);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value);
      return csv;
    };

    const convertCSVToJson = async () => {
      const csvData = await fetchCsv();
      const lines = csvData.split("\n");
      headers = lines[0].split(",");
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
          obj[headers[j].trim()] = currentLine[j].trim();
        }
        result.push(obj);
      }
      return result;
    };

    if (showTable) {
      convertCSVToJson().then((res) => {
        setRowData(res);
        const temp = [];
        for (let i = 0; i < headers.length; i++) {
          const obj = {};
          obj["field"] = headers[i].trim();
          obj["filter"] = "agSetColumnFilter";
          temp.push(obj);
        }
        setColumnDefs(temp);
      });
    }
  }, [showTable, tableName]);

  useEffect(() => {
    if (gridRef.current && rowData) {
      gridRef.current.api.sizeColumnsToFit();
    }
  }, [rowData]);

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      minWidth: 200,
      resizable: true,
      floatingFilter: true,
    };
  }, []);

  const onCsvExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const onExcelExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
  }, []);

  const exportJsonData = () => {
    const blob = new Blob([JSON.stringify(rowData)],{type:'application/json'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.json';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-4 w-[100%] h-[33rem] mb-24">
      {showTable && (
        <>
        <div className="flex flex-row-reverse gap-4 mb-4">
            <button
              className="px-4 py-3 rounded-lg text-white font-bold bg-[#164863] mt-6 hover:bg-opacity-80"
              onClick={onCsvExport}
            >
              CSV <span><i className="fa-solid fa-download"></i></span>
            </button>
            <button
              className="px-4 py-3 rounded-lg text-white font-bold bg-[#164863] mt-6 hover:bg-opacity-80"
              onClick={onExcelExport}
            >
              Excel <span><i className="fa-solid fa-download"></i></span>
            </button>
            <button
              className="px-4 py-3 rounded-lg text-white font-bold bg-[#164863] mt-6 hover:bg-opacity-80"
              onClick={exportJsonData}
            >
              Json <span><i className="fa-solid fa-download"></i></span>
            </button>
          </div>
          <div className="ag-theme-alpine w-[100%] h-[90%]">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={10}
            ></AgGridReact>
          </div>
       </>
      )}
    </div>
  );
}
