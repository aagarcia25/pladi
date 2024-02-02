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
import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import { Dayjs } from "dayjs";
import CustomizedDate from "../../components/share/CustomizedDate";

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

  const handledatestar = (v: any) => {
    setfstart(v);
  };

  const handledateend = (v: any) => {
    setfend(v);
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
            <Grid item xs={2}>
              <CustomizedDate
                value={fstart}
                label={"Fecha Inicio"}
                onchange={handledatestar}
                disabled={false}
              />
            </Grid>
            <Grid item xs={2}>
              <CustomizedDate
                value={fend}
                label={"Fecha Fin"}
                onchange={handledateend}
                disabled={false}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                id="filled-multiline-static"
                label="Convenio"
                multiline
                rows={4}
                defaultValue="Describa el Convenio"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={2}></Grid>

            <Grid item xs={8}></Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleClose()}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
