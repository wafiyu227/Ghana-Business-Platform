import { useState, useEffect } from "react"
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import {
  Search,
  MapPin,
  Building2,
  Users,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  Eye,
  ArrowLeft,
  Filter,
  SortAsc,
  SortDesc,
} from "lucide-react"
import { supabase } from "../supabaseClient"

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const businessesPerPage = 12

  // Get search parameters from URL
  const searchQuery = searchParams.get("query") || ""
  const location = searchParams.get("location") || ""
  const category = searchParams.get("category") || ""

  useEffect(() => {
    fetchBusinesses()
  }, [searchQuery, location, category])

  const fetchBusinesses = async () => {
    setLoading(true)
    setError("")
    try {
      let query = supabase
        .from("businesses")
        .select(
          "id, business_name, industry, region, district, town, physical_address, contact, email, business_description, employee_count, operating_hours",
        )

      if (searchQuery.trim() !== "") {
        query = query.ilike("business_name", `%${searchQuery.trim()}%`)
      }

      if (location && location !== "All Locations") {
        query = query.or(`region.ilike.%${location}%,district.ilike.%${location}%,town.ilike.%${location}%`)
      }

      if (category && category !== "All Categories") {
        query = query.ilike("industry", category)
      }

      const { data, error } = await query

      if (error) {
        setError("Failed to fetch businesses. Please try again.")
        console.error("Search error:", error)
      } else {
        setBusinesses(data || [])
      }
    } catch (err) {
      console.error(err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const formatLocation = (business) => {
    const locationParts = [business.town, business.district, business.region].filter(Boolean)
    return locationParts.join(", ") || "Location not specified"
  }

  const sortBusinesses = (businesses) => {
    return [...businesses].sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case "name":
          aValue = a.business_name?.toLowerCase() || ""
          bValue = b.business_name?.toLowerCase() || ""
          break
        case "industry":
          aValue = a.industry?.toLowerCase() || ""
          bValue = b.industry?.toLowerCase() || ""
          break
        case "location":
          aValue = formatLocation(a).toLowerCase()
          bValue = formatLocation(b).toLowerCase()
          break
        default:
          aValue = a.business_name?.toLowerCase() || ""
          bValue = b.business_name?.toLowerCase() || ""
      }

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue)
      } else {
        return bValue.localeCompare(aValue)
      }
    })
  }

  const sortedBusinesses = sortBusinesses(businesses)

  // Pagination
  const totalPages = Math.ceil(sortedBusinesses.length / businessesPerPage)
  const startIndex = (currentPage - 1) * businessesPerPage
  const endIndex = startIndex + businessesPerPage
  const currentBusinesses = sortedBusinesses.slice(startIndex, endIndex)

  const goToPage = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
                <p className="text-gray-600 text-sm">
                  {searchQuery && `"${searchQuery}"`}
                  {location && location !== "All Locations" && ` in ${location}`}
                  {category && category !== "All Categories" && ` • ${category}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Summary and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <p className="text-gray-700 font-medium">
              {loading ? (
                "Loading..."
              ) : (
                <>
                  {businesses.length} business{businesses.length !== 1 ? "es" : ""} found
                </>
              )}
            </p>
          </div>

          {/* Sort Controls */}
          {!loading && businesses.length > 0 && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Sort by Name</option>
                  <option value="industry">Sort by Industry</option>
                  <option value="location">Sort by Location</option>
                </select>
              </div>
              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                <span className="text-sm">{sortOrder === "asc" ? "A-Z" : "Z-A"}</span>
              </button>
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Business Results Grid */}
        {!loading && currentBusinesses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentBusinesses.map((business) => (
              <div
                key={business.id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-300 hover:-translate-y-1"
              >
                {/* Business Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">{business.business_name}</h3>
                    <div className="flex items-center text-blue-600 text-sm mb-2">
                      <Building2 className="h-4 w-4 mr-1" />
                      <span className="line-clamp-1">{business.industry || "Industry not specified"}</span>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="line-clamp-1">{formatLocation(business)}</span>
                </div>

                {/* Description */}
                {business.business_description && (
                  <p className="text-gray-700 text-sm mb-3 line-clamp-3">{business.business_description}</p>
                )}

                {/* Additional Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  {business.employee_count && (
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      <span>{business.employee_count} employees</span>
                    </div>
                  )}
                  {business.operating_hours && (
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span className="line-clamp-1">{business.operating_hours}</span>
                    </div>
                  )}
                </div>

                {/* Contact Actions */}
                <div className="space-y-3">
                  {/* Primary Action - View Business */}
                  <Link to={`/business/${business.business_name}`}>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center shadow-sm hover:shadow-md">
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </button>
                  </Link>

                  {/* Secondary Actions */}
                  <div className="grid grid-cols-3 gap-2">
                    {business.contact && (
                      <button
                        onClick={() => {
                          window.open(`tel:${business.contact}`, "_self")
                        }}
                        className="bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 border border-green-200 hover:border-green-300 py-2 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center"
                        title="Call business"
                      >
                        <Phone className="h-3.5 w-3.5 mr-1" />
                        Call
                      </button>
                    )}
                    {business.contact && (
                      <button
                        onClick={() => {
                          const message = `Hi! I found your business "${business.business_name}" and I'm interested in your services.`
                          const whatsappUrl = `https://wa.me/${business.contact.replace(
                            /[^0-9]/g,
                            "",
                          )}?text=${encodeURIComponent(message)}`
                          window.open(whatsappUrl, "_blank")
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center shadow-sm"
                        title="WhatsApp business"
                      >
                        <MessageCircle className="h-3.5 w-3.5 mr-1" />
                        WhatsApp
                      </button>
                    )}
                    {business.email && (
                      <button
                        onClick={() => {
                          const subject = `Inquiry about ${business.business_name}`
                          const body = `Hi,\n\nI found your business "${business.business_name}" and I'm interested in learning more about your services.\n\nBest regards`
                          window.open(
                            `mailto:${business.email}?subject=${encodeURIComponent(
                              subject,
                            )}&body=${encodeURIComponent(body)}`,
                            "_self",
                          )
                        }}
                        className="bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-800 border border-gray-200 hover:border-gray-300 py-2 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center"
                        title="Email business"
                      >
                        <Mail className="h-3.5 w-3.5 mr-1" />
                        Email
                      </button>
                    )}
                  </div>

                  {/* Contact Info Display */}
                  {!business.contact && !business.email && (
                    <div className="text-center py-2">
                      <p className="text-gray-500 text-xs">Contact information not available</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && businesses.length > businessesPerPage && (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`px-3 py-2 border rounded-lg transition-colors ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && businesses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No businesses found</h3>
            <p className="text-gray-600 mb-4">We couldn't find any businesses matching your search criteria.</p>
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Try a different search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResultsPage
