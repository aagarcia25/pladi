import LoginIcon from "@mui/icons-material/Login";
import {
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logonuevoleon.png";
import tesoreria from "../assets/tesoreria.png";
import Progress from "../components/share/Progress";
import { AuthService } from "../services/AuthService";
import { setItem } from "../services/localStorage";
const SignIn = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [slideropen, setslideropen] = useState(false);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const login = () => {
    let data = {
      P_Usuario: username,
      P_Password: pass,
    };
    AuthService.login(data).then((res) => {
      if (res.NUMCODE == 200) {
        localStorage.clear();
        setItem(res.RESPONSE[0], "User");
        setItem(res.RESPONSE[0].Tipo, "Tipo");
        navigate("/home/");
      } else {
        localStorage.clear();
        Swal.fire({
          title: "Acceso",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });

    //navigate("/home/");
  };
  return (
    <div>
      <Progress open={slideropen}></Progress>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // Cambiar a sx=
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor:
              theme.palette.mode === "light" // Cambiar a theme.palette.mode
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img src={tesoreria} alt="Descripción" style={{ maxWidth: "100%" }} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={1}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="Descripción"
            style={{
              width: "25%",
              height: "25%",
              objectFit: "contain",
            }}
          />
          <Typography
            variant={isSmallScreen ? "subtitle1" : "h5"}
            sx={{
              textAlign: "center", // Centra el texto horizontalmente
              marginTop: "20px",
            }}
          >
            Digitalización de Documentos
          </Typography>

          <LoginIcon color="error" />
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuario"
              name="email"
              autoComplete="email"
              autoFocus
              value={username}
              onChange={(v) => setUsername(v.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={pass}
              onChange={(v) => setPass(v.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="error"
              sx={{
                marginTop: "20px", // Agregar margen superior
              }}
              onClick={login}
              disabled={!(username.trim() !== "" && pass.trim() !== "")}
            >
              Ingresar
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
