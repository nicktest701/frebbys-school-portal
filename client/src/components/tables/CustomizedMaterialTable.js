import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import { FormLabel, Stack, useTheme, Input, Typography } from "@mui/material";
import MaterialTable, { MTableToolbar } from "material-table";
import { tableIcons } from "../../config/tableIcons";
import { Add, Delete, Refresh } from "@mui/icons-material";
import PublishIcon from "@mui/icons-material/Publish";
import { Button } from "@mui/material";
import { InfinitySpin } from "react-loader-spinner";
import AnimatedContainer from "../animations/AnimatedContainer";
import { readXLSX } from "../../config/readXLSX";
import { readCSV } from "../../config/readCSV";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";

function CustomizedMaterialTable({
  title,
  exportFileName,
  isLoading,
  search,
  columns,
  data,
  options,
  actions,
  onRowClick,
  handleRefresh,
  showAddButton,
  addButtonText,
  onAddButtonClicked,
  showImportButton,
  importButtonText,
}) {
  const modifiedColumns = columns.map((column) => {
    return { ...column };
  });

  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const { palette } = useTheme();

  const CSV_FILE_TYPE = "text/csv";
  const XLSX_FILE_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const XLS_FILE_TYPE = "application/vnd.ms-excel";

  function handleLoadFile(e) {
    const files = e.target.files[0];

    try {
      const reader = new FileReader();
      files.type === CSV_FILE_TYPE
        ? reader.readAsBinaryString(files)
        : reader.readAsArrayBuffer(files);

      reader.onload = function (event) {
        let students = [];

        if (files.type === XLSX_FILE_TYPE || files.type === XLS_FILE_TYPE) {
          students = readXLSX(event.target.result);
        }

        if (files.type === CSV_FILE_TYPE) {
          students = readCSV(event.target.result);
        }
        if (students.length !== 0) {
          schoolSessionDispatch({ type: "openFileDialog", payload: students });
        }
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <AnimatedContainer>
      <Box paddingY={2} marginY={1} width="100%">
        <MaterialTable
          title={title}
          icons={tableIcons}
          isLoading={isLoading}
          columns={modifiedColumns}
          data={data === undefined ? [] : data}
          options={{
            selection: true,
            search: search || false,
            exportButton: true,
            exportAllData: true,
            exportFileName: exportFileName || title || "",
            showTextRowsSelected: false,
            columnsButton: true,
            paging: data === undefined || data.length === 0 ? false : true,
            pageSize: 5,
            pageSizeOptions: [5, 10, 20, 30, 40, 50],
            actionsColumnIndex: -1,
            overflowY: "scroll",
            ...options,
          }}
          style={{
            padding: "8px",
            backgroundColor: "#fff",
          }}
          actions={[
            {
              icon: () => <Refresh />,
              position: "toolbar",
              tooltip: "Refresh",
              onClick: (e, data) => handleRefresh(),
              isFreeAction: true,
            },
            {
              icon: () => <Delete />,
              position: "toolbarOnSelect",
              tooltip: "Delete",
              onClick: (e, data) => alert("Delete All"),
            },

            ...actions,
          ]}
          onRowClick={(e, rowData) => onRowClick && onRowClick(rowData)}
          components={{
            Toolbar: (props) => {
              return (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      padding: 1,
                    }}
                  >
                    {showAddButton && (
                      <Button
                        variant="contained"
                        startIcon={<Add />}
                        disableElevation
                        onClick={onAddButtonClicked}
                      >
                        {addButtonText}
                      </Button>
                    )}
                    {showImportButton && (
                      <FormLabel
                        htmlFor="studentFile"
                        title="Import students"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 1,
                          bgcolor: "primary.main",
                          color: "primary.contrastText",
                          padding: "12px 15px",
                          borderRadius: 1,
                          fontSize: 13,
                          cursor: "pointer",
                        }}
                      >
                        <PublishIcon />
                        <Typography variant="body2">
                          {importButtonText}
                        </Typography>

                        <Input
                          type="file"
                          id="studentFile"
                          name="studentFile"
                          hidden
                          inputProps={{
                            accept: ".xlsx,.xls,.csv",
                          }}
                          onChange={(event) => handleLoadFile(event)}
                          onClick={(e) => {
                            e.target.value = null;
                            e.currentTarget.value = null;
                          }}
                        />
                      </FormLabel>
                    )}
                  </Box>
                  <MTableToolbar {...props} />
                </>
              );
            },
            OverlayLoading: (props) => {
              return (
                <InfinitySpin
                  {...props}
                  width="200"
                  color={palette.primary.main}
                />
              );
            },
          }}
        />
      </Box>
    </AnimatedContainer>
  );
}

export default CustomizedMaterialTable;
