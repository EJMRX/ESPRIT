"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Calendar,
  Filter,
  Plus,
  Printer,
  Download,
  Truck,
  Smartphone,
  Copy,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react"

interface OrderManagementProps {
  onAddOrder: () => void
}

const orderStats = [
  { count: "46258", label: "Toutes les CMD", color: "bg-gray-100", icon: "📋" },
  { count: "7", label: "Panier abandonné", color: "bg-orange-100", icon: "🛒" },
  { count: "11", label: "En attente", color: "bg-yellow-100", icon: "⏳" },
  { count: "80", label: "Confirmées", color: "bg-blue-100", icon: "✅" },
  { count: "271", label: "Prêt à expédier", color: "bg-green-100", icon: "📦" },
  { count: "866", label: "Retour non reçues", color: "bg-red-100", icon: "↩️" },
  { count: "2636", label: "Expédiées", color: "bg-purple-100", icon: "🚚" },
  { count: "5861", label: "Livrées", color: "bg-green-200", icon: "✅" },
  { count: "4070", label: "Annulées", color: "bg-red-200", icon: "❌" },
]

const sampleOrders = [
  {
    id: 1,
    client: "OUMAIMA",
    reference: "40517",
    governorate: "Sousse",
    total: "58,500 TND",
    transport: "FIRST",
    createdBy: "Esprit Jeune",
    phone: "99 532 898",
    selected: false,
  },
  {
    id: 2,
    client: "MARIEM",
    reference: "33460",
    governorate: "Siliana",
    total: "7,500 TND",
    transport: "FIRST",
    createdBy: "Esprit Jeune",
    phone: "28 057 465",
    selected: false,
  },
  {
    id: 3,
    client: "OLFA",
    reference: "33459",
    governorate: "Medenine",
    total: "3,000 TND",
    transport: "FIRST",
    createdBy: "Esprit Jeune",
    phone: "51 740 031",
    selected: false,
  },
  {
    id: 4,
    client: "INES",
    reference: "33451",
    governorate: "Nabeul",
    total: "72,500 TND",
    transport: "FIRST",
    createdBy: "Esprit Jeune",
    phone: "96 520 486",
    selected: false,
  },
  {
    id: 5,
    client: "RAWEN",
    reference: "33450",
    governorate: "Mahdia",
    total: "57,500 TND",
    transport: "FIRST",
    createdBy: "Esprit Jeune",
    phone: "42 185 410",
    selected: false,
  },
  {
    id: 6,
    client: "NORHEN",
    reference: "33449",
    governorate: "Nabeul",
    total: "37,500 TND",
    transport: "FIRST",
    createdBy: "Esprit Jeune",
    phone: "28 358 339",
    selected: false,
  },
  {
    id: 7,
    client: "FARAH JERIDI",
    reference: "33444",
    governorate: "Tunis",
    total: "36,500 TND",
    transport: "FIRST",
    createdBy: "Esprit Jeune",
    phone: "46 205 500",
    selected: false,
  },
]

export default function OrderManagement({ onAddOrder }: OrderManagementProps) {
  const [selectedOrders, setSelectedOrders] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(100)

  const handleSelectOrder = (orderId: number) => {
    setSelectedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  const handleSelectAll = () => {
    if (selectedOrders.length === sampleOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(sampleOrders.map((order) => order.id))
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
            <span className="text-blue-600">📋</span>
          </div>
          <h1 className="text-xl font-semibold">Gestionnaire de commande</h1>
          <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">?</span>
          </div>
        </div>
        <Button onClick={onAddOrder} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une commande
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-9 gap-4 mb-6">
        {orderStats.map((stat, index) => (
          <Card key={index} className={`${stat.color} border-0 cursor-pointer hover:shadow-md transition-shadow`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold mb-1">{stat.count}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filtre</span>
            </div>
            <Input
              placeholder="Rechercher par mot"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48"
            />
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Livreur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="first">First Delivery</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Echange" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="yes">Oui</SelectItem>
                <SelectItem value="no">Non</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Impression" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="printed">Imprimé</SelectItem>
                <SelectItem value="not-printed">Non imprimé</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Synchronisation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="synced">Synchronisé</SelectItem>
                <SelectItem value="not-synced">Non synchronisé</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Gouvernorat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="tunis">Tunis</SelectItem>
                <SelectItem value="sousse">Sousse</SelectItem>
                <SelectItem value="nabeul">Nabeul</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="online">En ligne</SelectItem>
                <SelectItem value="store">Magasin</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Equipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="team1">Équipe 1</SelectItem>
                <SelectItem value="team2">Équipe 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Date d'entrée</span>
            <div className="flex items-center space-x-2 bg-white border rounded px-3 py-2">
              <Calendar className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm">⚡ Actions</span>
          </div>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Changer le statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="confirmed">Confirmé</SelectItem>
              <SelectItem value="shipped">Expédié</SelectItem>
              <SelectItem value="delivered">Livré</SelectItem>
              <SelectItem value="cancelled">Annulé</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Printer className="w-4 h-4 mr-2" />
            Imprimer
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button variant="outline" size="sm">
            <Truck className="w-4 h-4 mr-2" />
            Livreur
          </Button>
          <Button variant="outline" size="sm">
            <Smartphone className="w-4 h-4 mr-2" />
            Douchette
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            Dupliquer
          </Button>
        </div>
        <div className="text-sm text-gray-600">Organiser le tableau ⋮</div>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-3 text-left">
                    <Checkbox
                      checked={selectedOrders.length === sampleOrders.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">CLIENT</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">RÉFÉRENCE</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">GOUVERNORAT</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">TOTAL</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">TRANSPORT</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">CRÉÉE PAR</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">PAYÉE LE</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">TÉL</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600">À LIVRER LE</th>
                </tr>
              </thead>
              <tbody>
                {sampleOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <Checkbox
                        checked={selectedOrders.includes(order.id)}
                        onCheckedChange={() => handleSelectOrder(order.id)}
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                          👤
                        </div>
                        <span className="font-medium underline cursor-pointer">{order.client}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-blue-600 underline cursor-pointer">{order.reference}</span>
                    </td>
                    <td className="p-3">{order.governorate}</td>
                    <td className="p-3 font-medium">{order.total}</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                          {order.transport}
                        </span>
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{order.createdBy}</td>
                    <td className="p-3">-</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="text-xs bg-transparent">
                          📞 {order.phone}
                        </Button>
                        <Button variant="outline" size="sm" className="bg-green-500 text-white text-xs">
                          📱 WhatsApp
                        </Button>
                      </div>
                    </td>
                    <td className="p-3">-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">Nombre de ligne(s) : 20741</div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Page 1 de 208</span>
            <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="200">200</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
