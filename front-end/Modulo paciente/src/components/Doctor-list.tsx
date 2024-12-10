import React, { useState, useEffect } from 'react';

import {
  Avatar,
  Box,
  Grid,
  Typography,
  Paper,
  InputBase,
  IconButton,
  Badge,
  Tooltip,
  Modal,
  Fade,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import api from '../Url/api';

const DoctorsList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [doctors, setDoctors] = useState<any[]>([]); // Armazenar os médicos do backend
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedEspecialidade, setSelectedEspecialidade] = useState('');
  const [selectedAvaliacoes, setSelectedAvaliacoes] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get('/doctor/');
        setDoctors(response.data);
      } catch (error) {
        console.error('Erro ao buscar médicos:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleOpenModal = () => setFilterModalOpen(true);
  const handleCloseModal = () => setFilterModalOpen(false);

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.nome.toLowerCase().includes(search.toLowerCase()) || doctor.sobrenome.toLowerCase().includes(search.toLowerCase());
    const matchesHospital = selectedHospital ? doctor.hospital === selectedHospital : true;
    const matchesEspecialidade = selectedEspecialidade ? doctor.especialidade === selectedEspecialidade : true;
    const matchesAvaliacoes = selectedAvaliacoes ? doctor.avaliacao >= parseFloat(selectedAvaliacoes) : true;
    return matchesSearch && matchesHospital && matchesEspecialidade && matchesAvaliacoes;
  });

  const cancelFilters = () => {
    setSelectedAvaliacoes('');
    setSelectedEspecialidade('');
    setSelectedHospital('');
    handleCloseModal();
  };

  const handleCardClick = (doctorId: number) => {
    navigate(`/doctor-details/${doctorId}`);
  };

  const getRatingBackgroundColor = (avaliacao: number) => {
    return avaliacao >= 4 ? '#DFF6DD' : '#FFD6D6';
  };

  const getRatingTextColor = (avaliacao: number) => {
    return avaliacao >= 4 ? '#198754' : '#D32F2F';
  };

  return (
    <>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Médicos
        </Typography>
        <Tooltip title="Filtrar">
          <IconButton color="primary" onClick={handleOpenModal}>
            <Badge badgeContent={0} color="error">
              <FilterListIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>

      <Paper elevation={3} component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mb: 3 }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Buscar médico ou hospital..."
          inputProps={{ 'aria-label': 'search doctors or hospitals' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <Grid container spacing={2}>
        {filteredDoctors.map((doctor) => (
          <Grid item xs={6} sm={6} md={4} key={doctor._id} onClick={() => handleCardClick(doctor._id)}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
              <Avatar
                src={doctor.foto}
                alt={doctor.nome}
                sx={{ width: 80, height: 80, margin: '0 auto 10px auto' }}

              />
              <Typography fontWeight="bold">Dr. {doctor.sobrenome}</Typography>
              <Typography variant="body2" color="textSecondary">
                {doctor.especialidade}
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    bgcolor: getRatingBackgroundColor(doctor.avaliacao),
                    mx: 0.5,
                    borderRadius: 1,
                  }}
                >
                  <StarIcon fontSize="small" sx={{ color: getRatingTextColor(doctor.avaliacao) }} />
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{ color: getRatingTextColor(doctor.rating) }}
                  >
                    {doctor.avaliacao}
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  ({doctor.reviews} views)
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Modal de Filtros */}
      <Modal open={filterModalOpen} onClose={handleCloseModal} closeAfterTransition>
        <Fade in={filterModalOpen}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              p: 3,
              width: '270px',
              mx: 'auto',
              mt: '24%',
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Filtros
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Hospital</InputLabel>
              <Select
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                {doctors.map((d, i) => (
                  <MenuItem key={i} value={d.hospital}>{d.hospital}</MenuItem>

                ))}

              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Especialidade</InputLabel>
              <Select
                value={selectedEspecialidade}
                onChange={(e) => setSelectedEspecialidade(e.target.value)}
              >
                <MenuItem value="">Todas</MenuItem>
                {doctors.map((d, i) => (
                  <MenuItem key={i} value={d.especialidade}>{d.especialidade}</MenuItem>

                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Avaliações</InputLabel>
              <Select
                value={selectedAvaliacoes}
                onChange={(e) => setSelectedAvaliacoes(e.target.value)}
              >
                <MenuItem value="">Todas</MenuItem>
                <MenuItem value="4">Acima de 4</MenuItem>
                <MenuItem value="3">Acima de 3</MenuItem>
              </Select>
            </FormControl>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button onClick={cancelFilters} color="error" variant="outlined">
                Cancelar
              </Button>
              <Button onClick={handleCloseModal} color="primary" variant="contained">
                Filtrar
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default DoctorsList;
