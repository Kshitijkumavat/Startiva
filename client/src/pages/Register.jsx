import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { authApi } from "../api/auth";
import { Eye, EyeOff, ArrowRight, ArrowLeft, Check } from "lucide-react";
import toast from "react-hot-toast";

function PasswordStrength({ password }) {
  const checks = [
    { label: "8+ chars",  pass: password.length >= 8 },
    { label: "Uppercase", pass: /[A-Z]/.test(password) },
    { label: "Number",    pass: /\d/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  if (!password) return null;
  const colors = ["bg-red-300", "bg-amber-300", "bg-emerald-400"];
  return (
    <div className="mt-3 space-y-2">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i}
            className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${i < score ? colors[score - 1] : "bg-slate-100"}`}
          />
        ))}
      </div>
      <div className="flex gap-3">
        {checks.map(({ label, pass }) => (
          <span key={label}
            className={`flex items-center gap-1 text-[10px] font-medium transition-colors ${pass ? "text-emerald-500" : "text-slate-300"}`}>
            <Check className="h-2.5 w-2.5" />{label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [form, setForm] = useState({ name: "", email: "", password: "", startupName: "" });
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
    if (!form.name)              errs.name        = "Name is required";
    if (!form.email)             errs.email       = "Email is required";
    if (!form.startupName)       errs.startupName = "Startup name is required";
    if (form.password.length < 8) errs.password   = "Min. 8 characters";
    if (Object.keys(errs).length) return setErrors(errs);
    setLoading(true);
    try {
      const { data } = await authApi.register(form);
      setAuth(data.data.user, data.data.accessToken, data.data.refreshToken);
      toast.success("Workspace created! Welcome to Startiva");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
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

          <div className="flex flex-1 flex-col justify-center px-10 py-12 relative overflow-y-auto">

            <div className="mb-8 lg:hidden">
              <span className="auth-serif text-xl text-slate-800">Startiva</span>
            </div>

            <div className="mb-8">
              <h1 className="auth-serif text-[30px] font-normal text-slate-900 leading-tight mb-1">
                Create your account
              </h1>
              <p className="text-sm font-light text-slate-400">Get started with Startiva</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-x-6">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2">Full name</label>
                  <input name="name" type="text" value={form.name} onChange={handleChange}
                    placeholder="eg. Kshitij Sharma"
                    className={`auth-input ${errors.name ? "error" : ""}`} />
                  {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2">Startup name</label>
                  <input name="startupName" type="text" value={form.startupName} onChange={handleChange}
                    placeholder="eg. Acme Inc."
                    className={`auth-input ${errors.startupName ? "error" : ""}`} />
                  {errors.startupName && <p className="text-[11px] text-red-400 mt-1">{errors.startupName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="eg. you@startup.com"
                  className={`auth-input ${errors.email ? "error" : ""}`} />
                {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2">Password</label>
                <div className="relative">
                  <input name="password" type={show ? "text" : "password"} value={form.password} onChange={handleChange}
                    placeholder="Min. 8 characters"
                    className={`auth-input pr-6 ${errors.password ? "error" : ""}`} />
                  <button type="button" onClick={() => setShow(!show)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition">
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <PasswordStrength password={form.password} />
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
                  <>Create account <ArrowRight className="h-3.5 w-3.5" /></>
                )}
              </button>

              <p className="text-center text-[11px] text-slate-300 font-light">
                By creating an account, you agree to our{" "}
                <a href="#" className="underline underline-offset-2 text-slate-400 hover:text-slate-700 transition">terms</a>
                {" & "}
                <a href="#" className="underline underline-offset-2 text-slate-400 hover:text-slate-700 transition">conditions</a>
              </p>
            </form>

            <p className="text-center text-[13px] text-slate-400 font-light mt-7">
              Already have an account?{" "}
              <Link to="/login" className="text-slate-900 font-medium underline underline-offset-2 hover:text-blue-600 transition-colors">
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}