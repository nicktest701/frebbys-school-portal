import { Button } from "@mui/material";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";



const FeesReportPrintPage = () => {

  const componentRef = useRef();


  return (
    <>
      <div
        ref={componentRef}
        style={{
          width: "8.5in",
          minHeight: "11in",
          margin: "auto",
          padding: "16px",
          // background: `linear-gradient(rgba(255,255,255,0.96),rgba(255,255,255,0.96)),url(${aamustedLogo}) no-repeat center center`,
          backgroundSize: "350px 350px",
        }}
        // id="printPage"
      >
        FeesReportPrintPage
      </div>
      <ReactToPrint
        trigger={() => <Button variant='contained'>Print this out!</Button>}
        content={() => componentRef.current}
      />
    </>
  );
};

export default FeesReportPrintPage;
