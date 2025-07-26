"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
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

// Define all possible columns and their initial visibility
const columnDefinitions = [
  { id: "select", label: "", visible: true }, // Checkbox column
  { id: "client", label: "CLIENT", visible: true },
  { id: "reference", label: "RÉFÉRENCE", visible: true },
  { id: "status", label: "ÉTAT", visible: true },
  { id: "governorate", label: "GOUVERNORAT", visible: true },
  { id: "total", label: "TOTAL", visible: true },
  { id: "remainingToPay", label: "RESTE À PAYER", visible: false },
  { id: "transport", label: "TRANSPORT", visible: true },
  { id: "articleCount", label: "NB ARTICLES", visible: true },
  { id: "createdBy", label: "CRÉÉE PAR", visible: true },
  { id: "discount", label: "REMISE", visible: false },
  { id: "paidOn", label: "PAYÉE LE", visible: false },
  { id: "email", label: "EMAIL", visible: false },
  { id: "comment", label: "COMMENTAIRE", visible: false },
  { id: "phone", label: "TÉL", visible: true },
  { id: "phone2", label: "TÉL 2", visible: false },
  { id: "vatCode", label: "CODE TVA", visible: false },
  { id: "toBeDeliveredOn", label: "À LIVRER LE", visible: false },
  { id: "createdOn", label: "CRÉÉE LE", visible: false },
  { id: "country", label: "PAYS", visible: false },
  { id: "transportCode", label: "TRANSPORT CODE", visible: false },
  { id: "modifiedBy", label: "MODIFIÉ PAR", visible: false },
  { id: "available", label: "DISPO", visible: false },
  { id: "messenger", label: "MESSENGER", visible: false },
  { id: "invoiceNumber", label: "NUM DE FACTURE", visible: false },
  { id: "productDetails", label: "DÉTAILS PRODUITS", visible: false },
  { id: "paid", label: "PAYÉ", visible: false },
  { id: "source", label: "SOURCE", visible: false },
  { id: "modifiedOn", label: "MODIFIÉE LE", visible: false },
  { id: "brand", label: "ENSEIGNE", visible: false },
]

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
    status: "Confirmées",
    governorate: "Sousse",
    total: "58,500 TND",
    remainingToPay: "0,000 TND",
    transport: "FIRST",
    articleCount: 3,
    createdBy: "Esprit Jeune",
    discount: "0,000 TND",
    paidOn: "2023-10-26",
    email: "oumaima@example.com",
    comment: "Livraison rapide",
    phone: "99 532 898",
    phone2: "22 111 222",
    vatCode: "TN12345",
    toBeDeliveredOn: "2023-10-30",
    createdOn: "2023-10-25",
    country: "Tunisia",
    transportCode: "TRK40517",
    modifiedBy: "Admin",
    available: "Oui",
    messenger: "WhatsApp",
    invoiceNumber: "INV001",
    productDetails: "Laptop, Mouse",
    paid: "Oui",
    source: "Online",
    modifiedOn: "2023-10-26",
    brand: "Esprit Soft",
    selected: false,
  },
  {
    id: 2,
    client: "MARIEM",
    reference: "33460",
    status: "En attente",
    governorate: "Siliana",
    total: "7,500 TND",
    remainingToPay: "7,500 TND",
    transport: "FIRST",
    articleCount: 1,
    createdBy: "Esprit Jeune",
    discount: "0,000 TND",
    paidOn: "-",
    email: "mariem@example.com",
    comment: "",
    phone: "28 057 465",
    phone2: "",
    vatCode: "TN12346",
    toBeDeliveredOn: "2023-10-31",
    createdOn: "2023-10-26",
    country: "Tunisia",
    transportCode: "TRK33460",
    modifiedBy: "User",
    available: "Oui",
    messenger: "SMS",
    invoiceNumber: "INV002",
    productDetails: "Headphones",
    paid: "Non",
    source: "Store",
    modifiedOn: "2023-10-26",
    brand: "Esprit Soft",
    selected: false,
  },
  {
    id: 3,
    client: "OLFA",
    reference: "33459",
    status: "Retour non reçues",
    governorate: "Medenine",
    total: "3,000 TND",
    remainingToPay: "0,000 TND",
    transport: "FIRST",
    articleCount: 1,
    createdBy: "Esprit Jeune",
    discount: "0,000 TND",
    paidOn: "2023-10-25",
    email: "olfa@example.com",
    comment: "Client wishes to return",
    phone: "51 740 031",
    phone2: "20 000 000",
    vatCode: "TN12347",
    toBeDeliveredOn: "2023-10-28",
    createdOn: "2023-10-24",
    country: "Tunisia",
    transportCode: "TRK33459",
    modifiedBy: "Admin",
    available: "Non",
    messenger: "Email",
    invoiceNumber: "INV003",
    productDetails: "Cable",
    paid: "Oui",
    source: "Online",
    modifiedOn: "2023-10-27",
    brand: "Esprit Soft",
    selected: false,
  },
  {
    id: 4,
    client: "INES",
    reference: "33451",
    status: "Prêt à expédier",
    governorate: "Nabeul",
    total: "72,500 TND",
    remainingToPay: "0,000 TND",
    transport: "FIRST",
    articleCount: 2,
    createdBy: "Esprit Jeune",
    discount: "0,000 TND",
    paidOn: "2023-10-27",
    email: "ines@example.com",
    comment: "",
    phone: "96 520 486",
    phone2: "",
    vatCode: "TN12348",
    toBeDeliveredOn: "2023-11-01",
    createdOn: "2023-10-27",
    country: "Tunisia",
    transportCode: "TRK33451",
    modifiedBy: "User",
    available: "Oui",
    messenger: "WhatsApp",
    invoiceNumber: "INV004",
    productDetails: "Monitor, Keyboard",
    paid: "Oui",
    source: "Store",
    modifiedOn: "2023-10-27",
    brand: "Esprit Soft",
    selected: false,
  },
  {
    id: 5,
    client: "RAWEN",
    reference: "33450",
    status: "Livrées",
    governorate: "Mahdia",
    total: "57,500 TND",
    remainingToPay: "0,000 TND",
    transport: "FIRST",
    articleCount: 1,
    createdBy: "Esprit Jeune",
    discount: "5,000 TND",
    paidOn: "2023-10-24",
    email: "rawen@example.com",
    comment: "VIP Client",
    phone: "42 185 410",
    phone2: "",
    vatCode: "TN12349",
    toBeDeliveredOn: "2023-10-24",
    createdOn: "2023-10-23",
    country: "Tunisia",
    transportCode: "TRK33450",
    modifiedBy: "Admin",
    available: "Oui",
    messenger: "SMS",
    invoiceNumber: "INV005",
    productDetails: "Webcam",
    paid: "Oui",
    source: "Online",
    modifiedOn: "2023-10-24",
    brand: "Esprit Soft",
    selected: false,
  },
]

