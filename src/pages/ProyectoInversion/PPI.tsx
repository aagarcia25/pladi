import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import MUIXDataGrid from "../../components/share/MUIXDataGrid";
import { AuthService } from "../../services/AuthService";
import MsgAlert from "../../components/share/MsgAlert";
import { ButtonsDetail } from "../../components/share/ButtonsDetail";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import VisorDocumentos from "../../components/share/VisorDocumentos";
const PPI = () => {
  const [idowner, setidowner] = useState<string>("");
  const [openModalFiles, setopenModalFiles] = useState(false);
  const [rows, setrows] = useState([]);

  const handleClose = () => {
    setopenModalFiles(false);
  };

  const handleVerSub = (v: any) => {
    console.log(v);
    setidowner(v.row.Id);
    setopenModalFiles(true);
  };

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
      field: "Noficio",
      headerName: "Numero de Oficio",
      description: "Numero de Oficio",
      width: 150,
    },
    {
      field: "TipoOficio",
      headerName: "Tipo de Oficio",
      description: "Tipo de Oficio",
      width: 150,
    },
    {
      field: "Dependencia",
      headerName: "Dependencia",
      description: "Dependencia",
      width: 250,
    },
    {
      field: "Descripcion",
      headerName: "Descripción",
      description: "Descripción",
      width: 250,
    },

    {
      field: "Importe",
      headerName: "Importe",
      description: "Importe",
      width: 250,
    },
  ];

  const ProcesaData = (tipo: number, id?: string) => {
    let data = {
      TIPO: tipo,
      P_Id: id,
    };

    AuthService.PPI(data).then((res) => {
      if (res.NUMCODE == 200) {
        if (tipo == 4) {
          setrows(res.RESPONSE);
        }
      } else {
        MsgAlert("Error", res.STRMESSAGE, "error");
      }
    });
  };

  useEffect(() => {
    ProcesaData(4);
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

export default PPI;
