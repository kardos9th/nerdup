import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 text-xl font-bold text-primary">
              <img
                src="/nerdup-logo.png"
                alt="NerdUp logo"
                className="h-14 w-14 shrink-0 object-contain dark:invert"
              />
              <span>NerdUp</span>
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Grades */}
          <div>
            <h3 className="font-semibold mb-4">الصفوف الدراسية</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/grade/10" className="text-muted-foreground hover:text-primary transition-colors">
                  الصف الأول الثانوي
                </Link>
              </li>
              <li>
                <Link to="/grade/11" className="text-muted-foreground hover:text-primary transition-colors">
                  الصف الثاني الثانوي
                </Link>
              </li>
              <li>
                <Link to="/grade/12" className="text-muted-foreground hover:text-primary transition-colors">
                  الصف الثالث الثانوي
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} NerdUp. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
