import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
// import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import { IconButton, Stack } from "@mui/material"
import {
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid"
import { useNavigate } from "react-router-dom"

import DataTable from "../../../components/DataTable"

import { usuario } from "../types/usuario"
import { ToastContainer, toast } from "react-toastify"

import { useAuthContext } from "../../../context/auth/AuthContext"
import api from "../../../Url/api"
import { useEffect } from "react"
export default function Grid() {

  const { usuarios, fetchDataUsuario } = useAuthContext()
  console.log(usuarios);

  const navigate = useNavigate()

  const onEdit = (params: GridRenderCellParams) => {
    if (!params.row.id) return
    navigate(`/usuario/${params.row.id}`)
  }

  const onDelete = async (params: GridRenderCellParams) => {
    if (!params.row.id) return
    try {
      const resp = await api.delete(
        `/usuario/delete${params.row.id}`
      );
      fetchDataUsuario()
      toast.success(resp.data.message);
    } catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    fetchDataUsuario()
  }, [])



  const columns: GridColDef<usuario>[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "nome", headerName: "Nome", width: 200 },
    { field: "sobrenome", headerName: "Sobre nome", width: 200 },


    {
      field: "email",
      headerName: "email",
      width: 200
    },

    { field: "usuario_tipo", headerName: "Tipo de usuario", width: 150 },
    {
      field: "actions",
      headerName: "Ações",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={2}>
          <IconButton color="info" size="small" onClick={() => onEdit(params)}>
            <EditIcon fontSize="inherit" />
          </IconButton>

          <IconButton
            color="error"
            size="small"
            onClick={() => onDelete(params)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ]

  return (
    <>
      <ToastContainer
        toastStyle={{ width: "100%" }}
        bodyStyle={{ width: "100%" }}
        closeButton={false}
        theme="light"
      />

      <DataTable columns={columns} rows={usuarios as unknown as usuario[]} />
    </>
  )

}
