"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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
  MoreVertical,
} from "lucide-react"

interface OrderManagementProps {
  onAddOrder: () => void
}

const orderStats = [
  { count: "46468", label: "Toutes CMD", color: "bg-blue-100", icon: "📋" },
  { count: "0", label: "Panier abandonné", color: "bg-orange-100", icon: "🛒" },
  { count: "33", label: "En attente", color: "bg-yellow-100", icon: "⏳" },
  { count: "2", label: "Confirmées", color: "bg-green-100", icon: "✅" },
  { count: "493", label: "Prêt à expédier", color: "bg-blue-200", icon: "📦" },
  { count: "876", label: "Retour non reçues", color: "bg-red-100", icon: "↩️" },
  { count: "2655", label: "Expédiées", color: "bg-purple-100", icon: "🚚" },
  { count: "5870", label: "Livrées", color: "bg-green-200", icon: "✅" },
  { count: "4084", label: "Annulées", color: "bg-red-200", icon: "❌" },
]

const availableColumns = [
  { id: "client", label: "Client", visible: true },
  { id: "reference", label: "Référence", visible: true },
  { id: "status", label: "Status", visible: true },
  { id: "gouvernorat", label: "Gouvernorat", visible: true },
  { id: "total", label: "Total", visible: true },
  { id: "reste_a_payer", label: "Reste à Payer", visible: false },
  { id: "transporteur", label: "Transporteur", visible: true },
  { id: "nb_articles", label: "NB articles", visible: true },
  { id: "creee_par", label: "Créée par", visible: true },
  { id: "remise", label: "Remise", visible: false },
  { id: "payee_le", label: "Payée Le", visible: false },
  { id: "email", label: "Email", visible: false },
  { id: "commentaire", label: "Commentaire", visible: false },
  { id: "tel", label: "Tél", visible: true },
  { id: "tel2", label: "Tél 2", visible: false },
  { id: "code_tva", label: "Code TVA", visible: false },
  { id: "a_livrer_le", label: "À Livrer Le", visible: false },
  { id: "creee_le", label: "Créée Le", visible: false },
  { id: "pays", label: "Pays", visible: false },
  { id: "transport_code", label: "Transport Code", visible: false },
  { id: "modifie_par", label: "Modifié Par", visible: false },
  { id: "dispo", label: "Dispo", visible: false },
  { id: "messanger", label: "Messanger", visible: false },
  { id: "num_facture", label: "Num de Facture", visible: false },
  { id: "details", label: "Détails", visible: false },
  { id: "produits", label: "Produits", visible: false },
  { id: "paye", label: "Payé", visible: false },
  { id: "source", label: "Source", visible: false },
  { id: "modifiee_le", label: "Modifiée Le", visible: false },
  { id: "enseigne", label: "Enseigne", visible: false },
]

const sampleOrders = [
  {
    id: 1,
    client: "WISSAL",
    reference: "45669",
    status: "En attente",
    gouvernorat: "Nabeul",
    total: "43,000 TND",
    transporteur: "FIRST",
    nb_articles: 1,
    creee_par: "Esprit Jeune",
    tel: "23 559 214",
    selected: false,
  },
  {
    id: 2,
    client: "IMEB",
    reference: "45668",
    status: "En attente",
    gouvernorat: "Mahdia",
    total: "78,000 TND",
    transporteur: "FIRST",
    nb_articles: 2,
    creee_par: "Esprit Jeune",
    tel: "92 185 519",
    selected: false,
  },
  {
    id: 3,
    client: "RANIM",
    reference: "45667",
    status: "En attente",
    gouvernorat: "Gafsa",
    total: "43,000 TND",
    transporteur: "FIRST",
    nb_articles: 1,
    creee_par: "Esprit Jeune",
    tel: "29 383 028",
    selected: false,
  },
  {
    id: 4,
    client: "SONIA",
    reference: "45666",
    status: "En attente",
    gouvernorat: "Mannouba",
    total: "40,500 TND",
    transporteur: "FIRST",
    nb_articles: 1,
    creee_par: "Esprit Jeune",
    tel: "97 020 422",
    selected: false,
  },
  {
    id: 5,
    client: "DALANDA",
    reference: "45665",
    status: "En attente",
    gouvernorat: "Ariana",
    total: "112,000 TND",
    transporteur: "FIRST",
    nb_articles: 4,
    creee_par: "Esprit Jeune",
    tel: "20 828 144",
    selected: false,
  },
  {
    id: 6,
    client: "AWES",
    reference: "45664",
    status: "Confirmées",
    gouvernorat: "Sousse",
    total: "8,000 TND",
    transporteur: "FIRST",
    nb_articles: 1,
    creee_par: "Esprit Jeune",
    tel: "50 508 090",
    selected: false,
  },
  {
    id: 7,
    client: "RETOUR AWES",
    reference: "45664",
    status: "Retour non reçues",
    gouvernorat: "Sousse",
    total: "43,000 TND",
    transporteur: "FIRST",
    nb_articles: 1,
    creee_par: "Esprit Jeune",
    tel: "50 508 090",
    selected: false,
  },
]

