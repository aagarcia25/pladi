import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import MUIXDataGrid from "../../components/share/MUIXDataGrid";
import MsgAlert from "../../components/share/MsgAlert";
import { AuthService } from "../../services/AuthService";
import VisorDocumentos from "../../components/share/VisorDocumentos";
import { ButtonsDetail } from "../../components/share/ButtonsDetail";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import FeedIcon from "@mui/icons-material/Feed";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
const SIREGOB = () => {
  const [rows, setrows] = useState([]);

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
              title={"Ver Carpeta"}
              handleFunction={handleVerSub}
              show={true}
              icon={<DriveFolderUploadIcon />}
              row={v}
            ></ButtonsDetail>

            <ButtonsDetail
              title={"Ver Archivo del Proceso de Adquicisión"}
              handleFunction={handleVerSub}
              show={true}
              icon={<FeedIcon />}
              row={v}
            ></ButtonsDetail>

            <ButtonsDetail
              title={"Ver Entregables"}
              handleFunction={handleVerSub}
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

  const ProcesaData = (tipo: number, id?: string) => {
    let data = {
      TIPO: tipo,
      P_Id: id,
    };

    AuthService.siregob(data).then((res) => {
      if (res.NUMCODE == 200) {
        if (tipo == 1) {
          setrows(res.RESPONSE);
        }
      } else {
        MsgAlert("Error", res.STRMESSAGE, "error");
      }
    });
  };

  useEffect(() => {
    ProcesaData(1);
  }, []);

  return (
    <div>
      <MUIXDataGrid columns={columns} rows={rows} />

      {openModalFiles ? (
        <VisorDocumentos
          handleFunction={handleClose}
          idowner={idowner}
        ></VisorDocumentos>
      ) : (
        ""
      )}
    </div>
  );
};

export default SIREGOB;
