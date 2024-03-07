import DownloadingIcon from "@mui/icons-material/Downloading";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ButtonsDetail } from "../../components/share/ButtonsDetail";
import MUIXDataGridSimple from "../../components/share/MUIXDataGridSimple";
import Progress from "../../components/share/Progress";
import { AuthService } from "../../services/AuthService";
import { base64ToArrayBuffer } from "../../utils/Files";
import Auditoria from "../Auditorias/Auditoria";
import PaqueteFiscal from "../PaqueteFiscal/PaqueteFiscal";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import PPI from "../ProyectoInversion/PPI";
import SIREGOB from "../SIREGOB/SIREGOB";
import MsgAlert from "../../components/share/MsgAlert";
import VisorDocumentosOficios from "../../components/share/VisorDocumentosOficios";
const Busqueda = () => {
  const [idowner, setidowner] = useState<string>("");
  const [openModalFiles, setopenModalFiles] = useState(false);
  const [URLruta, setURLRuta] = useState<string>("");
  const [openSlider, setOpenSlider] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [busqueda, setBusqueda] = useState<string>("");
  const [explorerRoute, setexplorerRoute] = useState<string>("");
  const [verarchivo, setverarchivo] = useState(false);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  const handleClose = () => {
    setopenModalFiles(false);
  };
  const handleVerSub = (v: any) => {
    console.log(v);
    setidowner(v.row.idorigen);
    setopenModalFiles(true);
  };

  const ProcesaData01 = () => {
    let data = {
      TIPO: 5,
      BUSQUEDA: searchTerm,
    };

    AuthService.inapGralAll(data).then((res) => {
      if (res.NUMCODE == 200) {
        setData(res.RESPONSE);
      } else {
        MsgAlert("Error", res.STRMESSAGE, "error");
      }
    });
  };

  const handleDescargarFile = (v: any) => {
    setOpenSlider(true);
    let data = {
      NUMOPERACION: 5,
      P_ROUTE: explorerRoute,
      P_NOMBRE: v.row.name,
    };

    AuthService.getFile(data).then((res) => {
      if (res.SUCCESS) {
        var bufferArray = base64ToArrayBuffer(String(res.RESPONSE.FILE));
        var blobStore = new Blob([bufferArray], { type: res.RESPONSE.TIPO });
        var data = window.URL.createObjectURL(blobStore);
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.href = data;
        link.download = v.row.name;
        link.click();
        window.URL.revokeObjectURL(data);
        link.remove();
        setOpenSlider(false);
      } else {
        setOpenSlider(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  const handleVer = (v: any) => {
    console.log(v);
    setOpenSlider(true);
    let data = {
      NUMOPERACION: 5,
      P_ROUTE: v.row.path,
      P_TIPO: v.row.type,
    };

    AuthService.getFileBusqueda(data).then((res) => {
      if (res.SUCCESS) {
        var bufferArray = base64ToArrayBuffer(String(res.RESPONSE.FILE));
        var blobStore = new Blob([bufferArray], { type: "application/pdf" });
        var data = window.URL.createObjectURL(blobStore);
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.href = data;
        setURLRuta(link.href);
        setOpenSlider(false);
        setverarchivo(true);
      } else {
        setOpenSlider(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  const columnsinap: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      width: 10,
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 50,
      renderCell: (v) => {
        return (
          <>
            <ButtonsDetail
              title={"Ver Carpeta"}
              handleFunction={handleVerSub}
              show={true}
              icon={<DriveFolderUploadIcon />}
              row={v}
            ></ButtonsDetail>
          </>
        );
      },
    },
    {
      field: "clavegeneral",
      headerName: "Clave General",
      width: 100,
    },
    {
      field: "FechaConveniogrlinicio",
      headerName: "Fecha Convenio Inicio",
      width: 150,
    },
    {
      field: "FechaConveniogrlfin",
      headerName: "Fecha Convenio Fin",
      width: 150,
    },
    {
      field: "nombregeneral",
      headerName: "Convenio",
      width: 250,
    },
    {
      field: "Clave",
      headerName: "Clave",
      width: 10,
    },
    {
      field: "FechaConvenioinicio",
      headerName: "Convenio específico inicio",
      width: 150,
    },
    {
      field: "FechaConveniofin",
      headerName: "Convenio específico Fin",
      width: 150,
    },
    {
      field: "NombreConvenio",
      headerName: "Nombre Convenio",
      width: 300,
    },
    {
      field: "Objetivo",
      headerName: "Objetivo",
      width: 550,
    },
    {
      field: "Monto",
      headerName: "Monto",
      width: 150,
    },
    {
      field: "FechaFiniquito",
      headerName: "Fecha Finiquito",
      width: 150,
    },
  ];
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      width: 10,
    },

    {
      field: "name",
      headerName: "Nombre",
      width: 250,
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 100,
      renderCell: (v) => {
        return (
          <>
            <ButtonsDetail
              title={"Ver"}
              handleFunction={handleVer}
              show={true}
              icon={<RemoveRedEyeIcon />}
              row={v}
            ></ButtonsDetail>
            <ButtonsDetail
              title={"Descargar"}
              handleFunction={handleDescargarFile}
              show={true}
              icon={<DownloadingIcon />}
              row={v}
            ></ButtonsDetail>
          </>
        );
      },
    },
  ];

  const consulta = () => {
    if (searchTerm !== "") {
      setBusqueda(searchTerm);
      setReload((prevState) => !prevState);
      ProcesaData01();
    }
  };

  useEffect(() => {
    console.log(searchTerm);
  }, [reload]); // Observa cambios en searchTerm

  return (
    <div>
      <Progress open={openSlider}></Progress>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Box border={1} sx={{ display: "flex", alignItems: "flex-end" }}>
            <ManageSearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Buscar"
              variant="standard"
              value={searchTerm}
              onChange={(v) => {
                setSearchTerm(v.target.value);
              }}
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={() => {
              consulta();
            }}
            variant="contained"
            color="success"
          >
            Buscar
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Typography
            component="h1"
            variant="h6"
            color="#000000"
            noWrap
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Auditorías
          </Typography>
          <Auditoria tipo={"BUS"} Busqueda={busqueda}></Auditoria>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Typography
            component="h1"
            variant="h6"
            color="#000000"
            noWrap
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Oficios Presupuesto
          </Typography>
          {/* <MUIXDataGridSimple columns={columns} rows={data} /> */}
        </Grid>

        {/* <Grid item xs={12} sm={4} md={4} lg={4} paddingTop={"20px"}>
          <MUIXDataGrid columns={columns} rows={data} />
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8}>
          {verarchivo && URLruta !== "" ? (
            <iframe width="100%" height="100%" src={URLruta} />
          ) : (
            ""
          )}
        </Grid> */}
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Typography
            component="h1"
            variant="h6"
            color="#000000"
            noWrap
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Oficios DAMOP
          </Typography>
          {/* <MUIXDataGridSimple columns={columns} rows={data} /> */}
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Typography
            component="h1"
            variant="h6"
            color="#000000"
            noWrap
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Oficios ONU
          </Typography>
          {/* <MUIXDataGridSimple columns={columns} rows={data} /> */}
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Typography
            component="h1"
            variant="h6"
            color="#000000"
            noWrap
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Proyectos de Inversión
          </Typography>
          <PPI tipo={"BUS"} Busqueda={busqueda}></PPI>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Typography
            component="h1"
            variant="h6"
            color="#000000"
            noWrap
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Paquete Fiscal
          </Typography>
          {/* <PaqueteFiscal tipo={"BUS"} Busqueda={busqueda}></PaqueteFiscal> */}
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Typography
            component="h1"
            variant="h6"
            color="#000000"
            noWrap
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            INAP
          </Typography>
          <MUIXDataGridSimple columns={columnsinap} rows={data} />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Typography
            component="h1"
            variant="h6"
            color="#000000"
            noWrap
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            SIREGOB
          </Typography>
          <SIREGOB tipo={"BUS"} Busqueda={busqueda}></SIREGOB>
        </Grid>
      </Grid>

      {openModalFiles ? (
        <VisorDocumentosOficios
          handleFunction={handleClose}
          obj={idowner}
        ></VisorDocumentosOficios>
      ) : (
        ""
      )}
    </div>
  );
};

export default Busqueda;
