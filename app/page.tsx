"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Power, Lock, Play } from "lucide-react"
import AddModifyOrderModal from "@/components/add-modify-order-modal"
import OrderManagement from "@/components/order-management"
import CatalogSearch from "@/components/catalog-search"

const backendMenus = {
  bureau: {
    name: "Bureau",
    items: [],
  },
  annuaire: {
    name: "Annuaire",
    items: [
      { id: "annuaire_recherche", name: "Recherche" },
      { id: "annuaire_nouvelle_fiche", name: "Nouvelle fiche" },
      { id: "annuaire_valider_inscriptions", name: "Valider les inscriptions" },
    ],
  },
  catalogue: {
    name: "Catalogue",
    items: [
      { id: "catalogue_recherche", name: "Recherche" },
      { id: "catalogue_articles", name: "Nouvel Article" },
      { id: "solde_catalogue_recherche", name: "Solde Article" },
    ],
  },
  commandes: {
    name: "Gestionnaire de commande",
    items: [
      { id: "ajouter_modifier_commande", name: "Ajouter ou Modifier une Commande" },
      { id: "toutes_commandes", name: "Toutes Les Commandes" },
      { id: "panier_abandonne", name: "Panier Abandonné" },
      { id: "en_attente", name: "En Attente" },
      { id: "confirmees", name: "Confirmées" },
      { id: "pret_expedier", name: "Prêt à Expédier" },
      { id: "retour_non_recues", name: "Retour Non Reçues" },
      { id: "expediees", name: "Expédiées" },
      { id: "livrees", name: "Livrées" },
      { id: "annulees", name: "Annulées" },
      { id: "retour_recues", name: "Retour Reçues" },
      { id: "payees", name: "Payées" },
      { id: "gestion_commandes", name: "Gestion de commandes" },
      { id: "echange", name: "Echange" },
      { id: "expedition_douchette", name: "Expédition Avec Douchette" },
      { id: "retour_douchette", name: "Retour Avec Douchette" },
      { id: "manifests", name: "Manifests" },
    ],
  },
  ventes: {
    name: "Ventes",
    items: [
      { id: "tableau_bord_ventes", name: "Tableau de bord des ventes" },
      { id: "document_recherche", name: "Recherche de documents" },
      { id: "documents_devis_clients_encours", name: "Devis en cours" },
      { id: "documents_commandes_clients_encours", name: "Commandes en cours" },
      { id: "document_nouveau_dev", name: "Nouveau Devis" },
      { id: "document_nouveau_cdc", name: "Nouvelle Commande" },
      { id: "document_nouveau_blc", name: "Nouveau Bon de Livraison" },
      { id: "document_nouveau_fac", name: "Nouvelle Facture" },
    ],
  },
  achats: {
    name: "Achats",
    items: [
      { id: "document_recherches", name: "Recherche de documents" },
      { id: "documents_commandes_fournisseurs_encours", name: "Commandes en cours" },
      { id: "documents_historique_achats", name: "Historique des achats" },
      { id: "document_nouveau_cdf", name: "Nouvelle Commande" },
      { id: "document_nouveau_blf", name: "Nouvelle Réception" },
      { id: "document_nouveau_faf", name: "Nouvelle Facture" },
    ],
  },
  stocks: {
    name: "Stocks",
    items: [
      { id: "document_recherche_trm", name: "Recherche de documents" },
      { id: "gestion_stock", name: "Gestion de stock" },
      { id: "historique_trm", name: "Historique transfert de marchandise" },
      { id: "document_nouveau_fab", name: "Nouveau Bon de Fabrication" },
      { id: "document_nouveau_des", name: "Nouveau Desassemblage" },
      { id: "document_nouveau_bm", name: "Nouveau Transfert de marchandises" },
      { id: "inventaire", name: "Nouvel Inventaire" },
      { id: "stock_code_affaire", name: "Stock par code affaire" },
      { id: "detail_stock_plus", name: "Detail stock ++" },
      { id: "stock_dormant", name: "Stock dormant" },
    ],
  },
  comptabilite: {
    name: "Comptabilité",
    items: [
      { id: "compta_choix_caisse", name: "Gestion des Caisses" },
      { id: "compta_gestion_terminaux", name: "Gestion des Terminaux de Paiement" },
      { id: "compta_gestion_traites_prelev", name: "Gestion des Traites et prélèvements" },
      { id: "compte_bancaire_gestion", name: "Gestion des Comptes Bancaires" },
      { id: "compte_gestion_ticke_resto", name: "Gestion des Tickets de Restaurant" },
      { id: "compta_situation_client", name: "Situation Clients" },
      { id: "compta_situation_fournisseur", name: "Situation Fournisseurs" },
      { id: "compta_gestion_commerciaux", name: "Situation Commerciaux" },
      { id: "compta_situation_generale", name: "Situation Générale" },
      { id: "compta_automatique", name: "Comptabilité automatique" },
      { id: "compta_journal_achats", name: "Journal des achats" },
      { id: "compta_journal_ventes", name: "Journal des ventes" },
      { id: "compta_journal_tresorerie", name: "Journaux de trésorerie" },
      { id: "compta_compte_bancaire_rapprochement_gestion", name: "Rapprochements Bancaires" },
      { id: "pa_non_defini", name: "Prix d'achat non définis" },
    ],
  },
  outils: {
    name: "Outils",
    items: [
      { id: "site_web", name: "Site Web" },
      { id: "ma_boutique", name: "Ma Boutique" },
      { id: "promotion", name: "Promotion" },
      { id: "affiliation", name: "Affiliation" },
      { id: "upsell", name: "Upsell" },
      { id: "page_navigations", name: "Page Navigations" },
      { id: "domaine", name: "Domaine" },
      { id: "panier_rapide", name: "Panier Rapide" },
      { id: "mes_clients", name: "Mes Clients" },
      { id: "reclamations", name: "Réclamations" },
    ],
  },
}

