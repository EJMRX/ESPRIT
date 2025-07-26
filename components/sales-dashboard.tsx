"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Plus, Minus } from "lucide-react"

export default function SalesDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("Mois")
  const [selectedStore, setSelectedStore] = useState("Tous")
  const [customDateFrom, setCustomDateFrom] = useState("01-07-2025")
  const [customDateTo, setCustomDateTo] = useState("31-07-2025")
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const storeData = [
    { name: "DEPOT", revenue: "0.000 DT" },
    { name: "DEPOT2", revenue: "0.000 DT" },
    { name: "ESPRIT 1 BR27", revenue: "7 159.000 DT" },
    { name: "ESPRIT 2 BR16", revenue: "8 875.000 DT" },
    { name: "ESPRIT 3 BR20", revenue: "0.000 DT" },
    { name: "ESPRIT 4 BE6", revenue: "0.000 DT" },
    { name: "ESPRIT 5 HOURIA", revenue: "0.000 DT" },
    { name: "ESPRIT 6 PALESTINE", revenue: "8 645.000 DT" },
    { name: "Non attribué", revenue: "-1.000 DT 859" },
  ]

  return (
    <div className="p-6 bg-gradient-to-b from-blue-100 to-blue-200 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gray-600 rounded border-2 border-gray-400 flex items-center justify-center">
            <div className="text-white">
              <div className="flex space-x-1">
                <div className="w-1 h-8 bg-white"></div>
                <div className="w-1 h-6 bg-white mt-2"></div>
                <div className="w-1 h-4 bg-white mt-4"></div>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Tableau de bord des ventes</h1>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="dashboard">Tableau de Bord des Ventes</TabsTrigger>
            <TabsTrigger value="analysis">Analyse du Chiffre d'affaires</TabsTrigger>
            <TabsTrigger value="history">Historique des Ventes</TabsTrigger>
            <TabsTrigger value="journal">Journal des ventes</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis">
            <Card className="bg-white">
              <CardContent className="p-6">
                {/* Period Selection */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="font-medium">Période analysée</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={selectedPeriod === "Jour" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPeriod("Jour")}
                      className="bg-orange-500 text-white"
                    >
                      ◀
                    </Button>
                    <Button
                      variant={selectedPeriod === "Jour" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPeriod("Jour")}
                      className="bg-orange-500 text-white"
                    >
                      ▶
                    </Button>
                    <span className="font-medium">{selectedPeriod}</span>
                  </div>
                  <div className="flex items-center space-x-2 ml-auto">
                    <Button variant="link" className="text-orange-500">
                      Jour
                    </Button>
                    <span>|</span>
                    <Button variant="link" className="text-orange-500">
                      Semaine
                    </Button>
                    <span>|</span>
                    <Button variant="link" className="text-orange-500 font-bold">
                      Mois
                    </Button>
                    <span>|</span>
                    <Button variant="link" className="text-orange-500">
                      Année
                    </Button>
                  </div>
                </div>

                {/* Custom Period */}
                <div className="flex items-center space-x-4 mb-6">
                  <span>Période personnalisée</span>
                  <Input value={customDateFrom} onChange={(e) => setCustomDateFrom(e.target.value)} className="w-32" />
                  <span>au</span>
                  <Input value={customDateTo} onChange={(e) => setCustomDateTo(e.target.value)} className="w-32" />
                  <span>Magasin:</span>
                  <Select value={selectedStore} onValueChange={setSelectedStore}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tous">Tous</SelectItem>
                      <SelectItem value="DEPOT">DEPOT</SelectItem>
                      <SelectItem value="ESPRIT 1 BR27">ESPRIT 1 BR27</SelectItem>
                      <SelectItem value="ESPRIT 2 BR16">ESPRIT 2 BR16</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Revenue Summary */}
                <div className="bg-gray-200 p-4 rounded mb-6">
                  <h2 className="text-lg font-bold">Chiffre d'affaire: 24679 DT</h2>
                </div>

                {/* Expandable Sections */}
                <div className="space-y-2">
                  <div>
                    <Button
                      variant="ghost"
                      onClick={() => toggleSection("magasin")}
                      className="flex items-center space-x-2 text-green-600 p-0"
                    >
                      {expandedSections.includes("magasin") ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                      <span>Détail par magasin</span>
                    </Button>
                  </div>

                  <div>
                    <Button
                      variant="ghost"
                      onClick={() => toggleSection("category")}
                      className="flex items-center space-x-2 text-green-600 p-0"
                    >
                      {expandedSections.includes("category") ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                      <span>Détail par catégorie d'article</span>
                    </Button>
                  </div>
                </div>

                {/* Store Details */}
                {expandedSections.includes("magasin") && (
                  <div className="mt-6">
                    <h3 className="font-bold mb-4">Détail par Magasins</h3>
                    <div className="space-y-2">
                      {storeData.map((store, index) => (
                        <div key={index} className="flex justify-between items-center py-1">
                          <span className="text-blue-600">{store.name}</span>
                          <span className="font-medium">{store.revenue}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Legend */}
                <div className="flex items-center space-x-4 mt-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-400"></div>
                    <span className="text-sm">Matériel</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-400"></div>
                    <span className="text-sm">Service</span>
                  </div>
                </div>

                <div className="mt-4">
                  <Button variant="link" className="text-blue-600 underline">
                    Get Adobe Flash player
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="bg-white">
              <CardContent className="p-6">
                {/* Period Selection */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="font-medium">Période analysée</span>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" className="bg-orange-500 text-white">
                      ◀
                    </Button>
                    <Button size="sm" className="bg-orange-500 text-white">
                      ▶
                    </Button>
                    <span className="font-medium">Jour</span>
                  </div>
                  <div className="flex items-center space-x-2 ml-auto">
                    <Button variant="link" className="text-orange-500 font-bold">
                      Jour
                    </Button>
                    <span>|</span>
                    <Button variant="link" className="text-orange-500">
                      Semaine
                    </Button>
                    <span>|</span>
                    <Button variant="link" className="text-orange-500">
                      Mois
                    </Button>
                    <span>|</span>
                    <Button variant="link" className="text-orange-500">
                      Année
                    </Button>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <span>Période personnalisée</span>
                  <Input value="26-07-2025" className="w-32" />
                  <span>au</span>
                  <Input value="26-07-2025" className="w-32" />
                  <span>Magasin:</span>
                  <Select defaultValue="Tous">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tous">Tous</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">RECHERCHER</Button>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <span>Contact:</span>
                  <Input defaultValue="Tous" className="w-48" />
                  <RadioGroup defaultValue="factures" className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="factures" id="factures" />
                      <Label htmlFor="factures">Factures</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="commandes" id="commandes" />
                      <Label htmlFor="commandes">Commandes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ffc" id="ffc" />
                      <Label htmlFor="ffc">FFC</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bon-livraison" id="bon-livraison" />
                      <Label htmlFor="bon-livraison">Bon Livraison</Label>
                    </div>
                  </RadioGroup>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">IMPRIMER</Button>
                </div>

                {/* Results */}
                <div className="border rounded">
                  <div className="bg-gray-100 p-2 flex justify-between items-center">
                    <span className="text-sm">Résultat de la recherche :</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">1</span>
                      <span className="text-sm">Réponse 1 à 6 sur 6</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    {[
                      {
                        date: "26-07-2025",
                        ref: "FAC-000000-102354",
                        desc: "corva j20, j24",
                        status: "Statut: AcquittÃ©e -",
                        qty: "1 x",
                        price: "10.000 DT HT",
                        total: "10.000 DT",
                      },
                      {
                        date: "26-07-2025",
                        ref: "FAC-000000-102353",
                        desc: "24019 vert bleu",
                        status: "Statut: AcquittÃ©e -",
                        qty: "1 x",
                        price: "24.500 DT HT",
                        total: "24.500 DT",
                      },
                      {
                        date: "26-07-2025",
                        ref: "FAC-000000-102352",
                        desc: "MX1983 Fashion",
                        status: "Statut: AcquittÃ©e -",
                        qty: "1 x",
                        price: "70.000 DT HT",
                        total: "70.000 DT",
                      },
                      {
                        date: "26-07-2025",
                        ref: "FAC-000000-102351",
                        desc: "474 Sylvester Mulle",
                        status: "Statut: AcquittÃ©e -",
                        qty: "1 x",
                        price: "19.000 DT HT",
                        total: "19.000 DT",
                      },
                      {
                        date: "26-07-2025",
                        ref: "FAC-000000-102350",
                        desc: "k03 yanis",
                        status: "Statut: AcquittÃ©e -",
                        qty: "1 x",
                        price: "32.500 DT HT",
                        total: "32.500 DT",
                      },
                      {
                        date: "26-07-2025",
                        ref: "FAC-000000-102349",
                        desc: "k03 yanis",
                        status: "Statut: AcquittÃ©e -",
                        qty: "1 x",
                        price: "32.500 DT HT",
                        total: "32.500 DT",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm">{item.date}</span>
                            <span className="text-blue-600 underline text-sm">{item.ref}</span>
                            <Button size="sm" className="bg-red-500 text-white p-1">
                              📄
                            </Button>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {item.desc}
                            <br />
                            <span className="italic">{item.status}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <span>{item.qty}</span>
                          <span className="font-medium">{item.price}</span>
                          <span className="font-medium">{item.total}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboard">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="text-center text-gray-500 mt-8">
                  <p>Tableau de bord des ventes - Fonctionnalité à implémenter</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="journal">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="text-center text-gray-500 mt-8">
                  <p>Journal des ventes - Fonctionnalité à implémenter</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
