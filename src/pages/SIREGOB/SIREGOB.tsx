import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FeedIcon from "@mui/icons-material/Feed";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { ButtonsDetail } from "../../components/share/ButtonsDetail";
import MUIXDataGrid from "../../components/share/MUIXDataGrid";
import MsgAlert from "../../components/share/MsgAlert";
import VisorDocumentosOficios from "../../components/share/VisorDocumentosOficios";
import { AuthService } from "../../services/AuthService";
import Progress from "../../components/share/Progress";
const SIREGOB = ({ tipo, Busqueda }: { tipo: string; Busqueda?: string }) => {
  const [rows, setrows] = useState([]);
  const [open, setopen] = useState(false);
  const [idowner, setidowner] = useState<string>("");
  const [openModalFiles, setopenModalFiles] = useState(false);

  const columns: GridColDef[] = [
    {
      field: "id",
      hideable: false,
    },

    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <>
            <ButtonsDetail
              title={"Ver Archivo del Proceso de Adquicisión"}
              handleFunction={handleVerSub}
              show={true}
              icon={<FeedIcon />}
              row={v}
            ></ButtonsDetail>

            <ButtonsDetail
              title={"Ver Entregables"}
              handleFunction={handleVerEntregables}
              show={true}
              icon={<AutoStoriesIcon />}
              row={v}
            ></ButtonsDetail>
          </>
        );
      },
    },

    {
      field: "FechaContrato",
      headerName: "Fecha de Contrato",
      description: "Fecha de Contrato",
      width: 150,
    },

    {
      field: "idContrato",
      headerName: "Contrato",
      description: "Contrato",
      width: 220,
    },
    {
      field: "NombreContrato",
      headerName: "Nombre Contrato",
      description: "Nombre Contrato",
      width: 300,
    },

    {
      field: "ObjetivoContrato",
      headerName: "Objetivo",
      description: "Objetivo",
      width: 300,
    },

    {
      field: "MontoContrato",
      headerName: "Importe",
      description: "Importe",
      width: 250,
    },
  ];

  const handleClose = () => {
    setopenModalFiles(false);
  };

  const handleVerSub = (v: any) => {
    console.log(v);
    setidowner(v.row.Id);
    setopenModalFiles(true);
  };

  const handleVerEntregables = (v: any) => {
    console.log(v);
    setidowner(v.row.Id + "/Entregables");
    setopenModalFiles(true);
  };

  const ProcesaData = (tipo: number, id?: string) => {
    let data = {
      TIPO: tipo,
      P_Id: id,
      BUSQUEDA: Busqueda,
    };

    AuthService.siregob(data).then((res) => {
      if (res.NUMCODE === 200) {
        if (tipo == 1) {
          setrows(res.RESPONSE);
          setopen(false);
        } else if (tipo == 5) {
          setrows(res.RESPONSE);
          setopen(false);
        }
      } else {
        MsgAlert("Error", res.STRMESSAGE, "error");
      }
    });
  };

  useEffect(() => {
    console.log(tipo);
    if (tipo == "CONS") {
      ProcesaData(1);
    } else {
      ProcesaData(5);
    }
  }, [Busqueda]);

  return (
    <div>
      <Progress open={open}></Progress>
      <MUIXDataGrid columns={columns} rows={rows} />

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

export default SIREGOB;
