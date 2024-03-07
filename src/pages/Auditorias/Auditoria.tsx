import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { ButtonsDetail } from "../../components/share/ButtonsDetail";
import MUIXDataGrid from "../../components/share/MUIXDataGrid";
import MsgAlert from "../../components/share/MsgAlert";
import VisorDocumentosOficios from "../../components/share/VisorDocumentosOficios";
import { AuthService } from "../../services/AuthService";
import Progress from "../../components/share/Progress";
const Auditoria = ({ tipo, Busqueda }: { tipo: string; Busqueda?: string }) => {
  const [idowner, setidowner] = useState<string>("");
  const [openModalFiles, setopenModalFiles] = useState(false);
  const [open, setopen] = useState(false);
  const [rows, setrows] = useState([]);

  const handleClose = () => {
    setopenModalFiles(false);
  };

  const handleVerSub = (v: any) => {
    console.log(v);
    const [dia, mes, anio] = v.row.FechaOficio.split("/");
    const fecha = new Date(`${anio}-${mes}-${dia}`);
    const anioObtenido = fecha.getFullYear();
    console.log(anioObtenido);
    setidowner("/AUDITORIA/FOLIOS/" + anioObtenido + "/" + v.row.Folio);
    setopenModalFiles(true);
  };

  const handleVerSub2 = (v: any) => {
    console.log(v);
    const [dia, mes, anio] = v.row.FechaOficio.split("/");
    const fecha = new Date(`${anio}-${mes}-${dia}`);
    const anioObtenido = fecha.getFullYear();
    console.log(anioObtenido);
    setidowner(
      "/AUDITORIA/CONTESTACION/" +
        anioObtenido +
        "/" +
        v.row.NumOficioContestacion
    );
    setopenModalFiles(true);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      hideable: false,
    },

    {
      field: "oficio",
      disableExport: true,
      headerName: "Oficio",
      description: "Oficio",
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
      field: "oficioContestacion",
      disableExport: true,
      headerName: "Oficio Contestación",
      description: "Oficio Contestación",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <>
            {v.row.NumOficioContestacion ? (
              <ButtonsDetail
                title={"Ver Carpeta"}
                handleFunction={handleVerSub2}
                show={true}
                icon={<DriveFolderUploadIcon />}
                row={v}
              ></ButtonsDetail>
            ) : (
              ""
            )}
          </>
        );
      },
    },
    {
      field: "FechaOficio",
      headerName: "FechaOficio",
      description: "FechaOficio",
      width: 100,
    },
    {
      field: "Folio",
      headerName: "Folio",
      width: 100,
    },
    {
      field: "OficioDependencia",
      headerName: "Oficio de la Dependencia",
      description: "Oficio de la Dependencia",
      width: 250,
    },
    {
      field: "Secretaria",
      headerName: "Secretaría",
      description: "Secretaría",
      width: 350,
    },
    {
      field: "Dependencia",
      headerName: "Dependencia",
      description: "Dependencia",
      width: 350,
    },
    {
      field: "TipoGasto",
      headerName: " Tipo de Gasto",
      description: " Tipo de Gasto",
      width: 250,
    },

    {
      field: "Responsable",
      headerName: "Responsable",
      description: "Responsable",
      width: 350,
    },
    {
      field: "TipoSolicitud",
      headerName: "Tipo de Solicitud",
      description: "Tipo de Solicitud",
      width: 350,
    },

    {
      field: "FechaRecepcion",
      headerName: "Fecha de Recepcion",
      description: "Fecha de Recepcion",
      width: 100,
    },
    {
      field: "FechaElaboracion",
      headerName: "Fecha de Elaboracion",
      description: "Fecha de Elaboracion",
      width: 100,
    },
    {
      field: "FechaVencimiento",
      headerName: "Fecha de Vencimiento",
      description: "Fecha de Vencimiento",
      width: 100,
    },
    {
      field: "Monto",
      headerName: "Monto",
      description: "Monto",
      width: 250,
    },
    {
      field: "Comentarios",
      headerName: "Comentarios",
      description: "Comentarios",
      width: 750,
    },
    {
      field: "FechaTurno",
      headerName: "Fecha en que se Turno",
      description: "Fecha en que se Turno",
      width: 100,
    },
    {
      field: "ObservacionesEstatus",
      headerName: "Observaciones del Estatus",
      description: "Observaciones del Estatus",
      width: 500,
    },
    {
      field: "NumOficioContestacion",
      headerName: "Num. De Oficio de Contestacion",
      description: "Num. De Oficio de Contestacion",
      width: 250,
    },
    {
      field: "FechaTurnada",
      headerName: "Fecha Turnada",
      description: "Fecha Turnada",
      width: 100,
    },
    {
      field: "FechaTerminada",
      headerName: "Fecha Terminada",
      description: "Fecha Terminada",
      width: 100,
    },
    {
      field: "ObsTerminada",
      headerName: " Obs. Terminada",
      description: " Obs. Terminada",
      width: 500,
    },
    {
      field: "AutNoAut",
      headerName: "Aut/NoAut",
      description: "Aut/NoAut",
      width: 150,
    },
  ];

  const ProcesaData = (tipo: number, id?: string) => {
    setopen(true);
    let data = {
      TIPO: tipo,
      P_Id: id,
      BUSQUEDA: Busqueda,
    };

    AuthService.AUDITORIA(data).then((res) => {
      if (res.NUMCODE == 200) {
        if (tipo == 4) {
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
      ProcesaData(4);
    } else {
      ProcesaData(5);
    }
  }, [Busqueda]);
  return (
    <div style={{ width: "100%" }}>
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

export default Auditoria;
