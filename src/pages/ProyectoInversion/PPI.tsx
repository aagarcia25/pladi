import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { ButtonsDetail } from "../../components/share/ButtonsDetail";
import MUIXDataGrid from "../../components/share/MUIXDataGrid";
import MsgAlert from "../../components/share/MsgAlert";
import VisorDocumentosOficios from "../../components/share/VisorDocumentosOficios";
import { AuthService } from "../../services/AuthService";
import Progress from "../../components/share/Progress";
const PPI = ({ tipo, Busqueda }: { tipo: string; Busqueda?: string }) => {
  const [idowner, setidowner] = useState<string>("");
  const [openModalFiles, setopenModalFiles] = useState(false);
  const [open, setopen] = useState(false);
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
      field: "Fecha",
      headerName: "Fecha",
      width: 100,
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
    setopen(true);
    let data = {
      TIPO: tipo,
      P_Id: id,
      BUSQUEDA: Busqueda,
    };

    AuthService.PPI(data).then((res) => {
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

export default PPI;
