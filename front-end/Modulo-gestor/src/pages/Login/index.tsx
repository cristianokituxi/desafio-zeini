import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";

import Spinner from "../../components/Spinner";
import img1 from "./images/race.svg";
import img2 from "./images/register.svg";
import img4 from "./images/avatar.png";
import img3 from "./images/chave.png";

import "./style.scss";
import { useAuthContext } from "../../context/auth/AuthContext";
import api from "../../Url/api";


const LoginScreen = () => {

  const { handleLogin } = useAuthContext()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recoverEmail, setRecoverEmail] = useState("");
  const [recoverPassword, setRecoverPassword] = useState("");
  const [recoverRepeatePassword, setRecoverRepeatePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecoverMode, setIsRecoverMode] = useState(false);

  const navigate = useNavigate();

  const toggleMode = () => {
    setIsRecoverMode((prev) => !prev);
    setRecoverEmail("");
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

  const notify = (message: string, type: "success" | "error") => {
    toast[type](<p className="toast-text">{message}</p>, {
      autoClose: 8000,
      pauseOnHover: true,
    });
  };


  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs(email, password)) return;

    setLoading(true);
    try {

      await handleLogin(email, password);

      const token = localStorage.getItem("token");
      if (token) {
        navigate("/dashboard");
      } else {
        notify("Email ou senha inválidos, tente novamente!", "error");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      notify("Erro ao fazer login. Tente novamente.", "error");
    } finally {
      setLoading(false);
    }
  };


  const handleRecoverPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs(recoverEmail, recoverPassword, recoverRepeatePassword)) return;
    setLoading(true);
    if (recoverPassword !== recoverRepeatePassword) {
      notify("As senhas não correspondem.", "error");
      return;
    }

    try {

      const response = await api.post("/usuario/recover", {
        email: recoverEmail,
        senha: recoverRepeatePassword,
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
      <div className={isRecoverMode ? "container1 sign-up-mode" : "container1"}>
        <ToastContainer theme="colored" closeButton={false} />

        <div className="forms-container" style={{ width: "100%" }}>
          <div className="signin-signup">

            {!isRecoverMode && (
              <form className="sign-in-form" onSubmit={handleSignIn}>
                <Alert severity="info">
                  Bem-vindo novamente! <br />
                  Insira seu e-mail e senha para acessar o sistema.
                </Alert>

                <div className="input-field">
                  <img src={img4} alt="" height={30} style={{ marginTop: "10px" }} />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <img src={img3} alt="" height={30} style={{ marginTop: "10px" }} />
                  <input
                    name="password"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <input type="submit" value="Entrar" className="btn bt solid" />
                <Link
                  onClick={toggleMode}
                  style={{ fontFamily: "Poppins", cursor: "pointer" }}
                >
                  Esqueceu a senha?
                </Link>
              </form>
            )}

            {isRecoverMode && (
              <form className="sign-up-form" onSubmit={handleRecoverPassword}>
                <Alert severity="info">
                  Para recuperar sua senha, insira o e-mail cadastrado. <br />
                  Você receberá um link para redefinir sua senha.
                </Alert>

                <div className="input-field">
                  <img src={img4} alt="" height={30} style={{ marginTop: "10px" }} />
                  <input
                    value={recoverEmail}
                    onChange={(e) => setRecoverEmail(e.target.value)}
                    name="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                  />
                </div>
                <div className="input-field">
                  <img src={img3} alt="" height={30} style={{ marginTop: "10px" }} />
                  <input
                    value={recoverPassword}
                    onChange={(e) => setRecoverPassword(e.target.value)}
                    name="senha"
                    type="password"
                    placeholder="Digite a nova senha"
                  />
                </div>
                <div className="input-field">
                  <img src={img3} alt="" height={30} style={{ marginTop: "10px" }} />
                  <input
                    value={recoverRepeatePassword}
                    onChange={(e) => setRecoverRepeatePassword(e.target.value)}
                    name="repete_senha"
                    type="password"
                    placeholder="Repete a nova senha"
                  />
                </div>
                <input type="submit" className="btn bt" value="Recuperar" />
              </form>
            )}
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <img src={img1} className="image" alt="" />
            </div>
          </div>
          <div className="panel right-panel">
            <div className="content">
              <img src={img2} className="image" alt="" />
              <button className="btn bt transparent" onClick={toggleMode}>
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && <Spinner />}
    </>
  );
};

export default LoginScreen;
