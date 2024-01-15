import { useEffect, useState } from "react";
import MsgAlert from "../../components/share/MsgAlert";
import { AuthService } from "../../services/AuthService";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  IconButton,
  Box,
  Collapse,
  Typography,
} from "@mui/material";
import { inapgral } from "../../interfaces/IShare";
import { formatFecha } from "../../utils/FormatDate";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const Inap = () => {
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});

  const [data, setData] = useState([]);

  const toggleRow = (rowId: any) => {
    setOpenRows((prevOpenRows: any) => {
      const isOpen = prevOpenRows[rowId] || false;
      return { ...prevOpenRows, [rowId]: !isOpen };
    });
  };

  const ProcesaData = (tipo: number) => {
    let data = {
      TIPO: tipo,
      P_Id: "",
      P_CreadoPor: "",
      P_FechaConveniogrlinicio: "",
      P_FechaConveniogrlfin: "",
      P_RouteConvenio: "",
      P_NombreFile: "",
      P_NombreConvenio: "",
    };

    AuthService.inapGralAll(data).then((res) => {
      if (res.NUMCODE == 200) {
        if (tipo == 4) {
          setData(res.RESPONSE);
        }
      } else {
        MsgAlert("Error", res.STRMESSAGE, "error");
      }
    });

    //navigate("/home/");
  };

  useEffect(() => {
    ProcesaData(4);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Clave</TableCell>
            <TableCell>Fecha Convenio</TableCell>
            <TableCell>Convenio</TableCell>
            <TableCell>Documentos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: inapgral) => (
            <>
              <TableRow
                key={row.Id}
                sx={{ "& > *": { borderBottom: "unset" } }}
              >
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => toggleRow(row.Id)}
                  >
                    {openRows[row.Id] ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell align="left">{row.Clave}</TableCell>
                <TableCell align="left">
                  {formatFecha(row.FechaConveniogrlinicio) +
                    "-" +
                    formatFecha(row.FechaConveniogrlfin)}
                </TableCell>
                <TableCell align="left">{row.NombreConvenio}</TableCell>
                <TableCell align="left">
                  <FilePresentIcon />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}
                >
                  <Collapse in={openRows[row.Id]} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                      <Typography variant="h6" gutterBottom component="div">
                        History
                      </Typography>
                      <Table size="small" aria-label="purchases">
                        <TableHead>
                          <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Total price ($)</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* {row.history.map((historyRow) => (
                            <TableRow key={historyRow.date}>
                              <TableCell component="th" scope="row">
                                {historyRow.date}
                              </TableCell>
                              <TableCell>{historyRow.customerId}</TableCell>
                              <TableCell align="right">
                                {historyRow.amount}
                              </TableCell>
                              <TableCell align="right">
                                {Math.round(
                                  historyRow.amount * row.price * 100
                                ) / 100}
                              </TableCell>
                            </TableRow>
                          ))} */}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Inap;