export default function OrderManagement({ onAddOrder }: OrderManagementProps) {
  const [selectedOrders, setSelectedOrders] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(100)
  const [columnSettings, setColumnSettings] = useState(availableColumns)
  const [showColumnSelector, setShowColumnSelector] = useState(false)

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

  const toggleColumnVisibility = (columnId: string) => {
    setColumnSettings((prev) => prev.map((col) => (col.id === columnId ? { ...col, visible: !col.visible } : col)))
  }

  const visibleColumns = columnSettings.filter((col) => col.visible)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "Confirmées":
        return "bg-blue-100 text-blue-800"
      case "Retour non reçues":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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
                <SelectValue placeholder="Étape" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="confirmed">Confirmées</SelectItem>
              </SelectContent>
            </Select>
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
                <SelectValue placeholder="Échange" />
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
          </div>
          <div className="flex items-center space-x-4">
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Équipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="team1">Équipe 1</SelectItem>
                <SelectItem value="team2">Équipe 2</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Date d'entrée</span>
              <div className="flex items-center space-x-2 bg-white border rounded px-3 py-2">
                <Calendar className="w-4 h-4 text-gray-400" />
              </div>
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
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Organiser le tableau</span>
          <Popover open={showColumnSelector} onOpenChange={setShowColumnSelector}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Colonnes à afficher</h4>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {columnSettings.map((column) => (
                    <div key={column.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={column.id}
                        checked={column.visible}
                        onCheckedChange={() => toggleColumnVisibility(column.id)}
                      />
                      <label htmlFor={column.id} className="text-sm cursor-pointer">
                        {column.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
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
                  {visibleColumns.map((column) => (
                    <th key={column.id} className="p-3 text-left text-sm font-medium text-gray-600 uppercase">
                      {column.label}
                    </th>
                  ))}
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
                    {visibleColumns.map((column) => (
                      <td key={column.id} className="p-3">
                        {column.id === "client" && (
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                              👤
                            </div>
                            <span className="font-medium underline cursor-pointer text-blue-600">{order.client}</span>
                          </div>
                        )}
                        {column.id === "reference" && (
                          <span className="text-blue-600 underline cursor-pointer">{order.reference}</span>
                        )}
                        {column.id === "status" && (
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        )}
                        {column.id === "gouvernorat" && <span>{order.gouvernorat}</span>}
                        {column.id === "total" && <span className="font-medium">{order.total}</span>}
                        {column.id === "transporteur" && (
                          <div className="flex items-center space-x-2">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                              {order.transporteur}
                            </span>
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          </div>
                        )}
                        {column.id === "nb_articles" && <span>{order.nb_articles}</span>}
                        {column.id === "creee_par" && <span>{order.creee_par}</span>}
                        {column.id === "tel" && (
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="text-xs bg-transparent">
                              📞 {order.tel}
                            </Button>
                            <Button variant="outline" size="sm" className="bg-green-500 text-white text-xs">
                              📱 WhatsApp
                            </Button>
                          </div>
                        )}
                      </td>
                    ))}
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
