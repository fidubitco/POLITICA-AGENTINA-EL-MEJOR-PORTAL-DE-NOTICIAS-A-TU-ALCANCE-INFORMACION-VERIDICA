"use client";

import { useState } from "react";
import { Save, Globe, Search, Share2, Key, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SettingsClient() {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    // General
    siteName: "Política Argentina",
    siteDescription: "Portal de noticias políticas de Argentina",
    siteUrl: "https://politica-argentina.com",
    contactEmail: "contacto@politica-argentina.com",

    // SEO
    metaTitle: "Política Argentina - Noticias y Análisis Político",
    metaDescription: "Portal de noticias políticas de Argentina con análisis y cobertura en tiempo real",
    metaKeywords: "política, argentina, noticias, análisis político",
    googleAnalyticsId: "",
    googleSearchConsoleId: "",

    // Social Media
    twitterUrl: "https://twitter.com/politica_ar",
    facebookUrl: "https://facebook.com/politica.argentina",
    instagramUrl: "https://instagram.com/politica_argentina",
    youtubeUrl: "",
    linkedinUrl: "",

    // Features
    enableComments: true,
    enableNewsletter: true,
    enablePaywall: false,
    enableAds: false,

    // API Keys
    openaiApiKey: "",
    stripePublicKey: "",
    stripeSecretKey: "",
    sendgridApiKey: "",
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert("Configuración guardada correctamente");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Configuración</h1>
          <p className="text-zinc-400 mt-1">Administra la configuración del portal</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          <Save className="w-4 h-4" />
          {isSaving ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-zinc-900 border border-zinc-800">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="social">Redes Sociales</TabsTrigger>
          <TabsTrigger value="features">Características</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        {/* General */}
        <TabsContent value="general" className="space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <CardTitle>Información General</CardTitle>
              </div>
              <CardDescription>
                Configuración básica del sitio web
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Nombre del sitio</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) =>
                    setSettings({ ...settings, siteName: e.target.value })
                  }
                  className="bg-black border-zinc-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Descripción</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) =>
                    setSettings({ ...settings, siteDescription: e.target.value })
                  }
                  rows={3}
                  className="bg-black border-zinc-800 resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteUrl">URL del sitio</Label>
                <Input
                  id="siteUrl"
                  type="url"
                  value={settings.siteUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, siteUrl: e.target.value })
                  }
                  className="bg-black border-zinc-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email de contacto</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, contactEmail: e.target.value })
                  }
                  className="bg-black border-zinc-800"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO */}
        <TabsContent value="seo" className="space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                <CardTitle>Configuración SEO</CardTitle>
              </div>
              <CardDescription>
                Optimiza tu sitio para motores de búsqueda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Título</Label>
                <Input
                  id="metaTitle"
                  value={settings.metaTitle}
                  onChange={(e) =>
                    setSettings({ ...settings, metaTitle: e.target.value })
                  }
                  className="bg-black border-zinc-800"
                  maxLength={60}
                />
                <p className="text-xs text-zinc-500">{settings.metaTitle.length}/60 caracteres</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Descripción</Label>
                <Textarea
                  id="metaDescription"
                  value={settings.metaDescription}
                  onChange={(e) =>
                    setSettings({ ...settings, metaDescription: e.target.value })
                  }
                  rows={3}
                  className="bg-black border-zinc-800 resize-none"
                  maxLength={160}
                />
                <p className="text-xs text-zinc-500">{settings.metaDescription.length}/160 caracteres</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaKeywords">Palabras clave (separadas por comas)</Label>
                <Input
                  id="metaKeywords"
                  value={settings.metaKeywords}
                  onChange={(e) =>
                    setSettings({ ...settings, metaKeywords: e.target.value })
                  }
                  className="bg-black border-zinc-800"
                />
              </div>
              <Separator className="bg-zinc-800" />
              <div className="space-y-2">
                <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                <Input
                  id="googleAnalyticsId"
                  value={settings.googleAnalyticsId}
                  onChange={(e) =>
                    setSettings({ ...settings, googleAnalyticsId: e.target.value })
                  }
                  placeholder="G-XXXXXXXXXX"
                  className="bg-black border-zinc-800 font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="googleSearchConsoleId">Google Search Console ID</Label>
                <Input
                  id="googleSearchConsoleId"
                  value={settings.googleSearchConsoleId}
                  onChange={(e) =>
                    setSettings({ ...settings, googleSearchConsoleId: e.target.value })
                  }
                  placeholder="google-site-verification=XXXXXXXX"
                  className="bg-black border-zinc-800 font-mono"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media */}
        <TabsContent value="social" className="space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                <CardTitle>Redes Sociales</CardTitle>
              </div>
              <CardDescription>
                Enlaces a tus perfiles de redes sociales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twitterUrl">Twitter / X</Label>
                <Input
                  id="twitterUrl"
                  type="url"
                  value={settings.twitterUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, twitterUrl: e.target.value })
                  }
                  placeholder="https://twitter.com/usuario"
                  className="bg-black border-zinc-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebookUrl">Facebook</Label>
                <Input
                  id="facebookUrl"
                  type="url"
                  value={settings.facebookUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, facebookUrl: e.target.value })
                  }
                  placeholder="https://facebook.com/pagina"
                  className="bg-black border-zinc-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagramUrl">Instagram</Label>
                <Input
                  id="instagramUrl"
                  type="url"
                  value={settings.instagramUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, instagramUrl: e.target.value })
                  }
                  placeholder="https://instagram.com/usuario"
                  className="bg-black border-zinc-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtubeUrl">YouTube</Label>
                <Input
                  id="youtubeUrl"
                  type="url"
                  value={settings.youtubeUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, youtubeUrl: e.target.value })
                  }
                  placeholder="https://youtube.com/@canal"
                  className="bg-black border-zinc-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn</Label>
                <Input
                  id="linkedinUrl"
                  type="url"
                  value={settings.linkedinUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, linkedinUrl: e.target.value })
                  }
                  placeholder="https://linkedin.com/company/empresa"
                  className="bg-black border-zinc-800"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features */}
        <TabsContent value="features" className="space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Características del Sitio</CardTitle>
              <CardDescription>
                Activa o desactiva funcionalidades
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableComments">Comentarios</Label>
                  <p className="text-sm text-zinc-500">
                    Permite a los usuarios comentar en los artículos
                  </p>
                </div>
                <Switch
                  id="enableComments"
                  checked={settings.enableComments}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, enableComments: checked })
                  }
                />
              </div>
              <Separator className="bg-zinc-800" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableNewsletter">Newsletter</Label>
                  <p className="text-sm text-zinc-500">
                    Sistema de suscripción a newsletter
                  </p>
                </div>
                <Switch
                  id="enableNewsletter"
                  checked={settings.enableNewsletter}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, enableNewsletter: checked })
                  }
                />
              </div>
              <Separator className="bg-zinc-800" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enablePaywall">Paywall</Label>
                  <p className="text-sm text-zinc-500">
                    Limita el acceso a contenido premium
                  </p>
                </div>
                <Switch
                  id="enablePaywall"
                  checked={settings.enablePaywall}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, enablePaywall: checked })
                  }
                />
              </div>
              <Separator className="bg-zinc-800" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableAds">Publicidad</Label>
                  <p className="text-sm text-zinc-500">
                    Muestra anuncios en el sitio
                  </p>
                </div>
                <Switch
                  id="enableAds"
                  checked={settings.enableAds}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, enableAds: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys */}
        <TabsContent value="api" className="space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                <CardTitle>API Keys</CardTitle>
              </div>
              <CardDescription>
                Configura las claves API de servicios externos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openaiApiKey">OpenAI API Key</Label>
                <Input
                  id="openaiApiKey"
                  type="password"
                  value={settings.openaiApiKey}
                  onChange={(e) =>
                    setSettings({ ...settings, openaiApiKey: e.target.value })
                  }
                  placeholder="sk-..."
                  className="bg-black border-zinc-800 font-mono"
                />
              </div>
              <Separator className="bg-zinc-800" />
              <div className="space-y-2">
                <Label htmlFor="stripePublicKey">Stripe Public Key</Label>
                <Input
                  id="stripePublicKey"
                  type="password"
                  value={settings.stripePublicKey}
                  onChange={(e) =>
                    setSettings({ ...settings, stripePublicKey: e.target.value })
                  }
                  placeholder="pk_..."
                  className="bg-black border-zinc-800 font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stripeSecretKey">Stripe Secret Key</Label>
                <Input
                  id="stripeSecretKey"
                  type="password"
                  value={settings.stripeSecretKey}
                  onChange={(e) =>
                    setSettings({ ...settings, stripeSecretKey: e.target.value })
                  }
                  placeholder="sk_..."
                  className="bg-black border-zinc-800 font-mono"
                />
              </div>
              <Separator className="bg-zinc-800" />
              <div className="space-y-2">
                <Label htmlFor="sendgridApiKey">SendGrid API Key</Label>
                <Input
                  id="sendgridApiKey"
                  type="password"
                  value={settings.sendgridApiKey}
                  onChange={(e) =>
                    setSettings({ ...settings, sendgridApiKey: e.target.value })
                  }
                  placeholder="SG...."
                  className="bg-black border-zinc-800 font-mono"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
