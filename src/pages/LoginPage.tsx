import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(username, password);
      const data = response.data ? response.data : response;

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role || "User");
        alert(`Login Berhasil! Anda masuk sebagai: ${data.role || "User"}`);
        navigate("/dashboard");
      } else {
        throw new Error("Token tidak ditemukan.");
      }
    } catch (err: any) {
      setError("Username atau password salah. Coba lagi atau hubungi admin!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6 relative overflow-hidden">
      {/* Dekorasi Background Bulat Lembut */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="bg-white/70 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl shadow-blue-100/50 w-full max-w-md border border-white/50 relative z-10">
        <header className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mx-auto mb-4 rotate-3">
            <span className="text-white font-black text-3xl italic">C</span>
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            Selamat Datang!
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Masuk ke sistem peminjaman ruangan
          </p>
        </header>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl mb-6 text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-300">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 ml-1">
              Username
            </label>
            <input
              type="text"
              className="w-full px-5 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-300 font-medium text-slate-700 outline-none shadow-inner"
              placeholder="Contoh: candraadmin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-5 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-slate-300 font-medium text-slate-700 outline-none shadow-inner"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
              >
                {showPassword ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 0 1 6 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.882 9.882L5.146 5.147m13.707 13.707L14.118 14.118M21.543 12c-1.274 4.057-5.064 7-9.543 7a9.963 9.963 0 01-2.427-.297M21 21l-3.212-3.212M3 3l3.212 3.212m0 0l3.64 3.64"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-2xl hover:bg-blue-700 transition-all font-bold shadow-xl shadow-blue-200 active:scale-95 text-lg"
          >
            Masuk Sekarang
          </button>
        </form>

        <div className="mt-10 text-center pt-6 border-t border-slate-100">
          <p className="text-sm text-slate-500 font-medium">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-bold hover:underline transition-all"
            >
              Buat Akun Baru
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
