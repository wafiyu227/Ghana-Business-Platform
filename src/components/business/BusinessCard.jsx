"use client"

import { Star, Phone, MessageCircle, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function BusinessCard({ business }) {
  const handleCall = () => {
    window.location.href = `tel:${business.phone}`
  }

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${business.whatsapp.replace(/\s+/g, "")}`, "_blank")
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
      <div className="relative">
        <Image
          src={business.image || "/placeholder.svg"}
          alt={business.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={business.isOpen ? "default" : "secondary"} className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {business.isOpen ? "Open" : "Closed"}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-background/90 text-xs">
            {business.distance}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{business.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{business.category}</p>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium ml-1">{business.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({business.reviewCount} reviews)</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{business.address}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1" onClick={handleCall}>
            <Phone className="h-4 w-4 mr-1" />
            Call
          </Button>
          <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleWhatsApp}>
            <MessageCircle className="h-4 w-4 mr-1" />
            WhatsApp
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
