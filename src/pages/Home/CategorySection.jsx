import {
  Grid3X3,
  Wheat,
  Factory,
  HardHat,
  ShoppingCart,
  UtensilsCrossed,
  Laptop,
  Heart,
  GraduationCap,
  CreditCard,
  Truck,
  MapPin,
  Home,
  Briefcase,
  Music,
  Sparkles,
} from "lucide-react"

const categories = [
  {
    name: "All Categories",
    icon: Grid3X3,
    count: "2,450 businesses",
    bgColor: "bg-slate-100",
    iconColor: "text-slate-600",
  },
  {
    name: "Agriculture",
    icon: Wheat,
    count: "180 businesses",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    name: "Manufacturing",
    icon: Factory,
    count: "320 businesses",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    name: "Construction",
    icon: HardHat,
    count: "290 businesses",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    name: "Retail & Wholesale",
    icon: ShoppingCart,
    count: "890 businesses",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    name: "Restaurants & Food",
    icon: UtensilsCrossed,
    count: "1,250 businesses",
    bgColor: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    name: "Technology",
    icon: Laptop,
    count: "450 businesses",
    bgColor: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    name: "Healthcare",
    icon: Heart,
    count: "340 businesses",
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    name: "Education",
    icon: GraduationCap,
    count: "280 businesses",
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    name: "Financial Services",
    icon: CreditCard,
    count: "220 businesses",
    bgColor: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    name: "Transportation",
    icon: Truck,
    count: "190 businesses",
    bgColor: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    name: "Tourism & Hospitality",
    icon: MapPin,
    count: "380 businesses",
    bgColor: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    name: "Real Estate",
    icon: Home,
    count: "150 businesses",
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    name: "Professional Services",
    icon: Briefcase,
    count: "420 businesses",
    bgColor: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    name: "Entertainment",
    icon: Music,
    count: "160 businesses",
    bgColor: "bg-rose-100",
    iconColor: "text-rose-600",
  },
  {
    name: "Health & Beauty",
    icon: Sparkles,
    count: "240 businesses",
    bgColor: "bg-fuchsia-100",
    iconColor: "text-fuchsia-600",
  },
]

export default function CategorySection() {
  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore businesses across different industries</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <div
                key={index}
                className="group cursor-pointer bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200 hover:-translate-y-1"
              >
                {/* Icon Container */}
                <div
                  className={`w-16 h-16 ${category.bgColor} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-200`}
                >
                  <IconComponent className={`w-8 h-8 ${category.iconColor}`} />
                </div>

                {/* Category Info */}
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base leading-tight">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">{category.count}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
