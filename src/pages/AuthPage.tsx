import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Lock, Mail, User } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  DEMO_ADMIN_EMAIL,
  DEMO_ADMIN_PASSWORD,
  DEMO_ADMIN_STORAGE_KEY,
} from "@/hooks/use-admin";

type AuthMode = "login" | "register";

interface AuthPageProps {
  mode: AuthMode;
}

const AuthPage = ({ mode }: AuthPageProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "facebook" | null>(null);

  const isRegister = mode === "register";

  const handleOAuthSignIn = async (provider: "google" | "facebook") => {
    setSocialLoading(provider);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      setSocialLoading(null);
      toast({
        title: provider === "google" ? "تعذر الدخول بجوجل" : "تعذر الدخول بفيسبوك",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!isRegister && email.trim().toLowerCase() === DEMO_ADMIN_EMAIL && password === DEMO_ADMIN_PASSWORD) {
      window.localStorage.setItem(DEMO_ADMIN_STORAGE_KEY, "true");
      window.dispatchEvent(new Event("nerdup-demo-admin-change"));
      setIsLoading(false);
      toast({
        title: "تم تسجيل دخول الأدمن",
        description: "أدوات الإدارة ظهرت الآن داخل الموقع.",
      });
      navigate("/");
      return;
    }

    const { error } = isRegister
      ? await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        })
      : await supabase.auth.signInWithPassword({
          email,
          password,
        });

    setIsLoading(false);

    if (error) {
      toast({
        title: isRegister ? "تعذر إنشاء الحساب" : "تعذر تسجيل الدخول",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isRegister ? "تم إنشاء الحساب" : "تم تسجيل الدخول",
      description: isRegister
        ? "افحص بريدك الإلكتروني إذا كانت المنصة تتطلب تأكيد الحساب."
        : "أهلًا بك من جديد.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 to-background py-12">
          <div className="container mx-auto px-4">
            <Card className="mx-auto max-w-md">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">
                  {isRegister ? "إنشاء حساب" : "تسجيل الدخول"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => handleOAuthSignIn("google")}
                    disabled={isLoading || socialLoading !== null}
                  >
                    {socialLoading === "google" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full border text-sm font-semibold">
                        G
                      </span>
                    )}
                    {isRegister ? "إنشاء حساب بجوجل" : "تسجيل الدخول بجوجل"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => handleOAuthSignIn("facebook")}
                    disabled={isLoading || socialLoading !== null}
                  >
                    {socialLoading === "facebook" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                        f
                      </span>
                    )}
                    {isRegister ? "إنشاء حساب بفيسبوك" : "تسجيل الدخول بفيسبوك"}
                  </Button>
                </div>

                <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="h-px flex-1 bg-border" />
                  <span>أو</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  {isRegister && (
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم</Label>
                      <div className="relative">
                        <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="name"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          className="pr-10"
                          placeholder="اكتب اسمك"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="pr-10"
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">كلمة المرور</Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="pr-10"
                        placeholder="••••••••"
                        minLength={6}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isRegister ? "إنشاء حساب" : "تسجيل الدخول"}
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  {isRegister ? "لديك حساب بالفعل؟" : "ليس لديك حساب؟"}{" "}
                  <Link className="font-medium text-primary hover:underline" to={isRegister ? "/login" : "/register"}>
                    {isRegister ? "تسجيل الدخول" : "إنشاء حساب"}
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AuthPage;
