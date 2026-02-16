import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mountain, Target, BarChart3, Users } from "lucide-react";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left — Form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div>
            <h1 className="font-display text-3xl font-bold text-primary tracking-tight">Alento</h1>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Bem-vindo de volta</h2>
            <p className="text-muted-foreground">Entre na sua conta para continuar</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(v) => setRemember(v === true)}
                />
                <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground cursor-pointer">
                  Lembrar de mim
                </Label>
              </div>
              <button type="button" className="text-sm text-primary hover:underline">
                Esqueceu a senha?
              </button>
            </div>

            <Button type="submit" className="w-full h-11 text-base font-semibold">
              Entrar
            </Button>
          </form>
        </div>
      </div>

      {/* Right — Decorative panel (hidden on mobile) */}
      <div className="hidden lg:flex flex-col items-center justify-center w-[480px] shrink-0 bg-gradient-to-br from-primary via-primary/90 to-accent p-12 text-primary-foreground relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/10" />
        <div className="absolute top-1/3 left-8 w-24 h-24 rounded-full bg-white/5" />

        <div className="relative z-10 text-center space-y-8">
          <h2 className="font-display text-4xl font-bold leading-tight">
            Gerencie seu negócio com clareza
          </h2>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            Visão, tração e saúde organizacional em um só lugar. O sistema EOS completo para sua empresa.
          </p>

          {/* Feature icons */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            {[
              { icon: Mountain, label: "Rocks" },
              { icon: Target, label: "VTO" },
              { icon: BarChart3, label: "Scorecard" },
              { icon: Users, label: "Pessoas" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
