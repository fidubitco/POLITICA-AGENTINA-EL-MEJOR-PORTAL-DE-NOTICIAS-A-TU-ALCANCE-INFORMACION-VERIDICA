import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_TITLE } from "@/const";
import { trpc } from "@/lib/trpc";
import { Facebook, Instagram, Linkedin, Mail, Twitter, Youtube } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Link } from "wouter";

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const subscribeMutation = trpc.subscribers.subscribe.useMutation();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await subscribeMutation.mutateAsync({ email });
      toast.success(t("subscribeSuccess"));
      setEmail("");
    } catch (error) {
      toast.error(t("subscribeError"));
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border mt-16">
      {/* Newsletter Section */}
      <div className="container py-12">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="font-serif text-2xl font-bold mb-2">{t("subscribeNewsletter")}</h3>
          <p className="text-muted-foreground mb-6">Recibe las noticias más importantes directamente en tu correo</p>
          <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto flex-col sm:flex-row">
            <Input
              type="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
              aria-label={t("emailPlaceholder") as string}
            />
            <Button type="submit" disabled={subscribeMutation.isPending} className="w-full sm:w-auto">
              {subscribeMutation.isPending ? "..." : t("subscribe")}
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-border">
        <div className="container py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h4 className="font-serif text-lg font-bold mb-4">{APP_TITLE}</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Portal de noticias líder en Argentina. Información confiable, actualizada y de calidad sobre política, economía, sociedad y más.
              </p>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <Youtube className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-serif text-lg font-bold mb-4">{t("categories")}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/category/politica">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t("politica")}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/category/economia">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t("economia")}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/category/sociedad">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t("sociedad")}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/category/internacional">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t("internacional")}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/category/deportes">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t("deportes")}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/category/tecnologia">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t("tecnologia")}</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-serif text-lg font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t("aboutUs")}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t("contact")}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/team">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Equipo</span>
                  </Link>
                </li>
                <li>
                  <Link href="/careers">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Trabaja con nosotros</span>
                  </Link>
                </li>
                <li>
                  <Link href="/advertising">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Publicidad</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-serif text-lg font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t("privacyPolicy")}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/terms">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">{t("termsOfService")}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/cookies">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Política de Cookies</span>
                  </Link>
                </li>
                <li>
                  <Link href="/ethics">
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Código de Ética</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>
              © {currentYear} {APP_TITLE}. {t("allRightsReserved")}.
            </p>
            <p>Hecho con ❤️ en Argentina</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

