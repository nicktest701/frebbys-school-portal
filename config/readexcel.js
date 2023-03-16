import React, { useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";

function App() {
  const [excelData, setExcelData] = useState([]);
  const [divStyle, setDivStyle] = useState(null);

  const handlefileData = (e) => {
    e.preventDefault();

    var files = e.target.files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 0 });
      setExcelData(dataParse);
      setDivStyle({
        width: 300,
        height: 600,
        backgroundColor: "pink",
        overflowY: "scroll",
      });
      //dataParse);
    };
    reader.readAsBinaryString(files);
  };
  return (
    <div className="App">
      <form>
        <label htmlFor="file">Upload you excel</label>
        <input
          type="file"
          name="file"
          id="file"
          accept=".xls,.xlsx"
          onChange={handlefileData}
        />
      </form>

      <div style={divStyle}>
        {excelData !== undefined ? (
          excelData.map((p, index) => (
            <div key={index}>
              <p>{p.Names}</p>
              <p>{p.Age}</p>
            </div>
          ))
        ) : (
          <div>
            <p>No data available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
