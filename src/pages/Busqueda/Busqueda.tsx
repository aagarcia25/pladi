import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { Box, Container, Grid, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
const Busqueda = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    //clearTimeout(searchTimeout);
    const searchTimeout = setTimeout(() => {
      // Lógica para realizar la búsqueda
      console.log("Búsqueda realizada:", value);
    }, 2000); // Ajusta el tiempo de espera según tus necesidades
  };

  return (
    <Container fixed>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box border={1} sx={{ display: "flex", alignItems: "flex-end" }}>
            <ManageSearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Buscar"
              variant="standard"
              fullWidth
              onChange={handleSearchChange}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Busqueda;