const stores = [
  { id: 1, name: "DEPOT", active: true },
  { id: 13, name: "DEPOT2", active: false },
  { id: 7, name: "ESPRIT 1 BR27", active: false },
  { id: 8, name: "ESPRIT 2 BR16", active: false },
  { id: 9, name: "ESPRIT 3 BR20", active: false },
  { id: 10, name: "ESPRIT 4 BE6", active: false },
  { id: 11, name: "ESPRIT 5 HOURIA", active: false },
  { id: 12, name: "ESPRIT 6 PALESTINE", active: false },
]

export default function POSSystem() {
  const [currentTotal, setCurrentTotal] = useState("0,000")
  const [displayValue, setDisplayValue] = useState("0.000")
  const [currentView, setCurrentView] = useState("pos")
  const [activeBackendMenu, setActiveBackendMenu] = useState("bureau")
  const [activeStore, setActiveStore] = useState(1)
  const [showOptionsMenu, setShowOptionsMenu] = useState(false)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)
  const [showAddOrderModal, setShowAddOrderModal] = useState(false)
  const [showOrderManagement, setShowOrderManagement] = useState(false)
  const [showCatalogSearch, setShowCatalogSearch] = useState(false)
  const [buttonLayout, setButtonLayout] = useState("advanced") // "advanced" or "return"

  const handleNumberClick = (num: string) => {
    if (displayValue === "0.000") {
      setDisplayValue(num)
    } else {
      setDisplayValue(displayValue + num)
    }
  }

  const handleClear = () => {
    setDisplayValue("0.000")
    setCurrentTotal("0,000")
  }

  const handlePrice = () => {
    console.log("Prix clicked")
  }

  const handleQuantity = () => {
    console.log("QTÉ clicked")
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showOptionsMenu && !event.target.closest(".relative")) {
        setShowOptionsMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showOptionsMenu])

  if (currentView === "backend") {
    // Show Catalog Search when catalogue_recherche is active
    if (showCatalogSearch) {
      return (
        <div className="min-h-screen bg-white">
          <div className="bg-blue-600 text-white p-2">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
              <div className="flex space-x-6 relative">
                {Object.entries(backendMenus).map(([key, menu]) => (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => setHoveredMenu(key)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    <button
                      onClick={() => {
                        setActiveBackendMenu(key)
                        if (key !== "catalogue") {
                          setShowCatalogSearch(false)
                          setShowOrderManagement(false)
                        }
                      }}
                      className={`px-4 py-2 rounded ${activeBackendMenu === key ? "bg-blue-500" : "hover:bg-blue-700"}`}
                    >
                      {menu.name}
                    </button>

                    {hoveredMenu === key && menu.items.length > 0 && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded shadow-lg z-50 text-black">
                        <div className="py-2">
                          {menu.items.map((item, index) => (
                            <button
                              key={item.id}
                              onClick={() => {
                                if (item.id === "ajouter_modifier_commande") {
                                  setShowAddOrderModal(true)
                                } else if (item.id === "catalogue_recherche") {
                                  setShowCatalogSearch(true)
                                  setShowOrderManagement(false)
                                } else {
                                  console.log(`Clicked: ${item.name}`)
                                }
                                setHoveredMenu(null)
                                setActiveBackendMenu(key)
                              }}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            >
                              {item.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                  className="px-4 py-2 bg-blue-500 rounded font-medium"
                >
                  Options
                </button>

                {showOptionsMenu && (
                  <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded shadow-lg z-50 text-black">
                    <div className="p-4">
                      <div className="font-bold mb-2">Interface en cours</div>
                      <div className="space-y-1 mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-green-500 rounded"></div>
                          <span className="text-sm">Interface Collaborateur</span>
                        </div>
                        <button
                          onClick={() => setCurrentView("pos")}
                          className="flex items-center space-x-2 text-sm hover:bg-gray-100 w-full p-1 rounded"
                        >
                          <div className="w-4 h-4 bg-gray-300 rounded"></div>
                          <span>Interface Caisse</span>
                        </button>
                      </div>

                      <hr className="my-2" />

                      <div className="font-bold mb-2">Magasin en cours</div>
                      <div className="space-y-1 mb-4">
                        {stores.map((store) => (
                          <button
                            key={store.id}
                            onClick={() => setActiveStore(store.id)}
                            className="flex items-center space-x-2 text-sm hover:bg-gray-100 w-full p-1 rounded"
                          >
                            <div
                              className={`w-4 h-4 ${store.id === activeStore ? "bg-green-500" : "bg-gray-300"} rounded`}
                            ></div>
                            <span>{store.name}</span>
                          </button>
                        ))}
                      </div>

                      <hr className="my-2" />

                      <button
                        onClick={() => setCurrentView("pos")}
                        className="text-sm hover:bg-gray-100 w-full p-1 rounded text-left"
                      >
                        Déconnexion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <CatalogSearch />
          <AddModifyOrderModal isOpen={showAddOrderModal} onClose={() => setShowAddOrderModal(false)} />
        </div>
      )
    }

    // Show Order Management when commandes menu is active
    if (showOrderManagement) {
      return (
        <div className="min-h-screen bg-white">
          <div className="bg-blue-600 text-white p-2">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
              <div className="flex space-x-6 relative">
                {Object.entries(backendMenus).map(([key, menu]) => (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => setHoveredMenu(key)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    <button
                      onClick={() => {
                        setActiveBackendMenu(key)
                        if (key !== "commandes") {
                          setShowOrderManagement(false)
                          setShowCatalogSearch(false)
                        }
                      }}
                      className={`px-4 py-2 rounded ${activeBackendMenu === key ? "bg-blue-500" : "hover:bg-blue-700"}`}
                    >
                      {menu.name}
                    </button>

                    {hoveredMenu === key && menu.items.length > 0 && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded shadow-lg z-50 text-black">
                        <div className="py-2">
                          {menu.items.map((item, index) => (
                            <button
                              key={item.id}
                              onClick={() => {
                                if (item.id === "ajouter_modifier_commande") {
                                  setShowAddOrderModal(true)
                                } else if (item.id === "catalogue_recherche") {
                                  setShowCatalogSearch(true)
                                  setShowOrderManagement(false)
                                } else {
                                  console.log(`Clicked: ${item.name}`)
                                }
                                setHoveredMenu(null)
                                setActiveBackendMenu(key)
                              }}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            >
                              {item.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                  className="px-4 py-2 bg-blue-500 rounded font-medium"
                >
                  Options
                </button>

                {showOptionsMenu && (
                  <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded shadow-lg z-50 text-black">
                    <div className="p-4">
                      <div className="font-bold mb-2">Interface en cours</div>
                      <div className="space-y-1 mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-green-500 rounded"></div>
                          <span className="text-sm">Interface Collaborateur</span>
                        </div>
                        <button
                          onClick={() => setCurrentView("pos")}
                          className="flex items-center space-x-2 text-sm hover:bg-gray-100 w-full p-1 rounded"
                        >
                          <div className="w-4 h-4 bg-gray-300 rounded"></div>
                          <span>Interface Caisse</span>
                        </button>
                      </div>

                      <hr className="my-2" />

                      <div className="font-bold mb-2">Magasin en cours</div>
                      <div className="space-y-1 mb-4">
                        {stores.map((store) => (
                          <button
                            key={store.id}
                            onClick={() => setActiveStore(store.id)}
                            className="flex items-center space-x-2 text-sm hover:bg-gray-100 w-full p-1 rounded"
                          >
                            <div
                              className={`w-4 h-4 ${store.id === activeStore ? "bg-green-500" : "bg-gray-300"} rounded`}
                            ></div>
                            <span>{store.name}</span>
                          </button>
                        ))}
                      </div>

                      <hr className="my-2" />

                      <button
                        onClick={() => setCurrentView("pos")}
                        className="text-sm hover:bg-gray-100 w-full p-1 rounded text-left"
                      >
                        Déconnexion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <OrderManagement onAddOrder={() => setShowAddOrderModal(true)} />
          <AddModifyOrderModal isOpen={showAddOrderModal} onClose={() => setShowAddOrderModal(false)} />
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
        <div className="bg-blue-600 text-white p-2">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex space-x-6 relative">
              {Object.entries(backendMenus).map(([key, menu]) => (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => setHoveredMenu(key)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <button
                    onClick={() => {
                      setActiveBackendMenu(key)
                      if (key === "commandes") {
                        setShowOrderManagement(true)
                        setShowCatalogSearch(false)
                      } else if (key === "catalogue") {
                        setShowCatalogSearch(false)
                        setShowOrderManagement(false)
                      }
                    }}
                    className={`px-4 py-2 rounded ${activeBackendMenu === key ? "bg-blue-500" : "hover:bg-blue-700"}`}
                  >
                    {menu.name}
                  </button>

                  {hoveredMenu === key && menu.items.length > 0 && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded shadow-lg z-50 text-black">
                      <div className="py-2">
                        {menu.items.map((item, index) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              if (item.id === "ajouter_modifier_commande") {
                                setShowAddOrderModal(true)
                              } else if (item.id === "catalogue_recherche") {
                                setShowCatalogSearch(true)
                                setShowOrderManagement(false)
                              } else {
                                console.log(`Clicked: ${item.name}`)
                              }
                              setHoveredMenu(null)
                              setActiveBackendMenu(key)
                              if (key === "commandes") {
                                setShowOrderManagement(true)
                              }
                            }}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                className="px-4 py-2 bg-blue-500 rounded font-medium"
              >
                Options
              </button>

              {showOptionsMenu && (
                <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded shadow-lg z-50 text-black">
                  <div className="p-4">
                    <div className="font-bold mb-2">Interface en cours</div>
                    <div className="space-y-1 mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="text-sm">Interface Collaborateur</span>
                      </div>
                      <button
                        onClick={() => setCurrentView("pos")}
                        className="flex items-center space-x-2 text-sm hover:bg-gray-100 w-full p-1 rounded"
                      >
                        <div className="w-4 h-4 bg-gray-300 rounded"></div>
                        <span>Interface Caisse</span>
                      </button>
                    </div>

                    <hr className="my-2" />

                    <div className="font-bold mb-2">Magasin en cours</div>
                    <div className="space-y-1 mb-4">
                      {stores.map((store) => (
                        <button
                          key={store.id}
                          onClick={() => setActiveStore(store.id)}
                          className="flex items-center space-x-2 text-sm hover:bg-gray-100 w-full p-1 rounded"
                        >
                          <div
                            className={`w-4 h-4 ${store.id === activeStore ? "bg-green-500" : "bg-gray-300"} rounded`}
                          ></div>
                          <span>{store.name}</span>
                        </button>
                      ))}
                    </div>

                    <hr className="my-2" />

                    <button
                      onClick={() => setCurrentView("pos")}
                      className="text-sm hover:bg-gray-100 w-full p-1 rounded text-left"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6">
          {activeBackendMenu !== "bureau" && backendMenus[activeBackendMenu]?.items.length > 0 && (
            <Card className="mb-6">
              <CardHeader className="bg-gray-50">
                <h2 className="text-xl font-bold">{backendMenus[activeBackendMenu].name}</h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {backendMenus[activeBackendMenu].items.map((item, index) => (
                    <Button
                      key={item.id}
                      variant="outline"
                      className="h-16 text-left justify-start bg-transparent"
                      onClick={() => {
                        if (item.id === "ajouter_modifier_commande") {
                          setShowAddOrderModal(true)
                        } else if (item.id === "catalogue_recherche") {
                          setShowCatalogSearch(true)
                        } else {
                          console.log(`Clicked: ${item.name}`)
                        }
                      }}
                    >
                      <div>
                        <div className="font-medium">{item.name}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeBackendMenu === "bureau" && (
            <Tabs defaultValue="recherche" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="recherche">Recherche rapide</TabsTrigger>
                <TabsTrigger value="documents">Documents ouverts</TabsTrigger>
                <TabsTrigger value="taches">Tâches</TabsTrigger>
              </TabsList>

              <TabsContent value="recherche" className="mt-6">
                <Card className="bg-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <label className="w-48 text-right font-medium">Rechercher un Contact</label>
                        <Input className="flex-1" placeholder="Nom du contact..." />
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                          <Search className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center space-x-4">
                        <label className="w-48 text-right font-medium">Rechercher un Article</label>
                        <Input className="flex-1" placeholder="Nom de l'article..." />
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                          <Search className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center space-x-4">
                        <label className="w-48 text-right font-medium">Rechercher un document</label>
                        <Input className="flex-1" placeholder="Numéro de document..." />
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                          <Search className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center space-x-4">
                        <label className="w-48 text-right font-medium">Rechercher un parent</label>
                        <Input className="flex-1" placeholder="Code parent..." />
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                          <Search className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="mt-8 text-center">
                      <div className="inline-flex items-center space-x-2 text-amber-600">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-amber-600 font-bold">!</span>
                        </div>
                        <span className="text-sm">Veuillez remplir tout ou partie du nom recherché puis valider</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-gray-500">Aucun document ouvert</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="taches">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-gray-500">Aucune tâche en cours</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>

        <AddModifyOrderModal isOpen={showAddOrderModal} onClose={() => setShowAddOrderModal(false)} />
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-2 text-center text-gray-400 text-sm">
          VENTES DÉVELOPPER TECHNIQUE GESTION ACHATS
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-2">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-bold">Caisse : Caisse e1</h1>
            <span className="text-sm text-gray-600">Caissier : esprit1</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">
              {new Date()
                .toLocaleString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZone: "GMT",
                })
                .toUpperCase()}
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">SidratSoft</span>
              </div>
              <span className="text-xs text-gray-500">Business</span>
            </div>
            <div className="flex space-x-1">
              <Button size="sm" className="w-8 h-8 p-0 bg-orange-600 hover:bg-orange-700">
                <Power className="w-4 h-4" />
              </Button>
              <Button size="sm" className="w-8 h-8 p-0 bg-gray-600 hover:bg-gray-700">
                <Lock className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                className="w-8 h-8 p-0 bg-blue-600 hover:bg-blue-700"
                onClick={() => setCurrentView("backend")}
              >
                <Play className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-2">
        <div className="grid grid-cols-12 gap-2">
          {/* Left Panel - Client and Calculator */}
          <div className="col-span-3 space-y-2">
            {/* Client Info */}
            <Card className="bg-white border">
              <CardContent className="p-2">
                <div className="text-sm">
                  <span className="font-medium">Client : Client non identifié</span>
                </div>
              </CardContent>
            </Card>

            {/* Total Display */}
            <Card className="bg-black text-white">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">TOTAL</div>
                  <div className="text-4xl font-bold">{currentTotal} DT</div>
                  <div className="text-right text-sm mt-1">0</div>
                </div>
              </CardContent>
            </Card>

            {/* Calculator */}
            <Card>
              <CardContent className="p-2">
                <div className="grid grid-cols-4 gap-1 mb-2">
                  {[7, 8, 9].map((num) => (
                    <Button
                      key={num}
                      onClick={() => handleNumberClick(num.toString())}
                      className="h-10 text-lg font-bold bg-blue-500 hover:bg-blue-600"
                    >
                      {num}
                    </Button>
                  ))}
                  <Button className="h-10 text-sm font-bold bg-gray-300 hover:bg-gray-400 text-black">+/-</Button>
                </div>
                <div className="grid grid-cols-4 gap-1 mb-2">
                  {[4, 5, 6].map((num) => (
                    <Button
                      key={num}
                      onClick={() => handleNumberClick(num.toString())}
                      className="h-10 text-lg font-bold bg-blue-500 hover:bg-blue-600"
                    >
                      {num}
                    </Button>
                  ))}
                  <Button
                    onClick={handleClear}
                    className="h-10 text-sm font-bold bg-gray-300 hover:bg-gray-400 text-black"
                  >
                    REMISE
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-1 mb-2">
                  {[1, 2, 3].map((num) => (
                    <Button
                      key={num}
                      onClick={() => handleNumberClick(num.toString())}
                      className="h-10 text-lg font-bold bg-blue-500 hover:bg-blue-600"
                    >
                      {num}
                    </Button>
                  ))}
                  <Button
                    onClick={handlePrice}
                    className="h-10 text-sm font-bold bg-gray-300 hover:bg-gray-400 text-black"
                  >
                    PRIX
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-1 mb-2">
                  <Button onClick={handleClear} className="h-10 text-lg font-bold bg-blue-500 hover:bg-blue-600">
                    C
                  </Button>
                  <Button
                    onClick={() => handleNumberClick("0")}
                    className="h-10 text-lg font-bold bg-blue-500 hover:bg-blue-600"
                  >
                    0
                  </Button>
                  <Button
                    onClick={() => handleNumberClick(",")}
                    className="h-10 text-lg font-bold bg-blue-500 hover:bg-blue-600"
                  >
                    ,
                  </Button>
                  <Button
                    onClick={handleQuantity}
                    className="h-10 text-sm font-bold bg-gray-300 hover:bg-gray-400 text-black"
                  >
                    QTÉ
                  </Button>
                </div>
                <div className="text-center mb-2 bg-black text-white p-2 rounded">
                  <div className="text-lg font-bold">{displayValue}</div>
                </div>
                <Button className="w-full h-10 text-lg font-bold bg-blue-600 hover:bg-blue-700">OK</Button>
              </CardContent>
            </Card>
          </div>

          {/* Center Panel - Product List */}
          <div className="col-span-6 space-y-2">
            <Card>
              <CardHeader className="bg-orange-500 text-white p-2">
                <div className="grid grid-cols-5 gap-2 text-sm font-bold">
                  <div>Libelle</div>
                  <div>Qte</div>
                  <div>P.U TTC</div>
                  <div>%</div>
                  <div>Prix TTC</div>
                </div>
              </CardHeader>
              <CardContent className="p-4 min-h-48">
                <div className="text-center text-gray-500 mt-8">Aucun article sélectionné</div>
              </CardContent>
            </Card>

            {/* Search and Add */}
            <div className="flex space-x-2">
              <Input placeholder="Rechercher un article..." className="flex-1" />
              <Button className="bg-blue-600 hover:bg-blue-700 px-6">Ajouter</Button>
            </div>
          </div>

          {/* Right Panel - Actions */}
          <div className="col-span-3 space-y-2 relative">
            {/* Blue vertical bar */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-blue-800 text-white flex items-center justify-center">
              <button
                onClick={() => setButtonLayout(buttonLayout === "advanced" ? "return" : "advanced")}
                className="transform -rotate-90 whitespace-nowrap text-xs font-medium hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
              >
                {buttonLayout === "advanced" ? "Retour" : "Fonctionnalités Avancées"}
              </button>
            </div>

            <div className="pr-10 space-y-2">
              {buttonLayout === "advanced" ? (
                // Advanced Features Layout (caisse-buttons2.png)
                <>
                  <div className="grid grid-cols-2 gap-1">
                    <Button className="h-12 bg-gray-200 hover:bg-gray-300 text-black text-xs">Supprimer ligne</Button>
                    <Button className="h-12 bg-gray-200 hover:bg-gray-300 text-black text-xs">Retour article</Button>
                    <Button className="h-12 bg-gray-200 hover:bg-gray-300 text-black text-xs">
                      Tickets D'aujourd'hui
                    </Button>
                    <Button className="h-12 bg-gray-200 hover:bg-gray-300 text-black text-xs">Ouvrir tiroir</Button>
                    <Button className="h-12 bg-gray-200 hover:bg-gray-300 text-black text-xs">Supprimer ticket</Button>
                    <Button className="h-12 bg-gray-200 hover:bg-gray-300 text-black text-xs">Remise Total</Button>
                    <Button className="h-12 bg-gray-200 hover:bg-gray-300 text-black text-xs">
                      Mettre le ticket en attente
                    </Button>
                    <Button className="h-12 bg-gray-200 hover:bg-gray-300 text-black text-xs">
                      Rappeler un ticket
                    </Button>
                  </div>

                  {/* Special Action Buttons */}
                  <div className="grid grid-cols-2 gap-1">
                    <Button className="h-12 bg-purple-600 hover:bg-purple-700 text-white text-xs flex items-center justify-center space-x-1">
                      <span>Encaissement rapide</span>
                      <span className="text-lg">✕</span>
                    </Button>
                    <Button className="h-12 bg-blue-500 hover:bg-blue-600 text-white text-xs flex items-center justify-center space-x-1">
                      <span>Encaissement rapide</span>
                      <span className="text-lg">🖨</span>
                    </Button>
                  </div>
                </>
              ) : (
                // Return Layout (caisse-buttons1.png)
                <>
                  <div className="grid grid-cols-2 gap-1">
                    <Button className="h-12 bg-gray-200 hover:bg-gray-300 text-black text-xs">Client</Button>
                    <Button className="h-12 bg-gray-200 hover:bg-gray-300 text-black text-xs">Recherche</Button>
                    <Button className="h-12 bg-gray-200 hover:bg-gray-300 text-black text-xs">Famille</Button>
                    <Button className="h-12 bg-gray-200 hover:bg-gray-300 text-black text-xs">Promotion</Button>
                    <Button className="h-12 bg-gray-200 hover:bg-gray-300 text-black text-xs">Vendeur</Button>
                    <Button className="h-12 bg-gray-200 hover:bg-gray-300 text-black text-xs">Caisse</Button>
                    <Button className="h-12 bg-gray-200 hover:bg-gray-300 text-black text-xs">Paramètres</Button>
                    <Button className="h-12 bg-gray-200 hover:bg-gray-300 text-black text-xs">Aide</Button>
                  </div>

                  {/* Additional buttons for return layout */}
                  <div className="grid grid-cols-1 gap-1">
                    <Button className="h-12 bg-green-500 hover:bg-green-600 text-white text-xs">Validation</Button>
                    <Button className="h-12 bg-red-500 hover:bg-red-600 text-white text-xs">Annulation</Button>
                  </div>
                </>
              )}

              {/* Main Cash Button - always present */}
              <Button
                className="w-full h-16 text-2xl font-bold bg-orange-500 hover:bg-orange-600"
                onClick={() => setCurrentView("backend")}
              >
                ENCAISSER
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
