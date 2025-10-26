import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/lib/trpc";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Bot, CheckCircle, Clock, FileText, Link2, RefreshCw, XCircle } from "lucide-react";
import { useState } from "react";

export default function AIJobs() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const { data: jobs, isLoading, refetch } = trpc.aiJobs.getMy.useQuery({ limit: 100, offset: 0 });

  const filteredJobs = jobs?.filter((job: any) => {
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesType = typeFilter === "all" || job.type === typeFilter;
    return matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const config: Record<
      string,
      { variant: "default" | "secondary" | "destructive" | "outline"; icon: any; label: string }
    > = {
      pending: { variant: "outline", icon: Clock, label: "Pendiente" },
      processing: { variant: "default", icon: RefreshCw, label: "Procesando" },
      completed: { variant: "default", icon: CheckCircle, label: "Completado" },
      failed: { variant: "destructive", icon: XCircle, label: "Fallido" },
    };
    const item = config[status] || config.pending;
    const Icon = item.icon;
    return (
      <Badge variant={item.variant} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {item.label}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const labels: Record<string, string> = {
      scrape: "Scraping",
      rewrite: "Reescritura",
      generate: "Generación",
      translate: "Traducción",
    };
    return <Badge variant="secondary">{labels[type] || type}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, React.ComponentType<{ className?: string }>> = {
      scrape: Link2,
      rewrite: RefreshCw,
      generate: Bot,
      translate: FileText,
    };
    return icons[type] || Bot;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold flex items-center gap-2">
              <Bot className="h-8 w-8" />
              Trabajos de IA
            </h1>
            <p className="text-muted-foreground mt-1">Historial y estado de los trabajos de generación de contenido</p>
          </div>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobs?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobs?.filter((j: any) => j.status === "pending").length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobs?.filter((j: any) => j.status === "completed").length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Fallidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobs?.filter((j: any) => j.status === "failed").length || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Filtra trabajos por estado y tipo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Estado</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="processing">Procesando</SelectItem>
                    <SelectItem value="completed">Completado</SelectItem>
                    <SelectItem value="failed">Fallido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo</label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="scrape">Scraping</SelectItem>
                    <SelectItem value="rewrite">Reescritura</SelectItem>
                    <SelectItem value="generate">Generación</SelectItem>
                    <SelectItem value="translate">Traducción</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jobs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Trabajos</CardTitle>
            <CardDescription>{filteredJobs?.length || 0} trabajo(s) encontrado(s)</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : filteredJobs && filteredJobs.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Detalles</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJobs.map((job: any) => {
                      const TypeIcon = getTypeIcon(job.type);
                      return (
                        <TableRow key={job.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <TypeIcon />
                              </div>
                              {getTypeBadge(job.type)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {job.sourceUrl && (
                                <div className="text-sm">
                                  <span className="text-muted-foreground">URL:</span>{" "}
                                  <a
                                    href={job.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                  >
                                    {job.sourceUrl.substring(0, 50)}...
                                  </a>
                                </div>
                              )}
                              {job.prompt && (
                                <div className="text-sm">
                                  <span className="text-muted-foreground">Prompt:</span> {job.prompt.substring(0, 50)}
                                  ...
                                </div>
                              )}
                              {job.sourceFile && (
                                <div className="text-sm">
                                  <span className="text-muted-foreground">Archivo:</span> {job.sourceFile}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(job.status)}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{format(new Date(job.createdAt), "dd MMM yyyy", { locale: es })}</div>
                              <div className="text-muted-foreground">
                                {format(new Date(job.createdAt), "HH:mm", { locale: es })}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {job.status === "completed" && (
                              <Button variant="outline" size="sm">
                                Ver Resultado
                              </Button>
                            )}
                            {job.status === "failed" && job.error && (
                              <Button variant="outline" size="sm">
                                Ver Error
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No hay trabajos de IA registrados</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Los trabajos aparecerán aquí cuando uses las herramientas de IA
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

