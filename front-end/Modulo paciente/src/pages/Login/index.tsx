import React, { useState } from "react";
import { TextField, Button, Link, Typography, IconButton, Box, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff, Fingerprint } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../../context/auth/AuthContext";
import api from "../../Url/api";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [recoverPassword, setRecoverPassword] = useState("");
  const [recoverRepeatePassword, setRecoverRepeatePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecoverMode, setIsRecoverMode] = useState(false);
  const { handleLogin } = useAuthContext()

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const notify = (message: string, type: "success" | "error") => {
    toast[type](<p className="toast-text">{message}</p>, {
      autoClose: 8000,
      pauseOnHover: true,
    });
  };

  const toggleMode = () => {
    setIsRecoverMode((prev) => !prev);

  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos!");
     

      return;
    }

    setLoading(true);

    try {

      const response = await handleLogin(email, password);
      console.log(response);
      if (response && response.status === 200) {
        navigate("/home");
      } else {

        setTimeout(() => {
          notify("Login ou senha inválida.", "error");
        }, 500);

      }




    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("Erro ao autenticar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };


  const validateInputs = (...fields: string[]): boolean => {
    const emptyFields = fields.some((field) => !field.trim());
    if (emptyFields) {
      toast.error(<p className="toast-text">Preencha todos os campos!</p>, {
        autoClose: 8000,
        pauseOnHover: true,
      });
      return false;
    }
    return true;
  };

  const handleRecoverPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs(email, recoverPassword, recoverRepeatePassword)) return;
    setLoading(true);
    if (recoverPassword !== recoverRepeatePassword) {
      notify("As senhas não correspondem.", "error");
      setLoading(false);
      return;
    }

    try {

      const response = await api.post("/usuario/recover", {
        email: email,
        senha: recoverPassword,
        repete_senha: recoverRepeatePassword,
      });
      notify(response.data.message, "success");
      toggleMode();
    } catch (error) {
      notify("Erro ao enviar link de recuperação. Tente novamente.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer theme="colored" closeButton={false} />
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: 400,
          bgcolor: "white",
          p: 4,
          marginTop: 15,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
        Olá!
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {isRecoverMode ? "Recupere sua senha" : "Faça login na sua conta"}
        </Typography>

        <form onSubmit={isRecoverMode ? handleRecoverPassword : handleSignIn}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {!isRecoverMode && (
            <Box sx={{ position: "relative", marginBottom: 2 }}>
              <TextField
                label="Senha"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <IconButton
                onClick={togglePasswordVisibility}
                sx={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>
          )}
          {isRecoverMode && (
            <>
              <Box sx={{ position: "relative", marginBottom: 2 }}>
                <TextField
                  label="Senha"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  value={recoverPassword}
                  onChange={(e) => setRecoverPassword(e.target.value)}
                />
                <IconButton
                  onClick={togglePasswordVisibility}
                  sx={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Box>
              <Box sx={{ position: "relative", marginBottom: 2 }}>
                <TextField
                  label="Repete a senha"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  value={recoverRepeatePassword}
                  onChange={(e) => setRecoverRepeatePassword(e.target.value)}
                />
                <IconButton
                  onClick={togglePasswordVisibility}
                  sx={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Box>
            </>

          )}

          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            disabled={loading}
            sx={{ mt: 2, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : isRecoverMode ? "Recoperar a senha" : "login"}
          </Button>
        </form>

        <Link
          onClick={() => navigate('/register')}
          underline="hover"
          sx={{ cursor: "pointer", display: "block", mb: 2 }}
        >
          Registra-se
        </Link>
        <Link
          onClick={() => setIsRecoverMode(!isRecoverMode)}
          underline="hover"
          sx={{ cursor: "pointer", display: "block", mb: 2 }}
        >
          {isRecoverMode ? "Voltar para o login" : "Esqueceu sua senha?"}
        </Link>

        <Fingerprint sx={{ fontSize: 40, color: "success.main", cursor: "pointer" }} />
      </Box>
    </>
  );
};

export default LoginScreen;
