import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Box, Typography, Grid, Paper, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import StarIcon from '@mui/icons-material/StarOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import UsersIcon from '@mui/icons-material/PeopleAltOutlined';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import TurnedIcon from '@mui/icons-material/TurnedInNotOutlined';
import api from '../Url/api';
import Spinner from './Spinner';

interface Doctor {
  nome: string;
  sobrenome: string;
  especialidade: string;
  pacientes: string;
  experiencia: string;
  avaliacao: string;
  sobre: string;
  horario: string;
}

const DoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Captura o ID da URL
  const [doctor, setDoctor] = useState<Doctor | null>(null); // Estado para armazenar os dados do médico
  const [loading, setLoading] = useState(true);

  // Busca os dados do médico baseado no ID
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        // Substitua a URL pela URL da sua API real
        const response = await api.get(`/doctor/${id}`);
  
        setDoctor(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do médico:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [id]);

  if (loading) {
    return (
      <Spinner />
    )
  }

  if (!doctor) {
    return <Typography>Médico não encontrado.</Typography>;
  }

  return (
    <>
      {/* Informações do médico */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
        <Avatar
          alt={doctor.nome}
          src="https://via.placeholder.com/150" // Substitua pela imagem real do médico
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Typography variant="h6" fontWeight="bold">
          {doctor.nome} {doctor.sobrenome}
        </Typography>
        <Typography color="textSecondary">{doctor.especialidade}</Typography>
      </Box>

      {/* Estatísticas */}
      <Grid container spacing={2} justifyContent="center" mb={3}>
        <Grid item xs={4}>
          <Paper elevation={3} sx={{ textAlign: 'center', width: 88, height: 135, borderRadius: 5 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                bgcolor: '#0d6efd3b',
                mx: 0.5,
                height: 50,
                borderBottomRightRadius: 200,
                borderBottomLeftRadius: 200,
                width: 44,
                marginInlineStart: 2.5,
                marginBottom: 2.5,
              }}
            >
              <UsersIcon fontSize="small" sx={{ color: '#0d6efd' }} />
            </Box>
            <Typography fontWeight="bold">{doctor.pacientes}</Typography>
            <Typography color="textSecondary" fontSize="small">
              Pacientes
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} sx={{ textAlign: 'center', width: 88, height: 135, borderRadius: 5 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                bgcolor: '#dc354533',
                mx: 0.5,
                height: 50,
                borderBottomRightRadius: 200,
                borderBottomLeftRadius: 200,
                width: 44,
                marginInlineStart: 2.5,
                marginBottom: 2.5,
              }}
            >
              <TurnedIcon fontSize="small" sx={{ color: '#D32F2F' }} />
            </Box>
            <Typography fontWeight="bold">{doctor.experiencia}</Typography>
            <Typography color="textSecondary" fontSize="small">
              Experiência
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} sx={{ textAlign: 'center', width: 88, height: 135, borderRadius: 5 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                bgcolor: '#ffc10752',
                mx: 0.5,
                height: 50,
                borderBottomRightRadius: 200,
                borderBottomLeftRadius: 200,
                width: 44,
                marginInlineStart: 2.5,
                marginBottom: 2.5,
              }}
            >
              <StarIcon fontSize="small" sx={{ color: '#ffc107' }} />
            </Box>
            <Typography fontWeight="bold">{doctor.avaliacao}</Typography>
            <Typography color="textSecondary" fontSize="small">
              Avaliações
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Sobre o médico */}
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        Sobre o Médico
      </Typography>
      <Typography variant="body2" color="textSecondary" mb={3}>
        {doctor.sobre}
      </Typography>

      {/* Horário de trabalho */}
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        Horário de Trabalho
      </Typography>
      <Typography variant="body2" color="textSecondary" mb={3}>
        {doctor.horario}
      </Typography>

      {/* Comunicação */}
      <Typography variant="subtitle1" fontWeight="bold" mb={2}>
        Comunicação
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid display="flex" gap={3} item xs={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              bgcolor: '#dc354533',
              mx: 0.5,
              height: 50,
              borderRadius: 2,
              width: 50,
              marginBottom: 2.5,
            }}
          >
            <IconButton>
              <ChatIcon fontSize="small" sx={{ color: '#D32F2F' }} />
            </IconButton>
          </Box>
          <Box>
            <Typography fontWeight="bold">Mensagem</Typography>
            <Typography color="textSecondary" fontSize="small">
              Mande mensagens, envie fotos
            </Typography>
          </Box>
        </Grid>
        <Grid display="flex" gap={3} item xs={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              bgcolor: '#0d6efd3b',
              mx: 0.5,
              height: 50,
              borderRadius: 2,
              width: 50,
              marginBottom: 2.5,
            }}
          >
            <IconButton>
              <PhoneIcon fontSize="small" sx={{ color: '#0d6efd' }} />
            </IconButton>
          </Box>
          <Box>
            <Typography fontWeight="bold">Chamada de Áudio</Typography>
            <Typography color="textSecondary" fontSize="small">
              Fale diretamente com o doutor
            </Typography>
          </Box>
        </Grid>
        <Grid display="flex" gap={3} item xs={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              bgcolor: '#ffc10752',
              mx: 0.5,
              height: 50,
              borderRadius: 2,
              width: 50,
              marginBottom: 2.5,
            }}
          >
            <IconButton>
              <VideoCallIcon fontSize="small" sx={{ color: '#ffc107' }} />
            </IconButton>
          </Box>
          <Box>
            <Typography fontWeight="bold">Video chamada</Typography>
            <Typography color="textSecondary" fontSize="small">
              Fale por vídeo diretamente com o doutor
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default DoctorDetails;
