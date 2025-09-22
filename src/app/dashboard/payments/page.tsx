"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Check, 
  X, 
  Clock,
  ArrowUpDown
} from "lucide-react";

// Mock data - v reálné aplikaci by se načítala z API
const mockPayments = [
  {
    id: "PAY001",
    amount: 15000,
    currency: "CZK",
    customer: "Jan Novák",
    description: "Faktura č. 2024001",
    status: "COMPLETED",
    reviewStatus: "APPROVED",
    paidAt: "2024-01-15T10:30:00Z",
    reviewedAt: "2024-01-15T11:00:00Z",
    accountFrom: "123456789/0800",
    variableSymbol: "2024001",
  },
  {
    id: "PAY002",
    amount: 45000,
    currency: "CZK",
    customer: "ABC s.r.o.",
    description: "Služby za prosinec 2023",
    status: "COMPLETED",
    reviewStatus: "PENDING",
    paidAt: "2024-01-15T09:15:00Z",
    reviewedAt: null,
    accountFrom: "987654321/0100",
    variableSymbol: "2023120001",
  },
  {
    id: "PAY003",
    amount: 8500,
    currency: "CZK",
    customer: "Marie Svobodová",
    description: "Konzultační služby",
    status: "PENDING",
    reviewStatus: "PENDING",
    paidAt: null,
    reviewedAt: null,
    accountFrom: null,
    variableSymbol: "2024002",
  },
  {
    id: "PAY004",
    amount: 125000,
    currency: "CZK",
    customer: "XYZ spol. s r.o.",
    description: "Dodávka materiálu",
    status: "COMPLETED",
    reviewStatus: "REJECTED",
    paidAt: "2024-01-14T16:45:00Z",
    reviewedAt: "2024-01-15T08:30:00Z",
    accountFrom: "555666777/2700",
    variableSymbol: "2024003",
  },
  {
    id: "PAY005",
    amount: 3200,
    currency: "CZK",
    customer: "Petr Dvořák",
    description: "Oprava zařízení",
    status: "COMPLETED",
    reviewStatus: "APPROVED",
    paidAt: "2024-01-14T14:20:00Z",
    reviewedAt: "2024-01-14T15:00:00Z",
    accountFrom: "111222333/0600",
    variableSymbol: "2024004",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return <Badge variant="default" className="bg-green-100 text-green-800">Dokončeno</Badge>;
    case "PENDING":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Čeká</Badge>;
    case "FAILED":
      return <Badge variant="destructive">Neúspěšné</Badge>;
    case "CANCELLED":
      return <Badge variant="outline">Zrušeno</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getReviewStatusBadge = (status: string) => {
  switch (status) {
    case "APPROVED":
      return <Badge variant="default" className="bg-green-100 text-green-800">Schváleno</Badge>;
    case "REJECTED":
      return <Badge variant="destructive">Zamítnuto</Badge>;
    case "PENDING":
      return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Čeká na review</Badge>;
    case "NEEDS_INFO":
      return <Badge variant="outline" className="bg-blue-100 text-blue-800">Potřebuje info</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  const filteredPayments = mockPayments.filter(payment =>
    payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectPayment = (paymentId: string) => {
    setSelectedPayments(prev =>
      prev.includes(paymentId)
        ? prev.filter(id => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const handleSelectAll = () => {
    setSelectedPayments(
      selectedPayments.length === filteredPayments.length
        ? []
        : filteredPayments.map(p => p.id)
    );
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("cs-CZ", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Platby</h1>
            <p className="text-gray-600">
              Správa a review všech plateb v systému
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              Import z FIO
            </Button>
          </div>
        </div>

        {/* Filters and search */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 max-w-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Hledat platby..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtry
                </Button>
                {selectedPayments.length > 0 && (
                  <>
                    <Button variant="outline" size="sm">
                      <Check className="h-4 w-4 mr-2" />
                      Schválit ({selectedPayments.length})
                    </Button>
                    <Button variant="outline" size="sm">
                      <X className="h-4 w-4 mr-2" />
                      Zamítnout ({selectedPayments.length})
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Payments table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedPayments.length === filteredPayments.length}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>ID</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Zákazník
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Částka</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Popis
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Review
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>Datum platby</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Akce
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedPayments.includes(payment.id)}
                          onChange={() => handleSelectPayment(payment.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{payment.customer}</div>
                          {payment.accountFrom && (
                            <div className="text-xs text-gray-500">{payment.accountFrom}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {payment.amount.toLocaleString('cs-CZ')} {payment.currency}
                        </div>
                        {payment.variableSymbol && (
                          <div className="text-xs text-gray-500">VS: {payment.variableSymbol}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {payment.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getReviewStatusBadge(payment.reviewStatus)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(payment.paidAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {payment.reviewStatus === "PENDING" && (
                            <>
                              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Zobrazeno <span className="font-medium">1-{filteredPayments.length}</span> z{" "}
            <span className="font-medium">{filteredPayments.length}</span> plateb
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Předchozí
            </Button>
            <Button variant="outline" size="sm" disabled>
              Další
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}