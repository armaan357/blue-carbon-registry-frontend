"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Navigation } from "lucide-react"

interface LocationPickerProps {
  onLocationChange: (lat: number, lng: number) => void
  latitude?: number
  longitude?: number
}

export function LocationPicker({ onLocationChange, latitude, longitude }: LocationPickerProps) {
  const [lat, setLat] = useState(latitude?.toString() || "")
  const [lng, setLng] = useState(longitude?.toString() || "")

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLat = position.coords.latitude
          const newLng = position.coords.longitude
          setLat(newLat.toString())
          setLng(newLng.toString())
          onLocationChange(newLat, newLng)
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  const handleManualUpdate = () => {
    const latNum = Number.parseFloat(lat)
    const lngNum = Number.parseFloat(lng)
    if (!isNaN(latNum) && !isNaN(lngNum)) {
      onLocationChange(latNum, lngNum)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Location Coordinates</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              type="number"
              step="any"
              placeholder="e.g., 19.0760"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              onBlur={handleManualUpdate}
            />
          </div>
          <div>
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              type="number"
              step="any"
              placeholder="e.g., 72.8777"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              onBlur={handleManualUpdate}
            />
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGetCurrentLocation}
          className="w-full flex items-center space-x-2 bg-transparent"
        >
          <Navigation className="h-4 w-4" />
          <span>Use Current Location</span>
        </Button>

        {lat && lng && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Selected coordinates: {Number.parseFloat(lat).toFixed(6)}, {Number.parseFloat(lng).toFixed(6)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
