"use client";

import { useSession } from "@/lib/auth-client";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, QrCode, Users, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { redirect } from "next/navigation";

// Mock data - v reálné aplikaci by se načítala z API
const stats = {
  totalPayments: 1234,
  pendingPayments: 23,
  completedPayments: 1211,
  totalAmount: 2456789,
  todayPayments: 45,
  activeQrCodes: 156,
};

export default function DashboardPage() {
  const { data: session, isLoading } = useSession();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Vítejte zpět, {session.user?.name || session.user?.email}!
          </h1>
          <p className="text-gray-600">
            Zde je přehled vašich plateb a aktivit za dnešní den.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Celkem plateb</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPayments.toLocaleString('cs-CZ')}</div>
              <p className="text-xs text-muted-foreground">
                +{stats.todayPayments} dnes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Čeká na schválení</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingPayments}</div>
              <p className="text-xs text-muted-foreground">
                Vyžaduje pozornost
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Schválené platby</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedPayments.toLocaleString('cs-CZ')}</div>
              <p className="text-xs text-muted-foreground">
                98,1% úspěšnost
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Celková částka</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalAmount.toLocaleString('cs-CZ')} Kč
              </div>
              <p className="text-xs text-muted-foreground">
                +12,3% oproti minulému měsíci
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick actions and recent activity */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Rychlé akce</CardTitle>
              <CardDescription>
                Nejčastěji používané funkce
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <QrCode className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="text-sm font-medium">Nový QR kód</span>
                </button>
                <button className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <Users className="h-5 w-5 mr-2 text-green-600" />
                  <span className="text-sm font-medium">Nový zákazník</span>
                </button>
                <button className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <CreditCard className="h-5 w-5 mr-2 text-purple-600" />
                  <span className="text-sm font-medium">Import plateb</span>
                </button>
                <button className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
                  <span className="text-sm font-medium">Reporty</span>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nedávné platby</CardTitle>
              <CardDescription>
                Posledních 5 plateb čekajících na review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: "PAY001", customer: "Jan Novák", amount: 15000, time: "před 5 min" },
                  { id: "PAY002", customer: "ABC s.r.o.", amount: 45000, time: "před 12 min" },
                  { id: "PAY003", customer: "Marie Svobodová", amount: 8500, time: "před 25 min" },
                  { id: "PAY004", customer: "XYZ spol.", amount: 125000, time: "před 1 hod" },
                  { id: "PAY005", customer: "Petr Dvořák", amount: 3200, time: "před 2 hod" },
                ].map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{payment.customer}</p>
                      <p className="text-xs text-gray-500">{payment.id} • {payment.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{payment.amount.toLocaleString('cs-CZ')} Kč</p>
                      <p className="text-xs text-orange-600">Čeká na review</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}