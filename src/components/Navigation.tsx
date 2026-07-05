import { Link } from "react-router-dom";
import { BarChart3, Menu, X, User } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import { useAdmin } from "@/hooks/use-admin";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdmin } = useAdmin();

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 text-xl font-bold text-primary">
            <img
              src="/nerdup-logo.png"
              alt="NerdUp logo"
              className="h-14 w-14 shrink-0 object-contain dark:invert"
            />
            <span>NerdUp</span>
          </Link>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {isAdmin && (
              <Button asChild variant="outline" size="sm">
                <Link to="/stats">
                  <BarChart3 className="h-4 w-4 ml-2" />
                  الإحصائيات
                </Link>
              </Button>
            )}
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">
                <User className="h-4 w-4 ml-2" />
                تسجيل الدخول
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/register">إنشاء حساب</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">
            <Link
              to="/"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              الرئيسية
            </Link>
            <div className="pt-3 space-y-2">
              <div className="flex justify-center pb-2">
                <ThemeToggle />
              </div>
              {isAdmin && (
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/stats" onClick={() => setMobileMenuOpen(false)}>
                    <BarChart3 className="h-4 w-4 ml-2" />
                    الإحصائيات
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <User className="h-4 w-4 ml-2" />
                  تسجيل الدخول
                </Link>
              </Button>
              <Button asChild size="sm" className="w-full">
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  إنشاء حساب
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
