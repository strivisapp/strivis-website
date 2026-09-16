import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/lib/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email, password);
      navigate("/premium");
    } catch (err) {
      if (err.status === 401) {
        setError("Email or password is incorrect.");
      } else if (err.status === 403) {
        setError("Email not verified yet. Please check your inbox.");
      } else {
        setError(err.message || "Login failed.");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11"
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full h-11 rounded-xl" disabled={busy}>
        {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        Log in
      </Button>
    </form>
  );
}

function RegisterForm() {
  const [step, setStep] = useState("form"); // "form" | "otp" | "done"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitRegister = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await base44.auth.register({ email, password });
      setStep("otp");
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setBusy(false);
    }
  };

  const submitOtp = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await base44.auth.verifyOtp({ email, otpCode: otp });
      await login(email, password);
      navigate("/premium");
    } catch (err) {
      setError(err.message || "Verification failed.");
    } finally {
      setBusy(false);
    }
  };

  if (step === "otp") {
    return (
      <form onSubmit={submitOtp} className="space-y-4">
        <p className="text-sm text-muted-foreground">
          We sent a code to <span className="font-medium text-foreground">{email}</span>.
        </p>
        <div className="space-y-2">
          <Label htmlFor="otp">Verification code</Label>
          <Input
            id="otp"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="h-11"
            placeholder="123456"
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full h-11 rounded-xl" disabled={busy}>
          {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Verify
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={submitRegister} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reg-email">Email</Label>
        <Input
          id="reg-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-password">Password</Label>
        <Input
          id="reg-password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11"
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full h-11 rounded-xl" disabled={busy}>
        {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        Create account
      </Button>
    </form>
  );
}

export default function Login() {
  return (
    <div className="min-h-svh flex items-center justify-center bg-background px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm"
      >
        <Card className="rounded-2xl">
          <CardHeader className="text-center">
            <img src="/brand/strivis-icon-mark-orange-dark.svg" alt="Strivis" className="h-10 mx-auto mb-2" />
            <CardTitle className="font-heading text-2xl tracking-wide">Welcome to Strivis</CardTitle>
            <CardDescription>Log in to unlock Premium.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Log in</TabsTrigger>
                <TabsTrigger value="register">Sign up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
