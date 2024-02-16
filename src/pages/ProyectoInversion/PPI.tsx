import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import MUIXDataGrid from "../../components/share/MUIXDataGrid";
import { AuthService } from "../../services/AuthService";
import MsgAlert from "../../components/share/MsgAlert";

const PPI = () => {
  const [rows, setrows] = useState([]);

  const columns: GridColDef[] = [
    {
      field: "id",
      hideable: false,
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
    </div>
  );
};

export default PPI;
