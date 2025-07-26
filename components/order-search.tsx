"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function OrderSearch() {
  const [store, setStore] = useState("DEPOT")
  const [stockLocation, setStockLocation] = useState("Tous")
  const [category, setCategory] = useState("Toutes")
  const [manufacturer, setManufacturer] = useState("Tous")
  const [client, setClient] = useState("Tous")
  const [supplier, setSupplier] = useState("Tous")
  const [orderStatus, setOrderStatus] = useState("all")
  const [sortBy, setSortBy] = useState("Date de commande")

  const handleSearch = () => {
    console.log("Searching orders...")
  }

  const handleCancel = () => {
    console.log("Cancelling search...")
  }

  return (
    <div className="p-6 bg-gradient-to-b from-blue-100 to-blue-200 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Recherche de commandes clients en cours</h1>

        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column - Search Criteria */}
              <div>
                <h3 className="font-bold mb-4 italic">Critères d'affichage</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Par magasin:</Label>
                    <Select value={store} onValueChange={setStore}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DEPOT">DEPOT</SelectItem>
                        <SelectItem value="DEPOT2">DEPOT2</SelectItem>
                        <SelectItem value="ESPRIT 1 BR27">ESPRIT 1 BR27</SelectItem>
                        <SelectItem value="ESPRIT 2 BR16">ESPRIT 2 BR16</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Par stock de départ:</Label>
                    <Select value={stockLocation} onValueChange={setStockLocation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tous">Tous</SelectItem>
                        <SelectItem value="Stock Principal">Stock Principal</SelectItem>
                        <SelectItem value="Stock Secondaire">Stock Secondaire</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Par catégorie d'article:</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Toutes">Toutes</SelectItem>
                        <SelectItem value="HOMME">HOMME</SelectItem>
                        <SelectItem value="FEMME">FEMME</SelectItem>
                        <SelectItem value="ENFANT">ENFANT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Par fabricant:</Label>
                    <div className="flex space-x-2">
                      <Input
                        value={manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                        className="flex-1"
                      />
                      <Button size="sm" className="bg-gray-400 hover:bg-gray-500">
                        📋
                      </Button>
                      <Button size="sm" className="bg-gray-400 hover:bg-gray-500">
                        ❌
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Par client:</Label>
                    <div className="flex space-x-2">
                      <Input value={client} onChange={(e) => setClient(e.target.value)} className="flex-1" />
                      <Button size="sm" className="bg-gray-400 hover:bg-gray-500">
                        📋
                      </Button>
                      <Button size="sm" className="bg-gray-400 hover:bg-gray-500">
                        ❌
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Par fournisseur:</Label>
                    <div className="flex space-x-2">
                      <Input value={supplier} onChange={(e) => setSupplier(e.target.value)} className="flex-1" />
                      <Button size="sm" className="bg-gray-400 hover:bg-gray-500">
                        📋
                      </Button>
                      <Button size="sm" className="bg-gray-400 hover:bg-gray-500">
                        ❌
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Status */}
              <div>
                <h3 className="font-bold mb-4 italic">Etat de la commande</h3>
                <RadioGroup value={orderStatus} onValueChange={setOrderStatus} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all" className="text-blue-600">
                      Toutes les commandes en cours
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="recent" id="recent" />
                    <Label htmlFor="recent" className="text-blue-600">
                      Uniquement les commandes récentes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delayed" id="delayed" />
                    <Label htmlFor="delayed" className="text-blue-600">
                      Uniquement les commandes en retard
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="validate" id="validate" />
                    <Label htmlFor="validate" className="text-blue-600">
                      Commandes à valider
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="deliver" id="deliver" />
                    <Label htmlFor="deliver" className="text-blue-600">
                      Commandes à livrer
                    </Label>
                  </div>
                </RadioGroup>

                <div className="mt-6">
                  <h4 className="font-bold mb-2 italic">Ordonner les commandes par:</h4>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Date de commande">Date de commande</SelectItem>
                      <SelectItem value="Client">Client</SelectItem>
                      <SelectItem value="Montant">Montant</SelectItem>
                      <SelectItem value="Statut">Statut</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-4">
                  <Button variant="link" className="text-blue-600 underline p-0">
                    Imprimer les Commandes clients
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              <Button onClick={handleSearch} className="bg-orange-500 hover:bg-orange-600 text-white px-8">
                RECHERCHER
              </Button>
              <Button onClick={handleCancel} className="bg-red-500 hover:bg-red-600 text-white px-8">
                ANNULER
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
