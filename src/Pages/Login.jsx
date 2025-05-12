import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../Context/AuthProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Bitte E-Mail und Passwort eingeben");
      return;
    }

    const success = login({ email, password });

    if (success) {
      toast.success("Login erfolgreich!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      toast.error("Falsche E-Mail oder Passwort");
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-white text-xl font-bold">Login</h2>
        <input
          type="text"
          placeholder="E-Mail"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passwort"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="text-xs rounded-lg bg-[#FF658A] text-white p-2 cursor-pointer mt-3"
        >
          Login
        </button>
        <p className="text-white">
          Du hast noch kein Konto?{" "}
          <NavLink
            className="underline hover:text-[#FF658A] cursor-pointer text-center"
            to="/signup"
          >
            Jetzt registrieren.
          </NavLink>
        </p>
      </div>
    </>
  );
}

export default Login;
