"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Plus, X } from "lucide-react"

interface AddModifyOrderModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddModifyOrderModal({ isOpen, onClose }: AddModifyOrderModalProps) {
  const [clientName, setClientName] = useState("")
  const [governorate, setGovernorate] = useState("")
  const [city, setCity] = useState("")
  const [address, setAddress] = useState("")
  const [mainPhone, setMainPhone] = useState("")
  const [secondaryPhone, setSecondaryPhone] = useState("")
  const [deliveredBy, setDeliveredBy] = useState("firstdelivery")
  const [comments, setComments] = useState("")
  const [selectedProduct, setSelectedProduct] = useState("")
  const [discountType, setDiscountType] = useState("Fixe")
  const [discountValue, setDiscountValue] = useState("0")
  const [orderDiscount, setOrderDiscount] = useState("0,000")
  const [deliveryFees, setDeliveryFees] = useState("8,000")
  const [freeDelivery, setFreeDelivery] = useState(false)
  const [total, setTotal] = useState("0,000")
  const [showComments, setShowComments] = useState(false)

  if (!isOpen) return null

  const handleSave = () => {
    console.log("Saving order...")
    onClose()
  }

  const handleAddProduct = () => {
    console.log("Adding product:", selectedProduct)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gray-100 px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Ajouter ou modifier une commande</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex h-full">
          {/* Left Panel */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Client Information */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <span>📋</span>
                  <span>Informations du client</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nom du client</label>
                  <div className="flex space-x-2">
                    <Input
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="flex-1"
                      placeholder="Entrez le nom du client"
                    />
                    <Button size="sm" className="bg-gray-400 hover:bg-gray-500">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Gouvernorat</label>
                    <Select value={governorate} onValueChange={setGovernorate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tunis">Tunis</SelectItem>
                        <SelectItem value="ariana">Ariana</SelectItem>
                        <SelectItem value="ben-arous">Ben Arous</SelectItem>
                        <SelectItem value="manouba">Manouba</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Ville</label>
                    <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ville" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Adresse</label>
                    <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adresse" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Téléphone principal</label>
                    <Input value={mainPhone} onChange={(e) => setMainPhone(e.target.value)} placeholder="Téléphone" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Téléphone secondaire</label>
                  <Input
                    value={secondaryPhone}
                    onChange={(e) => setSecondaryPhone(e.target.value)}
                    placeholder="Téléphone secondaire"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping / Payment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <span>🚚</span>
                  <span>Expédition / Paiement</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Livrée par</label>
                  <Select value={deliveredBy} onValueChange={setDeliveredBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="firstdelivery">firstdelivery</SelectItem>
                      <SelectItem value="seconddelivery">seconddelivery</SelectItem>
                      <SelectItem value="thirddelivery">thirddelivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Button
                    variant="ghost"
                    onClick={() => setShowComments(!showComments)}
                    className="text-sm text-gray-600 p-0 h-auto"
                  >
                    💬 Commentaires {showComments ? "▼" : "▶"}
                  </Button>
                  {showComments && (
                    <Textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Écrire votre commentaire ici"
                      className="mt-2"
                      rows={4}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel */}
          <div className="w-96 bg-gray-50 p-6 border-l overflow-y-auto">
            {/* Order Details */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <span>📦</span>
                  <span>Détails de la commande</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chercher un produit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product1">Produit 1</SelectItem>
                      <SelectItem value="product2">Produit 2</SelectItem>
                      <SelectItem value="product3">Produit 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleAddProduct} className="w-full bg-green-500 hover:bg-green-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter le produit
                </Button>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <span>📊</span>
                  <span>Résumé de la commande</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm w-16">Remise</span>
                  <Select value={discountType} onValueChange={setDiscountType}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fixe">Fixe</SelectItem>
                      <SelectItem value="Pourcentage">%</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} className="w-16" />
                </div>

                <div className="flex justify-between text-sm">
                  <span>Remise sur commande</span>
                  <span>{orderDiscount} TND</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Frais de livraison</span>
                  <span>{deliveryFees} TND</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="free-delivery" checked={freeDelivery} onCheckedChange={setFreeDelivery} />
                  <label htmlFor="free-delivery" className="text-sm">
                    Livraison gratuite
                  </label>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{total} TND</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4 border-t flex justify-end space-x-4">
          <Button onClick={onClose} className="bg-orange-500 hover:bg-orange-600 text-white px-8">
            Quitter
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-8">
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  )
}
