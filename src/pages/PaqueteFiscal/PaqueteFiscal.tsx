import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { ButtonsDetail } from "../../components/share/ButtonsDetail";
import MUIXDataGrid from "../../components/share/MUIXDataGrid";
import MsgAlert from "../../components/share/MsgAlert";
import VisorDocumentosOficios from "../../components/share/VisorDocumentosOficios";
import { AuthService } from "../../services/AuthService";
import Progress from "../../components/share/Progress";
import FilePresentIcon from "@mui/icons-material/FilePresent";
const PaqueteFiscal = ({
  tipo,
  Busqueda,
}: {
  tipo: string;
  Busqueda?: string;
}) => {
  const [idowner, setidowner] = useState<string>("");
  const [openModalFiles, setopenModalFiles] = useState(false);
  const [open, setopen] = useState(false);
  const [rows, setrows] = useState([]);

  const handleClose = () => {
    setopenModalFiles(false);
  };

  const handleVerSub = (v: any, tipo: string) => {
    setidowner(v.row.Anio + "\\LEY_" + tipo);
    //  setidowner(v.row.Anio + "/LEY_" + tipo);
    setopenModalFiles(true);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      hideable: false,
    },

    {
      field: "Anio",
      headerName: "Año",
      width: 150,
    },

    {
      field: "lingresos",
      disableExport: true,
      headerName: "Ley de Ingresos",
      description: "Ley de Ingresos",
      sortable: false,
      width: 120,
      renderCell: (v) => {
        return (
          <>
            <ButtonsDetail
              title={"Ver Carpeta"}
              handleFunction={() => handleVerSub(v, "INGRESO")}
              show={true}
              icon={<FilePresentIcon />}
              row={v}
            ></ButtonsDetail>
          </>
        );
      },
    },
    {
      field: "leyegresos",
      disableExport: true,
      headerName: "Ley de Egresos",
      description: "Ley de Egresos",
      sortable: false,
      width: 120,
      renderCell: (v) => {
        return (
          <>
            <ButtonsDetail
              title={"Ver Carpeta"}
              handleFunction={() => handleVerSub(v, "EGRESO")}
              show={true}
              icon={<FilePresentIcon />}
              row={v}
            ></ButtonsDetail>
          </>
        );
      },
    },
  ];

  const ProcesaData = (tipo: number, id?: string) => {
    setopen(true);
    let data = {
      TIPO: tipo,
      P_Id: id,
    };

    AuthService.PF(data).then((res) => {
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

export default PaqueteFiscal;
