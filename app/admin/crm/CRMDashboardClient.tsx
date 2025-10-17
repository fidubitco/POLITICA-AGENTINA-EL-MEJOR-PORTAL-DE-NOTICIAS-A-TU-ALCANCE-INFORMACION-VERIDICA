"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  TrendingUp,
  DollarSign,
  Target,
  Phone,
  Mail,
  Calendar,
  MoreVertical,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  UserPlus,
} from "lucide-react";

type LeadStatus = "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "won" | "lost";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: LeadStatus;
  value: number;
  lastContact: string;
  source: string;
  assignedTo: string;
}

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Juan Pérez",
    company: "Tech Solutions",
    email: "juan@techsolutions.com",
    phone: "+54 11 4567-8900",
    status: "new",
    value: 15000,
    lastContact: "2025-10-15",
    source: "Website",
    assignedTo: "María García",
  },
  {
    id: "2",
    name: "Ana Martínez",
    company: "Marketing Pro",
    email: "ana@marketingpro.com",
    phone: "+54 11 5678-9012",
    status: "contacted",
    value: 25000,
    lastContact: "2025-10-16",
    source: "Referral",
    assignedTo: "Carlos López",
  },
  {
    id: "3",
    name: "Pedro Gómez",
    company: "Digital Agency",
    email: "pedro@digitalagency.com",
    phone: "+54 11 6789-0123",
    status: "qualified",
    value: 35000,
    lastContact: "2025-10-14",
    source: "LinkedIn",
    assignedTo: "María García",
  },
  {
    id: "4",
    name: "Laura Fernández",
    company: "Startup Inc",
    email: "laura@startup.com",
    phone: "+54 11 7890-1234",
    status: "proposal",
    value: 50000,
    lastContact: "2025-10-17",
    source: "Cold Email",
    assignedTo: "Carlos López",
  },
];

const statusConfig: Record<LeadStatus, { label: string; color: string; bgColor: string; icon: any }> = {
  new: { label: "Nuevo", color: "text-blue-400", bgColor: "bg-blue-900/20 border-blue-900/30", icon: UserPlus },
  contacted: { label: "Contactado", color: "text-cyan-400", bgColor: "bg-cyan-900/20 border-cyan-900/30", icon: Phone },
  qualified: { label: "Calificado", color: "text-purple-400", bgColor: "bg-purple-900/20 border-purple-900/30", icon: Target },
  proposal: { label: "Propuesta", color: "text-yellow-400", bgColor: "bg-yellow-900/20 border-yellow-900/30", icon: Clock },
  negotiation: { label: "Negociación", color: "text-orange-400", bgColor: "bg-orange-900/20 border-orange-900/30", icon: TrendingUp },
  won: { label: "Ganado", color: "text-green-400", bgColor: "bg-green-900/20 border-green-900/30", icon: CheckCircle2 },
  lost: { label: "Perdido", color: "text-red-400", bgColor: "bg-red-900/20 border-red-900/30", icon: AlertCircle },
};

