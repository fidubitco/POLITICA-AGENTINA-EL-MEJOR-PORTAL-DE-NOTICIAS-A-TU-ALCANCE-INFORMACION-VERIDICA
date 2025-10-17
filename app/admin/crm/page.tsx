import CRMDashboardClient from "./CRMDashboardClient";

export default function CRMPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            CRM Dashboard
          </h1>
          <p className="text-zinc-500 mt-2">
            Gestión avanzada de leads, clientes y pipeline de ventas
          </p>
        </div>
        <div className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-bold text-sm">
          Sistema CRM
        </div>
      </div>

      {/* Client Component */}
      <CRMDashboardClient />
    </div>
  );
}
