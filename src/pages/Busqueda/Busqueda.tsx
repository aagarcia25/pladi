import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { Box, Container, Grid, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { AuthService } from "../../services/AuthService";
import MsgAlert from "../../components/share/MsgAlert";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DownloadingIcon from "@mui/icons-material/Downloading";
import { ButtonsDetail } from "../../components/share/ButtonsDetail";
import { GridColDef } from "@mui/x-data-grid";
import Progress from "../../components/share/Progress";
import { base64ToArrayBuffer } from "../../utils/Files";
import Swal from "sweetalert2";
import MUIXDataGrid from "../../components/share/MUIXDataGrid";
const Busqueda = () => {
  const [URLruta, setURLRuta] = useState<string>("");
  const [openSlider, setOpenSlider] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [explorerRoute, setexplorerRoute] = useState<string>("");
  const [verarchivo, setverarchivo] = useState(false);
  const [data, setData] = useState([]);

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

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    //clearTimeout(searchTimeout);
    const searchTimeout = setTimeout(() => {
      // Lógica para realizar la búsqueda
      console.log("Búsqueda realizada:", value);
      consulta();
    }, 2000); // Ajusta el tiempo de espera según tus necesidades
  };

  const consulta = () => {
    if (searchTerm !== "") {
      setOpenSlider(true);
      let data = {
        SEARCH: searchTerm,
      };

      AuthService.busquedaGeneral(data).then((res) => {
        if (res.NUMCODE == 200) {
          setData(res.RESPONSE);
          setOpenSlider(false);
        } else {
          MsgAlert("Error", res.STRMESSAGE, "error");
          setOpenSlider(false);
        }
      });
    }
  };

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

  return (
    <Container fixed>
      <Progress open={openSlider}></Progress>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box border={1} sx={{ display: "flex", alignItems: "flex-end" }}>
            <ManageSearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Buscar"
              variant="standard"
              fullWidth
              onChange={handleSearchChange}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={4} md={4} lg={4} paddingTop={"20px"}>
          <MUIXDataGrid columns={columns} rows={data} />
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8}>
          {verarchivo && URLruta !== "" ? (
            <iframe width="100%" height="100%" src={URLruta} />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Busqueda;