export default function CRMDashboardClient() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<LeadStatus | "all">("all");

  // Calculate stats
  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter((l) => l.status === "new").length,
    qualifiedLeads: leads.filter((l) => l.status === "qualified").length,
    totalValue: leads.reduce((sum, l) => sum + l.value, 0),
    wonLeads: leads.filter((l) => l.status === "won").length,
    conversionRate: leads.length > 0 ? ((leads.filter((l) => l.status === "won").length / leads.length) * 100).toFixed(1) : 0,
  };

  // Pipeline by status
  const pipeline = (Object.keys(statusConfig) as LeadStatus[]).map((status) => ({
    status,
    count: leads.filter((l) => l.status === status).length,
    value: leads.filter((l) => l.status === status).reduce((sum, l) => sum + l.value, 0),
  }));

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterStatus === "all" || lead.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-900/20 to-blue-950/20 border-blue-900/30">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-sm text-zinc-400 mb-1">Total Leads</p>
            <p className="text-3xl font-black">{stats.totalLeads}</p>
            <p className="text-xs text-green-400 mt-2">+{stats.newLeads} nuevos</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-purple-950/20 border-purple-900/30">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-sm text-zinc-400 mb-1">Calificados</p>
            <p className="text-3xl font-black">{stats.qualifiedLeads}</p>
            <p className="text-xs text-zinc-500 mt-2">Listos para propuesta</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/20 to-green-950/20 border-green-900/30">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-sm text-zinc-400 mb-1">Valor Total</p>
            <p className="text-3xl font-black">${(stats.totalValue / 1000).toFixed(0)}K</p>
            <p className="text-xs text-zinc-500 mt-2">En pipeline</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-900/20 to-yellow-950/20 border-yellow-900/30">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-600/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
              </div>
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-sm text-zinc-400 mb-1">Tasa de Conversión</p>
            <p className="text-3xl font-black">{stats.conversionRate}%</p>
            <p className="text-xs text-zinc-500 mt-2">{stats.wonLeads} ganados</p>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Visualization */}
      <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <CardTitle className="flex items-center gap-3">
            <Target className="w-6 h-6 text-green-500" />
            Pipeline de Ventas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-7 gap-4">
            {pipeline.map(({ status, count, value }) => {
              const config = statusConfig[status];
              return (
                <div
                  key={status}
                  className={`p-4 rounded-xl border ${config.bgColor} hover:scale-105 transition-transform cursor-pointer`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <config.icon className={`w-4 h-4 ${config.color}`} />
                    <p className={`text-xs font-bold ${config.color}`}>{config.label}</p>
                  </div>
                  <p className="text-2xl font-black mb-1">{count}</p>
                  <p className="text-xs text-zinc-500">${(value / 1000).toFixed(0)}K</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-500" />
              Leads
            </CardTitle>
            <div className="flex gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar leads..."
                  className="pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm outline-none focus:border-blue-600"
                />
              </div>

              {/* Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as LeadStatus | "all")}
                className="px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm outline-none focus:border-blue-600"
              >
                <option value="all">Todos</option>
                {(Object.keys(statusConfig) as LeadStatus[]).map((status) => (
                  <option key={status} value={status}>
                    {statusConfig[status].label}
                  </option>
                ))}
              </select>

              {/* Add Lead */}
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Lead
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-950 border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Lead
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Contacto
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Valor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Asignado a
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Último Contacto
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {filteredLeads.map((lead) => {
                  const config = statusConfig[lead.status];
                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-zinc-900/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-sm">{lead.name}</p>
                          <p className="text-xs text-zinc-500">{lead.company}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-zinc-400">
                            <Mail className="w-3 h-3" />
                            {lead.email}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-zinc-400">
                            <Phone className="w-3 h-3" />
                            {lead.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`${config.bgColor} ${config.color} border`}>
                          {config.label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-sm">${lead.value.toLocaleString()}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-zinc-400">{lead.assignedTo}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <Calendar className="w-3 h-3" />
                          {new Date(lead.lastContact).toLocaleDateString("es-AR")}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="py-12 text-center">
              <Users className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-500">No se encontraron leads</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lead Detail Modal (if selected) */}
      {selectedLead && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={() => setSelectedLead(null)}
        >
          <Card
            className="bg-zinc-900 border-zinc-800 w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="border-b border-zinc-800">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl font-black">{selectedLead.name}</CardTitle>
                  <p className="text-zinc-500 mt-1">{selectedLead.company}</p>
                </div>
                <Badge className={`${statusConfig[selectedLead.status].bgColor} ${statusConfig[selectedLead.status].color} border`}>
                  {statusConfig[selectedLead.status].label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-bold text-zinc-500 mb-2">EMAIL</p>
                  <p className="text-sm">{selectedLead.email}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-500 mb-2">TELÉFONO</p>
                  <p className="text-sm">{selectedLead.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-500 mb-2">VALOR</p>
                  <p className="text-2xl font-black">${selectedLead.value.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-500 mb-2">FUENTE</p>
                  <p className="text-sm">{selectedLead.source}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-500 mb-2">ASIGNADO A</p>
                  <p className="text-sm">{selectedLead.assignedTo}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-500 mb-2">ÚLTIMO CONTACTO</p>
                  <p className="text-sm">{new Date(selectedLead.lastContact).toLocaleDateString("es-AR")}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Llamar
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline" className="flex-1 border-zinc-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
