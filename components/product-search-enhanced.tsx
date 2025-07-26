"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function ProductSearchEnhanced() {
  const [searchTerm, setSearchTerm] = useState("z7")
  const [category, setCategory] = useState("Toutes")
  const [manufacturer, setManufacturer] = useState("Tous")
  const [enStock, setEnStock] = useState(false)
  const [nouveaute, setNouveaute] = useState(false)
  const [promotions, setPromotions] = useState(false)
  const [archives, setArchives] = useState(false)
  const [parent, setParent] = useState(false)
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [priceDisplay, setPriceDisplay] = useState("TTC")
  const [storageLocation, setStorageLocation] = useState("ESPRIT 1 BR27")
  const [tariff, setTariff] = useState("Tarif principal")

  const searchResults = [
    {
      reference: "A-2308411",
      libelle: "HOMME - Z7 Sylvester",
      stock: 488,
      emplacement: "A1-B2",
      tarifTTC: "55.000 DT",
    },
  ]

  const handleSearch = () => {
    console.log("Searching products...")
  }

  const handleClear = () => {
    setSearchTerm("")
    setCategory("Toutes")
    setManufacturer("Tous")
    setEnStock(false)
    setNouveaute(false)
    setPromotions(false)
    setArchives(false)
    setParent(false)
    setDateFrom("")
    setDateTo("")
  }

  return (
    <div className="p-6 bg-gradient-to-b from-blue-100 to-blue-200 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Recherche d'un article</h1>

        {/* Search Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg bg-blue-100 p-2 rounded">Recherche</CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-gray-50">
            <div className="grid grid-cols-12 gap-4">
              {/* Left Column */}
              <div className="col-span-6 space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Référence, libellé ou code barre:</Label>
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                    placeholder="Entrez la référence ou le libellé"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Catégorie:</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Toutes">Toutes</SelectItem>
                      <SelectItem value="HOMME">HOMME</SelectItem>
                      <SelectItem value="FEMME">FEMME</SelectItem>
                      <SelectItem value="ENFANT">ENFANT</SelectItem>
                      <SelectItem value="ACCESSOIRES">ACCESSOIRES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Constructeur:</Label>
                  <Select value={manufacturer} onValueChange={setManufacturer}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tous">Tous</SelectItem>
                      <SelectItem value="Brand1">Brand 1</SelectItem>
                      <SelectItem value="Brand2">Brand 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="en-stock" checked={enStock} onCheckedChange={setEnStock} />
                    <Label htmlFor="en-stock" className="text-sm">
                      En Stock
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="nouveaute" checked={nouveaute} onCheckedChange={setNouveaute} />
                    <Label htmlFor="nouveaute" className="text-sm">
                      Nouveauté
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="promotions" checked={promotions} onCheckedChange={setPromotions} />
                    <Label htmlFor="promotions" className="text-sm">
                      Promotions
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="archives" checked={archives} onCheckedChange={setArchives} />
                    <Label htmlFor="archives" className="text-sm">
                      Archives
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="parent" checked={parent} onCheckedChange={setParent} />
                    <Label htmlFor="parent" className="text-sm">
                      Parent
                    </Label>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Label className="text-sm">du</Label>
                  <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-32" />
                  <Label className="text-sm">au</Label>
                  <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-32" />
                  <Button className="bg-green-500 hover:bg-green-600 text-white">NOUVEL ARTICLE</Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-6">
              <Button onClick={handleSearch} className="bg-orange-500 hover:bg-orange-600 text-white px-8">
                RECHERCHER
              </Button>
              <Button onClick={handleClear} className="bg-red-500 hover:bg-red-600 text-white px-8">
                ANNULER
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Display Options */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <Label className="text-sm font-medium">Afficher les tarifs</Label>
              <RadioGroup value={priceDisplay} onValueChange={setPriceDisplay} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="HT" id="ht" />
                  <Label htmlFor="ht" className="text-sm">
                    HT
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TTC" id="ttc" />
                  <Label htmlFor="ttc" className="text-sm">
                    TTC
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium">Lieu de stockage:</Label>
              <Select value={storageLocation} onValueChange={setStorageLocation}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Stock Principale">Stock Principale</SelectItem>
                  <SelectItem value="Tous">Tous</SelectItem>
                  <SelectItem value="DEPOT2">DEPOT2</SelectItem>
                  <SelectItem value="ESPRIT 1 BR27">ESPRIT 1 BR27</SelectItem>
                  <SelectItem value="ESPRIT 2 BR16">ESPRIT 2 BR16</SelectItem>
                  <SelectItem value="ESPRIT 3 BR20">ESPRIT 3 BR20</SelectItem>
                  <SelectItem value="ESPRIT 4 BE6">ESPRIT 4 BE6</SelectItem>
                  <SelectItem value="ESPRIT 5 HOURIA">ESPRIT 5 HOURIA</SelectItem>
                  <SelectItem value="ESPRIT 6 PALESTINE">ESPRIT 6 PALESTINE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium">Tarifs:</Label>
              <Select value={tariff} onValueChange={setTariff}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tarif principal">Tarif principal</SelectItem>
                  <SelectItem value="Tarif promotionnel">Tarif promotionnel</SelectItem>
                  <SelectItem value="Tarif grossiste">Tarif grossiste</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <Card>
          <CardContent className="p-0">
            <div className="bg-gray-100 p-3 border-b">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Résultat de la recherche :</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">1</span>
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm" className="w-6 h-6 p-0 bg-transparent">
                      ‹
                    </Button>
                    <Button variant="outline" size="sm" className="w-6 h-6 p-0 bg-transparent">
                      ›
                    </Button>
                  </div>
                  <span className="text-sm">Réponse 1 à 1 sur 1</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-3 text-left text-sm font-medium text-gray-600">Référence</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600">Libellé</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600">Stock</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600">Emplacement</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600">Tarif TTC</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600"></th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((product, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-sm text-blue-600 underline cursor-pointer">{product.reference}</td>
                      <td className="p-3 text-sm">{product.libelle}</td>
                      <td className="p-3 text-sm font-medium">{product.stock}</td>
                      <td className="p-3 text-sm">{product.emplacement}</td>
                      <td className="p-3 text-sm font-medium">{product.tarifTTC}</td>
                      <td className="p-3">
                        <Button variant="link" size="sm" className="text-blue-600 p-0">
                          Voir
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-100 p-3 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm">Résultat de la recherche :</span>
                <span className="text-sm">Réponse 1 à 1 sur 1</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
