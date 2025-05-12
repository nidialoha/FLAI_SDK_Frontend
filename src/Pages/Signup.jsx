import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../Context/AuthProvider";

function Signup() {
  const navigate = useNavigate();
  const { setUser, login } = useAuth();
  const [error, setError] = useState("");

  const [signupData, setSignUpData] = useState({
    image: "",
    name: "",
    email: "",
    passwort: "",
  });

  const [previewImage, setPreviewImage] = useState("");

  const cloudName = "dtgshnrcb";
  const uploadPreset = "FLAI-SDK";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));

    const signupDataUpload = new FormData();
    signupDataUpload.append("file", file);
    signupDataUpload.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: signupDataUpload,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        setSignUpData((prev) => ({ ...prev, image: data.secure_url }));
        toast.success("Bild erfolgreich hochgeladen!");
      } else {
        throw new Error("Keine URL erhalten");
      }
    } catch (error) {
      console.error("Upload fehlgeschlagen:", error);
      toast.error("Bild konnte nicht hochgeladen werden");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, passwort, image } = signupData;
    if (!name.trim() || !email.trim() || !passwort.trim() || !image) {
      toast.error("Bitte alle Felder inkl. Bild ausfüllen.");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Ungültige E-Mail-Adresse.");
      return;
    }

    if (passwort.length < 6) {
      toast.error("Passwort muss mindestens 6 Zeichen haben.");
      return;
    }

    const newUser = { name, email, passwort, image };
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("authToken", "dummy-token");

    toast.success("User erfolgreich registriert. Bitte einloggen!");
    // await fetchSignup(); // WARTE AUF YANNIS BACKEND

    // ⏩ Weiter zur Login-Seite
    navigate("/login");
  };

  const fetchSignup = async () => {
    try {
      const res = await fetch("", {
        //BACKEND VON YANNIS
        method: "POST",
        body: JSON.stringify({
          image: signupData.image,
          name: signupData.name,
          email: signupData.email,
          passwort: signupData.passwort,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw Error("Bad request");
      const data = await res.json();
      console.log(data);
      localStorage.setItem("token", data.token);

      setUser(data.user);
      await login();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-white text-xl font-bold">Registration</h2>
        <div className="avatar mb-3">
          <div className="w-24 rounded-full overflow-hidden">
            {previewImage ? (
              <img src={previewImage} alt="preview" />
            ) : (
              <CgProfile className="text-8xl text-white" />
            )}
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="text-[#FF658A] text-sm bg-white rounded-lg flex pl-3 cursor-pointer"
        />

        <div>
          <p className="font-semibold text-white">Name</p>
          <input
            type="text"
            name="name"
            placeholder="Dein Name"
            className="input"
            onChange={handleChange}
            value={signupData.name}
          />
        </div>

        <div>
          <p className="font-semibold text-white">E-Mail Adresse</p>
          <input
            type="text"
            name="email"
            placeholder="E-mail Adresse"
            className="input"
            onChange={handleChange}
            value={signupData.email}
          />
        </div>
        <div>
          <p className="font-semibold text-white">Passwort</p>
          <input
            type="password"
            name="passwort"
            placeholder="Passwort"
            className="input"
            onChange={handleChange}
            value={signupData.passwort}
          />
        </div>
        <button
          onClick={handleSignup}
          className="text-xs rounded-lg bg-[#FF658A] text-white p-2 cursor-pointer mt-3"
        >
          Signup
        </button>
        <p className="text-white">
          Du hast bereits ein Konto?{" "}
          <NavLink
            className="underline hover:text-[#FF658A] cursor-pointer text-center"
            to="/login"
          >
            Jetzt anmelden.
          </NavLink>
        </p>
      </div>
    </>
  );
}

export default Signup;
