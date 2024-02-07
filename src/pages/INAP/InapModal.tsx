import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Grid, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Dayjs } from "dayjs";
import CustomizedDate from "../../components/share/CustomizedDate";
import { AuthService } from "../../services/AuthService";
import MsgAlert from "../../components/share/MsgAlert";
import { getItem } from "../../services/localStorage";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function InapModal({ handleClose }: { handleClose: Function }) {
  const [fstart, setfstart] = useState<Dayjs | null>();
  const [fend, setfend] = useState<Dayjs | null>();
  const [convenio, setconvenio] = useState<string>();
  const user = JSON.parse(String(getItem("User"))) as any;
  const handledatestar = (v: any) => {
    setfstart(v);
  };

  const handledateend = (v: any) => {
    setfend(v);
  };

  const inserta = () => {
    let data = {
      TIPO: 1,
      P_CreadoPor: user.Id,
      P_FechaConveniogrlinicio: fstart,
      P_FechaConveniogrlfin: fend,
      P_NombreConvenio: convenio,
    };

    AuthService.inapGralAll(data).then((res) => {
      if (res.NUMCODE == 200) {
        MsgAlert(
          "Información",
          "Registro Agregado con correctamente",
          "success"
        );
      } else {
        MsgAlert("Error", res.STRMESSAGE, "error");
      }
    });
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        fullScreen
        onClose={() => handleClose()}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, textAlign: "center" }}
          id="customized-dialog-title"
        >
          <Typography variant="h4" gutterBottom>
            Registro de Información
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => handleClose()}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2} md={2} lg={2}>
              <CustomizedDate
                value={fstart}
                label={"Fecha Inicio"}
                onchange={handledatestar}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={2} md={2} lg={2}>
              <CustomizedDate
                value={fend}
                label={"Fecha Fin"}
                onchange={handledateend}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <TextField
                fullWidth
                id="filled-multiline-static"
                label="Convenio"
                multiline
                rows={4}
                defaultValue=""
                value={convenio}
                onChange={(v) => {
                  setconvenio(v.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent="center" // Centra horizontalmente en el contenedor
            alignItems="center" // Centra verticalmente en el contenedor
            marginTop={10}
          >
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="success"
                onClick={() => inserta()}
              >
                Guardar
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleClose()}
              >
                Salir
              </Button>
            </Stack>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
