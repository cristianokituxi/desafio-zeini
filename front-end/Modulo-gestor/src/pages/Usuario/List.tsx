import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"
import { Box, Button, Paper, Stack } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

import Breadcrumbs from "../../components/Breadcrumbs"
import PageTitle from "../../components/PageTitle"

import Grid from "./components/Grid"

export default function List() {
  return (
    <>
      <Stack direction={{ xs: "column", sm: "row" }} gap={1} mb={2}>
        <Box sx={{ flexGrow: 1 }}>
          <PageTitle title="Lista" />
          <Breadcrumbs
            path={[{ label: "Usuario", to: "/usuario" }, { label: "Lista" }]}
          />
        </Box>
        <Box sx={{ alignSelf: "center" }}>
          <Button
            component={RouterLink}
            to="/usuario/new"
            variant="contained"
            startIcon={<PersonAddAltIcon />}
          >
            Novo Usuario
          </Button>
        </Box>
      </Stack>
      <Paper>
        <Grid />
      </Paper>
    </>
  )
}
