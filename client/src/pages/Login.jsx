import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { authApi } from "../api/auth";
import { Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.email) errs.email = "Email is required";
    if (!form.password) errs.password = "Password is required";
    if (Object.keys(errs).length) return setErrors(errs);
    setLoading(true);
    try {
      const { data } = await authApi.login(form);
      setAuth(data.data.user, data.data.accessToken, data.data.refreshToken);
      toast.success(`Welcome back, ${data.data.user.name}!`);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        .auth-serif { font-family: 'Instrument Serif', serif; }
        .auth-sans  { font-family: 'DM Sans', sans-serif; }
        .auth-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid #e2e8f0;
          padding: 8px 0;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          color: #0f172a;
          outline: none;
          transition: border-color 0.2s;
        }
        .auth-input::placeholder { color: #cbd5e1; }
        .auth-input:focus { border-bottom-color: #0f172a; }
        .auth-input.error { border-bottom-color: #f87171; }
      `}</style>

      <div className="auth-sans min-h-screen bg-[#f8f7f4] flex items-center justify-center p-6">
        <div className="flex w-full max-w-[920px] min-h-[540px] bg-white rounded-[20px] overflow-hidden border border-slate-100 shadow-sm">

          <div
            className="hidden lg:flex lg:w-[400px] shrink-0 flex-col justify-between p-10 relative overflow-hidden"
            style={{ background: "linear-gradient(145deg,#dbeafe 0%,#ede9fe 45%,#fce7f3 100%)" }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/30 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-0 w-48 h-48 rounded-full bg-blue-200/40 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex items-center gap-3 -ml-2 -mt-2">
              <Link to="/"
                className="w-8 h-8 rounded-full border border-white/60 bg-white/30 flex items-center justify-center text-slate-600 hover:bg-white/60 transition"
                aria-label="Back to home">
                <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
              <span className="auth-serif text-xl text-slate-800">Startiva</span>
            </div>

            <div className="relative z-10 space-y-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">CRM for founders</p>
              <h2 className="auth-serif text-[42px] leading-[1.1] text-slate-900 font-normal">
                Close deals,<br />
                <em className="text-blue-500">not spreadsheets.</em>
              </h2>
              <p className="text-slate-500 text-sm font-light leading-7 max-w-[220px]">
                A lightweight workspace designed for 2–5 person founding teams who are too busy to learn enterprise software.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="flex -space-x-2">
                  {[["AK","#bfdbfe"],["SM","#ddd6fe"],["JD","#fbcfe8"],["PR","#bbf7d0"]].map(([init, bg], n) => (
                    <div key={n} style={{ background: bg }}
                      className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-slate-700">
                      {init}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Joined by 200+ student founders</p>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 font-light relative z-10">
              © 2026 Startiva · Built by founders, for founders
            </p>
          </div>

          <div className="flex flex-1 flex-col justify-center px-10 py-12">

            <div className="mb-8 lg:hidden">
              <span className="auth-serif text-xl text-slate-800">Startiva</span>
            </div>

            <div className="mb-8">
              <h1 className="auth-serif text-[30px] font-normal text-slate-900 leading-tight mb-1">
                Welcome back
              </h1>
              <p className="text-sm font-light text-slate-400">Sign in to your workspace</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2">Email</label>
                <input
                  name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="eg. you@startup.com"
                  className={`auth-input ${errors.email ? "error" : ""}`}
                />
                {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2">Password</label>
                <div className="relative">
                  <input
                    name="password" type={show ? "text" : "password"} value={form.password} onChange={handleChange}
                    placeholder="••••••••"
                    className={`auth-input pr-6 ${errors.password ? "error" : ""}`}
                  />
                  <button type="button" onClick={() => setShow(!show)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition">
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-[11px] text-red-400 mt-1">{errors.password}</p>}
              </div>

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white text-sm font-medium py-3.5 transition hover:bg-slate-700 active:scale-[0.98] disabled:opacity-50">
                {loading ? (
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                ) : (
                  <>Sign in <ArrowRight className="h-3.5 w-3.5" /></>
                )}
              </button>
            </form>

            <p className="text-center text-[13px] text-slate-400 font-light mt-7">
              Don't have an account?{" "}
              <Link to="/register" className="text-slate-900 font-medium underline underline-offset-2 hover:text-blue-600 transition-colors">
                Sign up
              </Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}