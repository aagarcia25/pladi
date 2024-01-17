import FilePresentIcon from "@mui/icons-material/FilePresent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import MsgAlert from "../../components/share/MsgAlert";
import {
  entregables,
  inapgral,
  inapgral01,
  pagos,
} from "../../interfaces/IShare";
import { AuthService } from "../../services/AuthService";
import { formatFecha } from "../../utils/FormatDate";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
const Inap = () => {
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});
  const [openRows01, setOpenRows01] = useState<{ [key: string]: boolean }>({});
  const [openRows02, setOpenRows02] = useState<{ [key: string]: boolean }>({});

  const [data, setData] = useState([]);
  const [dataCE, setDataCE] = useState([]);
  const [dataEN, setDataEN] = useState([]);
  const [dataPD, setDataPD] = useState([]);

  const toggleRow = (rowId: string) => {
    setOpenRows((prevOpenRows: Record<string, boolean>) => {
      const isOpen = prevOpenRows[rowId] || false;
      console.log("isOpen:", isOpen);
      return { ...prevOpenRows, [rowId]: !isOpen };
    });
  };

  const toggleRow01 = (rowId: string) => {
    setOpenRows01((prevOpenRows: Record<string, boolean>) => {
      const isOpen = prevOpenRows[rowId] || false;
      console.log("isOpen:", isOpen);
      return { ...prevOpenRows, [rowId]: !isOpen };
    });
  };

  const toggleRow02 = (rowId: string) => {
    setOpenRows02((prevOpenRows: Record<string, boolean>) => {
      const isOpen = prevOpenRows[rowId] || false;
      console.log("isOpen:", isOpen);
      return { ...prevOpenRows, [rowId]: !isOpen };
    });
  };

  const ProcesaData01 = (tipo: number, idGral: string) => {
    let data = {
      TIPO: tipo,
      P_IdGral: idGral,
    };

    AuthService.inapGral01All(data).then((res) => {
      if (res.NUMCODE == 200) {
        if (tipo == 5) {
          setDataCE(res.RESPONSE);
        } else if (tipo == 6) {
          setDataEN(res.RESPONSE);
        } else if (tipo == 7) {
          setDataPD(res.RESPONSE);
        }
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
  };

  useEffect(() => {
    ProcesaData(4);
  }, []);

  const renderPagos = (dataPD: any) => {
    return (
      <Box sx={{ margin: 1 }}>
        <>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  Detalle de Pago
                </TableCell>
              </TableRow>
              <TableRow key={Math.random()}>
                <TableCell></TableCell>
                <TableCell>Fecha Entrega Presupuesto</TableCell>
                <TableCell>Fecha de Pago</TableCell>
                <TableCell>Nombre SPEI</TableCell>
                <TableCell>PDF SPEI</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataPD.map((item: pagos) => (
                <TableRow key={item.Id}>
                  <TableCell component="th" scope="row">
                    <ButtonGroup variant="text">
                      <Button
                        onClick={() => {
                          alert("Agregar");
                        }}
                      >
                        <Tooltip title={"Agregar Registro"}>
                          <AddCircleOutlineIcon />
                        </Tooltip>
                      </Button>
                      <Button
                        onClick={() => {
                          alert("Agregar");
                        }}
                      >
                        <Tooltip title={"Editar Registro"}>
                          <EditIcon />
                        </Tooltip>
                      </Button>
                      <Button
                        onClick={() => {
                          alert("Agregar");
                        }}
                      >
                        <Tooltip title={"Eliminar Registro"}>
                          <DeleteForeverIcon />
                        </Tooltip>
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {formatFecha(item.FechaPresupuesto)}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {formatFecha(item.FechaPAgo)}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {item.NombreFile}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    <FilePresentIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      </Box>
    );
  };

  const renderEntregable = (dataEN: any) => {
    return (
      <Box sx={{ margin: 1 }}>
        <>
          <Typography variant="h6" gutterBottom component="div">
            Detalle
          </Typography>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  Entregable
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  Actas
                </TableCell>
                <TableCell align="center" colSpan={5}>
                  Factura
                </TableCell>
              </TableRow>
              <TableRow key={Math.random()}>
                <TableCell></TableCell>
                <TableCell>Clave</TableCell>
                <TableCell>Entregable</TableCell>
                <TableCell>PDF Entregable</TableCell>
                <TableCell></TableCell>
                <TableCell>Fecha acta de entrega</TableCell>
                <TableCell>PDF Acta de entrega</TableCell>
                <TableCell> </TableCell>
                <TableCell>Fecha de factura </TableCell>
                <TableCell>Factura </TableCell>
                <TableCell>PDF Factura </TableCell>
                <TableCell>Monto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataEN.map((item: entregables) => (
                <>
                  <TableRow key={item.inap0101_Id}>
                    <TableCell component="th" scope="row">
                      <ButtonGroup variant="text">
                        <Button
                          onClick={() => {
                            alert("Agregar");
                          }}
                        >
                          <Tooltip title={"Agregar Registro"}>
                            <AddCircleOutlineIcon />
                          </Tooltip>
                        </Button>
                        <Button
                          onClick={() => {
                            alert("Agregar");
                          }}
                        >
                          <Tooltip title={"Editar Registro"}>
                            <EditIcon />
                          </Tooltip>
                        </Button>
                        <Button
                          onClick={() => {
                            alert("Agregar");
                          }}
                        >
                          <Tooltip title={"Eliminar Registro"}>
                            <DeleteForeverIcon />
                          </Tooltip>
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.inap0101_Clave}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {item.inap0101_Nombre}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      <FilePresentIcon />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <ButtonGroup variant="text">
                        <Button
                          onClick={() => {
                            alert("Agregar");
                          }}
                        >
                          <Tooltip title={"Agregar Registro"}>
                            <AddCircleOutlineIcon />
                          </Tooltip>
                        </Button>
                        <Button
                          onClick={() => {
                            alert("Agregar");
                          }}
                        >
                          <Tooltip title={"Editar Registro"}>
                            <EditIcon />
                          </Tooltip>
                        </Button>
                        <Button
                          onClick={() => {
                            alert("Agregar");
                          }}
                        >
                          <Tooltip title={"Eliminar Registro"}>
                            <DeleteForeverIcon />
                          </Tooltip>
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {formatFecha(item.inap0102_FechaActa)}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      <FilePresentIcon />
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <ButtonGroup variant="text">
                        <Button
                          onClick={() => {
                            ProcesaData01(7, item.inap0103_Id);
                            toggleRow02(item.inap0103_Id);
                          }}
                        >
                          <Tooltip title={"Agregar Registro"}>
                            {openRows02[item.inap0103_Id] ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </Tooltip>
                        </Button>

                        <Button
                          onClick={() => {
                            alert("Agregar");
                          }}
                        >
                          <Tooltip title={"Agregar Registro"}>
                            <AddCircleOutlineIcon />
                          </Tooltip>
                        </Button>
                        <Button
                          onClick={() => {
                            alert("Agregar");
                          }}
                        >
                          <Tooltip title={"Editar Registro"}>
                            <EditIcon />
                          </Tooltip>
                        </Button>
                        <Button
                          onClick={() => {
                            alert("Agregar");
                          }}
                        >
                          <Tooltip title={"Eliminar Registro"}>
                            <DeleteForeverIcon />
                          </Tooltip>
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {formatFecha(item.inap0103_FechaFactura)}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {item.inap0103_Factura}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      <FilePresentIcon />
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {item.inap0103_Monto}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={openRows02[item.inap0103_Id]}
                        timeout="auto"
                        unmountOnExit
                      >
                        {renderPagos(dataPD)}
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </>
      </Box>
    );
  };

  const renderConvenioEspecifico = (dataCE: any) => {
    return (
      <Box sx={{ margin: 1 }}>
        <Typography variant="h6" gutterBottom component="div">
          Convenio Específico
        </Typography>
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow key={Math.random()}>
              <TableCell></TableCell>
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
              <>
                <TableRow key={item.Id}>
                  <TableCell component="th" scope="row">
                    <ButtonGroup variant="text">
                      <Button
                        onClick={() => {
                          ProcesaData01(6, item.Id);
                          toggleRow01(item.Id);
                        }}
                      >
                        <Tooltip title={"Ver Detalle"}>
                          {openRows01[item.Id] ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </Tooltip>
                      </Button>
                      <Button
                        onClick={() => {
                          alert("Agregar");
                        }}
                      >
                        <Tooltip title={"Agregar Registro"}>
                          <AddCircleOutlineIcon />
                        </Tooltip>
                      </Button>
                      <Button
                        onClick={() => {
                          alert("Agregar");
                        }}
                      >
                        <Tooltip title={"Editar Registro"}>
                          <EditIcon />
                        </Tooltip>
                      </Button>
                      <Button
                        onClick={() => {
                          alert("Agregar");
                        }}
                      >
                        <Tooltip title={"Eliminar Registro"}>
                          <DeleteForeverIcon />
                        </Tooltip>
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {formatFecha(item.FechaConvenioinicio) +
                      "-" +
                      formatFecha(item.FechaConveniofin)}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {item.NombreConvenio}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    <FilePresentIcon />
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {item.Objetivo}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {item.Monto}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {formatFecha(item.FechaFiniquito)}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    <FilePresentIcon />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={openRows01[item.Id]}
                      timeout="auto"
                      unmountOnExit
                    >
                      {renderEntregable(dataEN)}
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
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
          <TableRow key={Math.random()}>
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
                <TableCell component="th" scope="row">
                  <ButtonGroup variant="text">
                    <Button
                      onClick={() => {
                        ProcesaData01(5, row.Id);
                        toggleRow(row.Id);
                      }}
                    >
                      <Tooltip title={"Ver Detalle"}>
                        {openRows[row.Id] ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </Tooltip>
                    </Button>

                    <Button
                      onClick={() => {
                        alert("Agregar");
                      }}
                    >
                      <Tooltip title={"Agregar Registro"}>
                        <AddCircleOutlineIcon />
                      </Tooltip>
                    </Button>
                    <Button
                      onClick={() => {
                        alert("Agregar");
                      }}
                    >
                      <Tooltip title={"Editar Registro"}>
                        <EditIcon />
                      </Tooltip>
                    </Button>
                    <Button
                      onClick={() => {
                        alert("Agregar");
                      }}
                    >
                      <Tooltip title={"Eliminar Registro"}>
                        <DeleteForeverIcon />
                      </Tooltip>
                    </Button>
                  </ButtonGroup>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {row.Clave}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {formatFecha(row.FechaConveniogrlinicio) +
                    "-" +
                    formatFecha(row.FechaConveniogrlfin)}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {row.NombreConvenio}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
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
