import { BusinessCard } from "@/components/business/business-card"

const featuredBusinesses = [
  {
    id: "1",
    name: "Auntie Muni's Kitchen",
    category: "Restaurant",
    rating: 4.8,
    reviewCount: 124,
    image: "/placeholder.svg?height=200&width=300",
    address: "East Legon, Accra",
    phone: "+233 24 123 4567",
    whatsapp: "+233 24 123 4567",
    isOpen: true,
    distance: "0.8 km",
  },
  {
    id: "2",
    name: "TechFix Ghana",
    category: "Electronics Repair",
    rating: 4.6,
    reviewCount: 89,
    image: "/placeholder.svg?height=200&width=300",
    address: "Osu, Accra",
    phone: "+233 20 987 6543",
    whatsapp: "+233 20 987 6543",
    isOpen: true,
    distance: "1.2 km",
  },
  {
    id: "3",
    name: "Kente Boutique",
    category: "Fashion",
    rating: 4.9,
    reviewCount: 67,
    image: "/placeholder.svg?height=200&width=300",
    address: "Tema, Greater Accra",
    phone: "+233 26 555 7890",
    whatsapp: "+233 26 555 7890",
    isOpen: false,
    distance: "2.1 km",
  },
  {
    id: "4",
    name: "Dr. Kwame's Clinic",
    category: "Healthcare",
    rating: 4.7,
    reviewCount: 156,
    image: "/placeholder.svg?height=200&width=300",
    address: "Adabraka, Accra",
    phone: "+233 30 246 8135",
    whatsapp: "+233 30 246 8135",
    isOpen: true,
    distance: "0.5 km",
  },
]

 function FeaturedBusinesses() {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Businesses</h2>
          <p className="text-muted-foreground">Highly rated businesses in your area</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBusinesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      </div>
    </section>
  )
}
export default FeaturedBusinesses
