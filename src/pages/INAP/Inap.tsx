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
import { inapgral, inapgral01 } from "../../interfaces/IShare";
import { formatFecha } from "../../utils/FormatDate";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const Inap = () => {
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});

  const [data, setData] = useState([]);
  const [dataCE, setDataCE] = useState([]);

  const toggleRow = (rowId: string) => {
    setOpenRows((prevOpenRows: Record<string, boolean>) => {
      const isOpen = prevOpenRows[rowId] || false;
      // Cerrar todos los demás rowIds
      const updatedOpenRows: Record<string, boolean> = {};
      Object.keys(prevOpenRows).forEach((id) => {
        updatedOpenRows[id] = id === rowId ? !isOpen : false;
      });
      return updatedOpenRows;
    });
  };

  const ProcesaData01 = (tipo: number, idGral: string) => {
    let data = {
      TIPO: 5,
      P_IdGral: idGral,
    };

    AuthService.inapGral01All(data).then((res) => {
      if (res.NUMCODE == 200) {
        setDataCE(res.RESPONSE);
      } else {
        MsgAlert("Error", res.STRMESSAGE, "error");
      }
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

  const renderConvenioEspecifico = (dataCE: any) => {
    return (
      <Box sx={{ margin: 1 }}>
        <Typography variant="h6" gutterBottom component="div">
          Convenio Específico
        </Typography>
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow>
              <TableCell>Fecha Convenio Específico</TableCell>
              <TableCell>Nombre Convenio Específico</TableCell>
              <TableCell>PDF Convenio Específico</TableCell>
              <TableCell>Objetivo del Convenio Específico</TableCell>
              <TableCell>Monto Convenio Específico</TableCell>
              <TableCell>Fecha Finiquito</TableCell>
              <TableCell>PDF Finiquito</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataCE.map((item: inapgral01) => (
              <TableRow key={item.Id}>
                <TableCell component="th" scope="row">
                  {formatFecha(item.FechaConvenioinicio) +
                    "-" +
                    formatFecha(item.FechaConveniofin)}
                </TableCell>
                <TableCell align="left">{item.NombreConvenio}</TableCell>
                <TableCell align="left">
                  <FilePresentIcon />
                </TableCell>
                <TableCell align="left">{item.Objetivo}</TableCell>
                <TableCell align="left">{item.Monto}</TableCell>
                <TableCell align="left">
                  {formatFecha(item.FechaFiniquito)}
                </TableCell>
                <TableCell align="left">
                  <FilePresentIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  };

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
                    onClick={() => {
                      toggleRow(row.Id);
                      ProcesaData01(5, row.Id);
                    }}
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
                    {renderConvenioEspecifico(dataCE)}
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
