import { MoreVertRounded } from "@mui/icons-material";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

const CustomTable = () => {
  return (
    <Scrollbars style={{ width: "100%", height: 300 }} autoHide>
      <Box sx={{ paddingY: 5 }}>
        <Typography variant="h6">Student Statistics</Typography>
        <TableContainer
          sx={{
            borderRadius: "10px",
            paddingY: 2,
            boxShadow: "0px 2px 10px  rgba(84,84,84,0.10)",
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Akwasi</TableCell>
                <TableCell>22</TableCell>
                <TableCell>6</TableCell>
                <TableCell>
                  <IconButton>
                    <MoreVertRounded />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Akwasi</TableCell>
                <TableCell>22</TableCell>
                <TableCell>6</TableCell>
                <TableCell>
                  <IconButton>
                    <MoreVertRounded />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Akwasi</TableCell>
                <TableCell>22</TableCell>
                <TableCell>6</TableCell>
                <TableCell>
                  <IconButton>
                    <MoreVertRounded />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Scrollbars>
  );
};

export default CustomTable;
