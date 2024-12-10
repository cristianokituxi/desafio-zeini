import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Stack } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../components/DataTable";
import { kart } from "../types/kart";
import { ToastContainer, toast } from "react-toastify";
import { useAuthContext } from "../../../context/auth/AuthContext";
import api from "../../../Url/api";
import { useEffect } from "react";


export default function Grid() {
  
 const  {karts, fetchDataKarts } = useAuthContext();
  const navigate = useNavigate();

  
  

  const onEdit = (params: GridRenderCellParams) => {
    if (!params.row.id) return;
    navigate(`/kart/${params.row.id}`);
  };

  const onDelete = async (params: GridRenderCellParams) => {
    if (!params.row.id) return;
    try {
      const resp = await api.delete(`/kart/delete${params.row.id}`);
      if(!resp)return;
      fetchDataKarts();
      toast.success(resp.data.message);
    } catch (error) {
      console.error(error);
    }
  };


  const columns: GridColDef<kart>[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "nome", headerName: "Nome", width: 200 },
    { field: "velocidade", headerName: "Velocidade", width: 200 },
    { field: "tipo", headerName: "Tipo", width: 200 },
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
  ];

  useEffect(()=>{
    fetchDataKarts();
  },[])

  return (
    <>
      <ToastContainer
        toastStyle={{ width: "100%" }}
        bodyStyle={{ width: "100%" }}
        closeButton={false}
        theme="light"
      />
      <DataTable columns={columns} rows={karts as unknown as kart[]} />
    </>
  );
}
