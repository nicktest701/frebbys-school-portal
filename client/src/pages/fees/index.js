import React from "react";
import { Outlet } from "react-router-dom";
import FeeNav from "./layout/FeeNav";
import FeeFooter from "./layout/FeeFooter";
import { Scrollbars } from "react-custom-scrollbars";

const Fees = () => {
  return (
    <>
      <Scrollbars autoHide>
        <FeeNav />
        <section style={{ minHeight: "80vh" }}>
          <Outlet />
        </section>
      </Scrollbars>
        <FeeFooter />
    </>
  );
};

Fees.propTypes = {};

export default Fees;