export default function OrderManagement({ onAddOrder }: OrderManagementProps) {
  const [selectedOrders, setSelectedOrders] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(100)

  // State to manage visible columns
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columnDefinitions.filter((col) => col.visible).map((col) => col.id),
  )

  const toggleColumnVisibility = (columnId: string, checked: boolean) => {
    setVisibleColumns((prev) => (checked ? [...prev, columnId] : prev.filter((id) => id !== columnId)))
  }

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

  const getStatusBadge = (status: string) => {
    let colorClass = "bg-gray-100 text-gray-800"
    switch (status) {
      case "En attente":
        colorClass = "bg-yellow-100 text-yellow-800"
        break
      case "Confirmées":
        colorClass = "bg-blue-100 text-blue-800"
        break
      case "Prêt à expédier":
        colorClass = "bg-green-100 text-green-800"
        break
      case "Retour non reçues":
        colorClass = "bg-red-100 text-red-800"
        break
      case "Expédiées":
        colorClass = "bg-purple-100 text-purple-800"
        break
      case "Livrées":
        colorClass = "bg-green-200 text-green-800"
        break
      case "Annulées":
        colorClass = "bg-red-200 text-red-800"
        break
      case "Panier abandonné":
        colorClass = "bg-orange-100 text-orange-800"
        break
      default:
        colorClass = "bg-gray-100 text-gray-800"
    }
    return <Badge className={`${colorClass} px-2 py-1 rounded text-xs font-medium`}>{status}</Badge>
  }

  type OrderKey = keyof (typeof sampleOrders)[0]

  const renderCellContent = (order: (typeof sampleOrders)[0], columnId: string) => {
    switch (columnId) {
      case "select":
        return (
          <Checkbox checked={selectedOrders.includes(order.id)} onCheckedChange={() => handleSelectOrder(order.id)} />
        )
      case "client":
        return (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
              👤
            </div>
            <span className="font-medium underline cursor-pointer">{order.client}</span>
          </div>
        )
      case "reference":
        return <span className="text-blue-600 underline cursor-pointer">{order.reference}</span>
      case "status":
        return getStatusBadge(order.status)
      case "governorate":
        return order.governorate
      case "total":
        return <span className="font-medium">{order.total}</span>
      case "remainingToPay":
        return order.remainingToPay
      case "transport":
        return (
          <div className="flex items-center space-x-2">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">{order.transport}</span>
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
        )
      case "articleCount":
        return order.articleCount
      case "createdBy":
        return order.createdBy
      case "discount":
        return order.discount
      case "paidOn":
        return order.paidOn
      case "email":
        return order.email
      case "comment":
        return order.comment
      case "phone":
        return (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="text-xs bg-transparent">
              📞 {order.phone}
            </Button>
            <Button variant="outline" size="sm" className="bg-green-500 text-white text-xs">
              📱 WhatsApp
            </Button>
          </div>
        )
      case "phone2":
        return order.phone2
      case "vatCode":
        return order.vatCode
      case "toBeDeliveredOn":
        return order.toBeDeliveredOn
      case "createdOn":
        return order.createdOn
      case "country":
        return order.country
      case "transportCode":
        return order.transportCode
      case "modifiedBy":
        return order.modifiedBy
      case "available":
        return order.available
      case "messenger":
        return order.messenger
      case "invoiceNumber":
        return order.invoiceNumber
      case "productDetails":
        return order.productDetails
      case "paid":
        return order.paid
      case "source":
        return order.source
      case "modifiedOn":
        return order.modifiedOn
      case "brand":
        return order.brand
      default:
        return null
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
          <div className="flex items-center space-x-4 mb-4 flex-wrap gap-y-2">
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-sm text-gray-600 bg-transparent">
              Organiser le tableau ⋮
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Afficher les colonnes</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {columnDefinitions
              .filter((col) => col.id !== "select") // Exclude the select checkbox from this menu
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={visibleColumns.includes(column.id)}
                  onCheckedChange={(checked) => toggleColumnVisibility(column.id, checked)}
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {columnDefinitions
                    .filter((col) => visibleColumns.includes(col.id))
                    .map((column) => (
                      <th key={column.id} className="p-3 text-left text-sm font-medium text-gray-600">
                        {column.label}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {sampleOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    {columnDefinitions
                      .filter((col) => visibleColumns.includes(col.id))
                      .map((column) => (
                        <td key={column.id} className="p-3 text-sm">
                          {renderCellContent(order, column.id)}
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
