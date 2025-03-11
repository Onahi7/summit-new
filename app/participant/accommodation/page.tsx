"use client"

import type React from "react"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building,
  MapPin,
  Star,
  Phone,
  Calendar,
  Search,
  Filter,
  BedDouble,
  Wifi,
  UtensilsCrossed,
  Car,
  Droplets,
  Coffee,
  PhoneIcon as WhatsApp,
  CheckCircle,
  Clock,
  XCircle,
  Ruler,
  Info,
  Tv,
  Maximize,
  Users,
  SortAsc,
  Loader2,
  AlertCircle,
  Heart,
  Share2,
  Sparkles,
  ShowerHead,
  Snowflake,
  RefreshCw,
} from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"

// Sample hotel data
const hotels = [
  {
    id: 1,
    name: "Green Suites Hotel",
    address: "123 Conference Avenue, Abuja",
    distance: 0.5, // in km
    rating: 4.5,
    packages: [
      {
        id: "gs-standard",
        name: "Standard Room",
        price: "₦25,000",
        priceValue: 25000,
        description: "Comfortable room with a queen-sized bed, private bathroom, and basic amenities.",
        capacity: "1-2 guests",
        size: "24 sq.m",
        amenities: ["wifi", "tv", "ac", "breakfast"],
      },
      {
        id: "gs-deluxe",
        name: "Deluxe Room",
        price: "₦35,000",
        priceValue: 35000,
        description: "Spacious room with a king-sized bed, sitting area, and premium amenities.",
        capacity: "2 guests",
        size: "32 sq.m",
        amenities: ["wifi", "tv", "ac", "breakfast", "minibar"],
      },
      {
        id: "gs-executive",
        name: "Executive Suite",
        price: "₦50,000",
        priceValue: 50000,
        description:
          "Luxury suite with separate bedroom and living area, premium amenities, and complimentary services.",
        capacity: "2-3 guests",
        size: "48 sq.m",
        amenities: ["wifi", "tv", "ac", "breakfast", "minibar", "workspace", "bathtub"],
      },
    ],
    priceCategory: "premium",
    amenities: ["wifi", "breakfast", "pool", "parking", "restaurant"],
    images: [
      "/placeholder.svg?height=400&width=600&text=Green+Suites+Exterior",
      "/placeholder.svg?height=400&width=600&text=Green+Suites+Lobby",
      "/placeholder.svg?height=400&width=600&text=Green+Suites+Room",
      "/placeholder.svg?height=400&width=600&text=Green+Suites+Restaurant",
      "/placeholder.svg?height=400&width=600&text=Green+Suites+Pool",
    ],
    phone: "+234 801 234 5678",
    whatsapp: "2348012345678", // WhatsApp number in international format
    email: "bookings@greensuites.com",
    description: "Luxury hotel adjacent to the conference center with modern amenities and excellent service.",
    available: true,
    featured: true,
    mapPosition: { x: 65, y: 45 }, // position on the venue proximity map (%)
    reviews: {
      count: 124,
      average: 4.5,
      breakdown: {
        5: 70,
        4: 40,
        3: 10,
        2: 3,
        1: 1,
      },
    },
  },
  {
    id: 2,
    name: "Comfort Inn",
    address: "456 Main Street, Abuja",
    distance: 1.2, // in km
    rating: 3.8,
    packages: [
      {
        id: "ci-standard",
        name: "Standard Room",
        price: "₦15,000",
        priceValue: 15000,
        description: "Cozy room with a double bed and essential amenities for a comfortable stay.",
        capacity: "1-2 guests",
        size: "20 sq.m",
        amenities: ["wifi", "tv", "ac"],
      },
      {
        id: "ci-family",
        name: "Family Room",
        price: "₦22,000",
        priceValue: 22000,
        description: "Spacious room with two double beds, ideal for families or small groups.",
        capacity: "2-4 guests",
        size: "30 sq.m",
        amenities: ["wifi", "tv", "ac", "breakfast"],
      },
    ],
    priceCategory: "standard",
    amenities: ["wifi", "breakfast", "parking"],
    images: [
      "/placeholder.svg?height=400&width=600&text=Comfort+Inn+Exterior",
      "/placeholder.svg?height=400&width=600&text=Comfort+Inn+Lobby",
      "/placeholder.svg?height=400&width=600&text=Comfort+Inn+Room",
      "/placeholder.svg?height=400&width=600&text=Comfort+Inn+Breakfast",
    ],
    phone: "+234 802 345 6789",
    whatsapp: "2348023456789",
    email: "reservations@comfortinn.com",
    description: "Comfortable and affordable accommodation with convenient access to the conference venue.",
    available: true,
    featured: false,
    mapPosition: { x: 40, y: 60 }, // position on the venue proximity map (%)
    reviews: {
      count: 86,
      average: 3.8,
      breakdown: {
        5: 30,
        4: 35,
        3: 15,
        2: 5,
        1: 1,
      },
    },
  },
  {
    id: 3,
    name: "Executive Residences",
    address: "789 Business District, Abuja",
    distance: 2.0, // in km
    rating: 4.2,
    packages: [
      {
        id: "er-business",
        name: "Business Room",
        price: "₦22,000",
        priceValue: 22000,
        description: "Modern room with workspace, high-speed internet, and business amenities.",
        capacity: "1-2 guests",
        size: "26 sq.m",
        amenities: ["wifi", "tv", "ac", "workspace", "breakfast"],
      },
      {
        id: "er-executive",
        name: "Executive Room",
        price: "₦30,000",
        priceValue: 30000,
        description: "Premium room with king bed, workspace, and access to executive lounge.",
        capacity: "2 guests",
        size: "34 sq.m",
        amenities: ["wifi", "tv", "ac", "workspace", "breakfast", "minibar"],
      },
      {
        id: "er-suite",
        name: "Business Suite",
        price: "₦45,000",
        priceValue: 45000,
        description: "Spacious suite with separate living area, workspace, and premium amenities.",
        capacity: "2-3 guests",
        size: "50 sq.m",
        amenities: ["wifi", "tv", "ac", "workspace", "breakfast", "minibar", "bathtub"],
      },
    ],
    priceCategory: "premium",
    amenities: ["wifi", "breakfast", "pool", "parking", "restaurant"],
    images: [
      "/placeholder.svg?height=400&width=600&text=Executive+Residences+Exterior",
      "/placeholder.svg?height=400&width=600&text=Executive+Residences+Lobby",
      "/placeholder.svg?height=400&width=600&text=Executive+Residences+Room",
      "/placeholder.svg?height=400&width=600&text=Executive+Residences+Workspace",
      "/placeholder.svg?height=400&width=600&text=Executive+Residences+Restaurant",
    ],
    phone: "+234 803 456 7890",
    whatsapp: "2348034567890",
    email: "stay@executiveresidences.com",
    description: "Business-class accommodations with premium amenities and dedicated workspace in each room.",
    available: true,
    featured: true,
    mapPosition: { x: 25, y: 30 }, // position on the venue proximity map (%)
    reviews: {
      count: 102,
      average: 4.2,
      breakdown: {
        5: 50,
        4: 30,
        3: 15,
        2: 5,
        1: 2,
      },
    },
  },
  {
    id: 4,
    name: "Budget Stay Hotel",
    address: "101 Economy Road, Abuja",
    distance: 3.5, // in km
    rating: 3.2,
    packages: [
      {
        id: "bs-single",
        name: "Single Room",
        price: "₦8,000",
        priceValue: 8000,
        description: "Basic room with a single bed and essential amenities for budget travelers.",
        capacity: "1 guest",
        size: "16 sq.m",
        amenities: ["wifi", "tv", "fan"],
      },
      {
        id: "bs-double",
        name: "Double Room",
        price: "₦12,000",
        priceValue: 12000,
        description: "Simple room with a double bed suitable for couples or pairs.",
        capacity: "2 guests",
        size: "20 sq.m",
        amenities: ["wifi", "tv", "ac"],
      },
    ],
    priceCategory: "economy",
    amenities: ["wifi", "parking"],
    images: [
      "/placeholder.svg?height=400&width=600&text=Budget+Stay+Exterior",
      "/placeholder.svg?height=400&width=600&text=Budget+Stay+Room",
      "/placeholder.svg?height=400&width=600&text=Budget+Stay+Reception",
    ],
    phone: "+234 804 567 8901",
    whatsapp: "2348045678901",
    email: "info@budgetstay.com",
    description: "Economical lodging option with basic amenities and shuttle service to the conference venue.",
    available: true,
    featured: false,
    mapPosition: { x: 80, y: 75 }, // position on the venue proximity map (%)
    reviews: {
      count: 64,
      average: 3.2,
      breakdown: {
        5: 10,
        4: 20,
        3: 25,
        2: 7,
        1: 2,
      },
    },
  },
  {
    id: 5,
    name: "Grand Plaza Hotel",
    address: "222 Luxury Boulevard, Abuja",
    distance: 1.8, // in km
    rating: 4.7,
    packages: [
      {
        id: "gp-deluxe",
        name: "Deluxe Room",
        price: "₦30,000",
        priceValue: 30000,
        description: "Elegant room with premium furnishings, king bed, and luxury amenities.",
        capacity: "2 guests",
        size: "36 sq.m",
        amenities: ["wifi", "tv", "ac", "breakfast", "minibar"],
      },
      {
        id: "gp-premium",
        name: "Premium Suite",
        price: "₦45,000",
        priceValue: 45000,
        description: "Luxurious suite with separate bedroom, living area, and premium services.",
        capacity: "2 guests",
        size: "52 sq.m",
        amenities: ["wifi", "tv", "ac", "breakfast", "minibar", "bathtub", "workspace"],
      },
      {
        id: "gp-presidential",
        name: "Presidential Suite",
        price: "₦80,000",
        priceValue: 80000,
        description:
          "Exclusive top-floor suite with panoramic views, separate living and dining areas, and personalized service.",
        capacity: "2-4 guests",
        size: "90 sq.m",
        amenities: ["wifi", "tv", "ac", "breakfast", "minibar", "bathtub", "workspace", "dining", "butler"],
      },
    ],
    priceCategory: "premium",
    amenities: ["wifi", "breakfast", "pool", "parking", "restaurant"],
    images: [
      "/placeholder.svg?height=400&width=600&text=Grand+Plaza+Exterior",
      "/placeholder.svg?height=400&width=600&text=Grand+Plaza+Lobby",
      "/placeholder.svg?height=400&width=600&text=Grand+Plaza+Room",
      "/placeholder.svg?height=400&width=600&text=Grand+Plaza+Suite",
      "/placeholder.svg?height=400&width=600&text=Grand+Plaza+Restaurant",
      "/placeholder.svg?height=400&width=600&text=Grand+Plaza+Pool",
    ],
    phone: "+234 805 678 9012",
    whatsapp: "2348056789012",
    email: "concierge@grandplaza.com",
    description: "Five-star luxury hotel with exceptional amenities, fine dining, and premium conference facilities.",
    available: true,
    featured: true,
    mapPosition: { x: 55, y: 20 }, // position on the venue proximity map (%)
    reviews: {
      count: 156,
      average: 4.7,
      breakdown: {
        5: 110,
        4: 35,
        3: 8,
        2: 2,
        1: 1,
      },
    },
  },
]

// Sample booking data
const myBookings = [
  {
    id: 1,
    hotelName: "Green Suites Hotel",
    hotelImage: "/placeholder.svg?height=200&width=300&text=Green+Suites+Room",
    roomType: "Standard Room",
    checkIn: "2025-05-14",
    checkOut: "2025-05-18",
    status: "confirmed",
    requestDate: "2025-01-15",
    specialRequests: "Non-smoking room preferred",
    price: "₦25,000",
    totalNights: 4,
    totalAmount: "₦100,000",
    phone: "+234 801 234 5678",
    whatsapp: "2348012345678",
  },
]

// Helper function to render amenity icon
const renderAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case "wifi":
      return <Wifi className="h-4 w-4 text-napps-green" title="WiFi" />
    case "breakfast":
      return <Coffee className="h-4 w-4 text-napps-green" title="Breakfast Included" />
    case "pool":
      return <Droplets className="h-4 w-4 text-napps-green" title="Swimming Pool" />
    case "parking":
      return <Car className="h-4 w-4 text-napps-green" title="Free Parking" />
    case "restaurant":
      return <UtensilsCrossed className="h-4 w-4 text-napps-green" title="Restaurant" />
    case "tv":
      return <Tv className="h-4 w-4 text-napps-green" title="TV" />
    case "ac":
      return <Snowflake className="h-4 w-4 text-napps-green" title="Air Conditioning" />
    case "minibar":
      return <Coffee className="h-4 w-4 text-napps-green" title="Mini Bar" />
    case "workspace":
      return <Maximize className="h-4 w-4 text-napps-green" title="Workspace" />
    case "bathtub":
      return <ShowerHead className="h-4 w-4 text-napps-green" title="Bathtub" />
    default:
      return null
  }
}

// Types
type SortOption = "recommended" | "price-low" | "price-high" | "rating" | "distance"
type FilteredAmenity = "wifi" | "breakfast" | "pool" | "parking" | "restaurant" | "ac"

export default function ParticipantAccommodation() {
  // State
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [maxDistance, setMaxDistance] = useState(5) // in km
  const [sortBy, setSortBy] = useState<SortOption>("recommended")
  const [filteredAmenities, setFilteredAmenities] = useState<FilteredAmenity[]>([])
  const [selectedHotel, setSelectedHotel] = useState<any>(null)
  const [selectedPackage, setSelectedPackage] = useState<any>(null)
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: "",
    checkOut: "",
    specialRequests: "",
    contactNumber: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)
  const [isHotelDetailsOpen, setIsHotelDetailsOpen] = useState(false)
  const [isProximityMapOpen, setIsProximityMapOpen] = useState(false)
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
  const [favoriteHotels, setFavoriteHotels] = useState<number[]>([])
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [isMobile, setIsMobile] = useState(false)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // This will only run on the client side
    setIsMobile(window.matchMedia("(max-width: 768px)").matches)
  }, [])

  // Filter and sort hotels
  const processHotels = useCallback(() => {
    if (error) return []

    // Filter hotels
    const processed = hotels.filter((hotel) => {
      const matchesSearch =
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.address.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = filterCategory === "all" || hotel.priceCategory === filterCategory
      const matchesDistance = hotel.distance <= maxDistance
      const matchesAmenities =
        filteredAmenities.length === 0 || filteredAmenities.every((amenity) => hotel.amenities.includes(amenity))
      return matchesSearch && matchesCategory && matchesDistance && matchesAmenities && hotel.available
    })

    // Sort hotels
    switch (sortBy) {
      case "price-low":
        return processed.sort((a, b) => {
          const aPrice = Math.min(...a.packages.map((p) => p.priceValue))
          const bPrice = Math.min(...b.packages.map((p) => p.priceValue))
          return aPrice - bPrice
        })
      case "price-high":
        return processed.sort((a, b) => {
          const aPrice = Math.max(...a.packages.map((p) => p.priceValue))
          const bPrice = Math.max(...b.packages.map((p) => p.priceValue))
          return bPrice - aPrice
        })
      case "rating":
        return processed.sort((a, b) => b.rating - a.rating)
      case "distance":
        return processed.sort((a, b) => a.distance - b.distance)
      case "recommended":
      default:
        // Sort by a combination of rating, distance and featured status
        return processed.sort((a, b) => {
          // Featured hotels come first
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1

          // Then by a score combining rating and inverse distance
          const aScore = a.rating * 2 - a.distance
          const bScore = b.rating * 2 - b.distance
          return bScore - aScore
        })
    }
  }, [searchTerm, filterCategory, maxDistance, sortBy, filteredAmenities, error])

  const filteredHotels = processHotels()

  // Calculate number of nights between check-in and check-out
  const calculateNights = () => {
    if (!bookingDetails.checkIn || !bookingDetails.checkOut) return 0
    const checkIn = new Date(bookingDetails.checkIn)
    const checkOut = new Date(bookingDetails.checkOut)
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!selectedPackage) return "₦0"
    const nights = calculateNights()
    return `₦${(selectedPackage.priceValue * nights).toLocaleString()}`
  }

  // Format WhatsApp message
  const formatWhatsAppMessage = () => {
    const nights = calculateNights()
    const totalPrice = calculateTotalPrice()

    return encodeURIComponent(
      `Hello, I would like to book a room at ${selectedHotel?.name} for the NAPPS Conference 2025.\n\n` +
        `Room Type: ${selectedPackage?.name}\n` +
        `Check-in: ${bookingDetails.checkIn}\n` +
        `Check-out: ${bookingDetails.checkOut}\n` +
        `Number of nights: ${nights}\n` +
        `Total price: ${totalPrice}\n` +
        `Special requests: ${bookingDetails.specialRequests || "None"}\n\n` +
        `My contact number is: ${bookingDetails.contactNumber}\n\n` +
        `Please confirm my booking. Thank you!`,
    )
  }

  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!bookingDetails.checkIn) {
      errors.checkIn = "Check-in date is required"
    }

    if (!bookingDetails.checkOut) {
      errors.checkOut = "Check-out date is required"
    } else if (bookingDetails.checkIn && new Date(bookingDetails.checkOut) <= new Date(bookingDetails.checkIn)) {
      errors.checkOut = "Check-out date must be after check-in date"
    }

    if (!bookingDetails.contactNumber) {
      errors.contactNumber = "Contact number is required"
    } else if (!/^\d{10,15}$/.test(bookingDetails.contactNumber.replace(/\D/g, ""))) {
      errors.contactNumber = "Please enter a valid phone number"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle WhatsApp booking request
  const handleWhatsAppBooking = async () => {
    if (!validateForm()) {
      toast({
        title: "Form Validation Error",
        description: "Please correct the errors in the form",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const whatsappUrl = `https://wa.me/${selectedHotel.whatsapp}?text=${formatWhatsAppMessage()}`

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank")

      // Close the dialog and show success message
      setIsBookingDialogOpen(false)
      toast({
        title: "Booking Request Sent",
        description:
          "Your booking request has been sent via WhatsApp. The hotel will confirm your reservation shortly.",
        duration: 5000,
      })
    } catch (error) {
      toast({
        title: "Error Sending Booking Request",
        description: "There was a problem sending your booking request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Open booking dialog with selected package
  const openBookingDialog = (hotel: any, packageOption: any) => {
    setSelectedHotel(hotel)
    setSelectedPackage(packageOption)
    setBookingDetails({
      checkIn: "",
      checkOut: "",
      specialRequests: "",
      contactNumber: "",
    })
    setFormErrors({})
    setIsBookingDialogOpen(true)
  }

  // Toggle favorite hotel
  const toggleFavorite = (hotelId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavoriteHotels((prev) => (prev.includes(hotelId) ? prev.filter((id) => id !== hotelId) : [...prev, hotelId]))

    toast({
      title: favoriteHotels.includes(hotelId) ? "Removed from favorites" : "Added to favorites",
      description: favoriteHotels.includes(hotelId)
        ? "Hotel has been removed from your favorites"
        : "Hotel has been added to your favorites",
      duration: 2000,
    })
  }

  // Share hotel
  const shareHotel = (hotel: any, e: React.MouseEvent) => {
    e.stopPropagation()

    if (navigator.share) {
      navigator
        .share({
          title: `${hotel.name} - NAPPS Conference Accommodation`,
          text: `Check out ${hotel.name} for the NAPPS Conference 2025. ${hotel.description}`,
          url: window.location.href,
        })
        .then(() => {
          toast({
            title: "Shared successfully",
            description: "Hotel information has been shared",
            duration: 2000,
          })
        })
        .catch((error) => {
          toast({
            title: "Error sharing",
            description: "There was a problem sharing the hotel information",
            variant: "destructive",
          })
        })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard
        .writeText(`${hotel.name} - NAPPS Conference Accommodation\n${hotel.description}\n${window.location.href}`)
        .then(() => {
          toast({
            title: "Copied to clipboard",
            description: "Hotel information has been copied to clipboard",
            duration: 2000,
          })
        })
    }
  }

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("")
    setFilterCategory("all")
    setMaxDistance(5)
    setSortBy("recommended")
    setFilteredAmenities([])
    setIsFilterDialogOpen(false)
  }

  // Render hotel card skeleton
  const renderHotelCardSkeleton = () => (
    <Card className="border-napps-green/20 dark:border-napps-green/30 overflow-hidden">
      <Skeleton className="h-40 w-full" />
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mb-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex items-center mt-2">
          <Skeleton className="h-6 w-24 rounded-full mr-2" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-28" />
      </CardFooter>
    </Card>
  )

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr]">
      <DashboardSidebar role="participant" />
      <div className="flex flex-col">
        <DashboardHeader role="participant" title="Accommodation" />
        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 rounded-lg border bg-card p-6 shadow-sm relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-napps-green/20 via-napps-green to-napps-green/20"></div>
            <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-napps-green/10 opacity-50 group-hover:bg-napps-green/20 transition-colors"></div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Conference Accommodation</h2>
                <p className="text-muted-foreground">Book your stay for the NAPPS Conference 2025</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-end">
                <Badge variant="outline" className="bg-napps-green/10 text-napps-green border-napps-green/30">
                  <Calendar className="mr-1 h-3 w-3" />
                  May 15-17, 2025
                </Badge>
                <Badge variant="outline" className="bg-napps-green/10 text-napps-green border-napps-green/30">
                  <MapPin className="mr-1 h-3 w-3" />
                  Abuja, Nigeria
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-napps-green/30 text-napps-green hover:bg-napps-green/10"
                  onClick={() => setIsProximityMapOpen(true)}
                >
                  <MapPin className="mr-1 h-3 w-3" />
                  View Venue Map
                </Button>
              </div>
            </div>
          </motion.div>

          <Tabs defaultValue="hotels" className="mb-6">
            <TabsList className="bg-napps-green/10 dark:bg-napps-green/20 p-0.5">
              <TabsTrigger value="hotels" className="data-[state=active]:bg-napps-green data-[state=active]:text-white">
                Available Hotels
              </TabsTrigger>
              <TabsTrigger
                value="bookings"
                className="data-[state=active]:bg-napps-green data-[state=active]:text-white"
              >
                My Bookings
                <Badge variant="outline" className="ml-2 bg-background text-foreground border-napps-green/30">
                  {myBookings.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hotels" className="mt-6 space-y-4">
              <Card className="border-napps-green/20 dark:border-napps-green/30">
                <CardHeader>
                  <CardTitle>Hotel Options</CardTitle>
                  <CardDescription>Select from our partner hotels for your stay during the conference</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search hotels..."
                        className="pl-8 border-napps-green/30 focus-visible:ring-napps-green"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                        <SelectTrigger className="border-napps-green/30 focus-visible:ring-napps-green w-[180px]">
                          <SortAsc className="mr-2 h-4 w-4 text-napps-green" />
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recommended">Recommended</SelectItem>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                          <SelectItem value="rating">Highest Rated</SelectItem>
                          <SelectItem value="distance">Closest to Venue</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="outline"
                        className="border-napps-green/30 text-napps-green hover:bg-napps-green/10"
                        onClick={() => setIsFilterDialogOpen(true)}
                      >
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                        {(filterCategory !== "all" || maxDistance < 5 || filteredAmenities.length > 0) && (
                          <Badge className="ml-2 bg-napps-green text-white">
                            {filterCategory !== "all" && filteredAmenities.length > 0 ? "2+" : "1"}
                          </Badge>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <Label>Maximum Distance from Venue: {maxDistance} km</Label>
                      <span className="text-sm text-muted-foreground">
                        {isLoading ? "Loading..." : `${filteredHotels.length} hotels found`}
                      </span>
                    </div>
                    <Slider
                      defaultValue={[maxDistance]}
                      max={5}
                      step={0.5}
                      onValueChange={(value) => setMaxDistance(value[0])}
                      className="w-full"
                      disabled={isLoading}
                    />
                  </div>

                  {error ? (
                    <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 text-center">
                      <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-1">Error Loading Hotels</h3>
                      <p className="text-red-700 dark:text-red-400">{error}</p>
                      <Button
                        variant="outline"
                        className="mt-4 border-red-300 text-red-700 hover:bg-red-50"
                        onClick={() => setError(null)}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Try Again
                      </Button>
                    </div>
                  ) : (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isLoading ? "loading" : "content"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {isLoading ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array.from({ length: 6 }).map((_, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                              >
                                {renderHotelCardSkeleton()}
                              </motion.div>
                            ))}
                          </div>
                        ) : filteredHotels.length === 0 ? (
                          <div className="text-center py-12">
                            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">No Hotels Found</h3>
                            <p className="text-muted-foreground mb-4">
                              No hotels match your current filters. Try adjusting your search criteria.
                            </p>
                            <Button className="bg-napps-green hover:bg-napps-green/90" onClick={resetFilters}>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Reset Filters
                            </Button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredHotels.map((hotel, index) => (
                              <motion.div
                                key={hotel.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="h-full"
                              >
                                <Card
                                  className="border-napps-green/20 dark:border-napps-green/30 hover:border-napps-green/50 transition-colors overflow-hidden relative group h-full flex flex-col"
                                  onClick={() => {
                                    setSelectedHotel(hotel)
                                    setIsHotelDetailsOpen(true)
                                  }}
                                >
                                  {hotel.featured && (
                                    <div className="absolute top-2 right-2 z-10">
                                      <Badge className="bg-napps-green text-white">
                                        <Sparkles className="h-3 w-3 mr-1 fill-current" />
                                        Featured
                                      </Badge>
                                    </div>
                                  )}
                                  <div className="absolute top-2 left-2 z-10 flex gap-1">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white"
                                      onClick={(e) => toggleFavorite(hotel.id, e)}
                                    >
                                      <Heart
                                        className={`h-4 w-4 ${favoriteHotels.includes(hotel.id) ? "fill-red-500 text-red-500" : ""}`}
                                      />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white"
                                      onClick={(e) => shareHotel(hotel, e)}
                                    >
                                      <Share2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <div className="relative h-40 w-full">
                                    <img
                                      src={hotel.images[0] || "/placeholder.svg"}
                                      alt={hotel.name}
                                      className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-300"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                      <div className="flex items-center">
                                        <Badge
                                          className={`
                                          ${
                                            hotel.priceCategory === "economy"
                                              ? "bg-blue-500"
                                              : hotel.priceCategory === "standard"
                                                ? "bg-purple-500"
                                                : "bg-amber-500"
                                          } 
                                          text-white
                                        `}
                                        >
                                          From {hotel.packages[0].price}/night
                                        </Badge>
                                        <div className="ml-auto flex items-center text-white">
                                          <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400 mr-1" />
                                          <span className="text-sm">{hotel.rating}</span>
                                          <span className="text-xs ml-1">({hotel.reviews.count})</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">{hotel.name}</CardTitle>
                                    <CardDescription className="flex items-center">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      {hotel.address}
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent className="pb-2 flex-1">
                                    <div className="flex flex-wrap gap-2 mb-2">
                                      {hotel.amenities.slice(0, 4).map((amenity) => (
                                        <TooltipProvider key={amenity}>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <div className="flex items-center gap-1 text-xs bg-napps-green/10 text-napps-green px-2 py-1 rounded-full">
                                                {renderAmenityIcon(amenity)}
                                                <span className="capitalize">{amenity}</span>
                                              </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      ))}
                                      {hotel.amenities.length > 4 && (
                                        <div className="flex items-center gap-1 text-xs bg-napps-green/10 text-napps-green px-2 py-1 rounded-full">
                                          +{hotel.amenities.length - 4} more
                                        </div>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{hotel.description}</p>
                                    <div className="flex items-center mt-2">
                                      <Badge
                                        variant="outline"
                                        className="bg-napps-green/10 text-napps-green border-napps-green/30"
                                      >
                                        <Ruler className="mr-1 h-3 w-3" />
                                        {hotel.distance} km from venue
                                      </Badge>
                                      <Badge
                                        variant="outline"
                                        className="ml-2 bg-napps-green/10 text-napps-green border-napps-green/30"
                                      >
                                        <BedDouble className="mr-1 h-3 w-3" />
                                        {hotel.packages.length} room types
                                      </Badge>
                                    </div>
                                  </CardContent>
                                  <CardFooter className="flex justify-between">
                                    <Button
                                      variant="outline"
                                      className="border-napps-green/30 text-napps-green hover:bg-napps-green/10"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedHotel(hotel)
                                        setIsHotelDetailsOpen(true)
                                      }}
                                    >
                                      <Info className="mr-2 h-4 w-4" />
                                      View Details
                                    </Button>
                                    <Button
                                      className="bg-napps-green hover:bg-napps-green/90"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedHotel(hotel)
                                        setSelectedPackage(hotel.packages[0])
                                        setIsHotelDetailsOpen(true)
                                      }}
                                    >
                                      <BedDouble className="mr-2 h-4 w-4" />
                                      Book Now
                                    </Button>
                                  </CardFooter>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings" className="mt-6 space-y-4">
              <Card className="border-napps-green/20 dark:border-napps-green/30">
                <CardHeader>
                  <CardTitle>My Bookings</CardTitle>
                  <CardDescription>View and manage your hotel reservations</CardDescription>
                </CardHeader>
                <CardContent>
                  {myBookings.length > 0 ? (
                    <div className="space-y-4">
                      {myBookings.map((booking) => (
                        <motion.div
                          key={booking.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="border-napps-green/20 dark:border-napps-green/30 overflow-hidden">
                            <div className="md:flex">
                              <div className="md:w-1/3">
                                <img
                                  src={booking.hotelImage || "/placeholder.svg"}
                                  alt={booking.hotelName}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="md:w-2/3">
                                <CardHeader>
                                  <div className="flex justify-between items-center">
                                    <CardTitle>{booking.hotelName}</CardTitle>
                                    <Badge
                                      variant="outline"
                                      className={
                                        booking.status === "confirmed"
                                          ? "bg-green-500/10 text-green-500 border-green-500/30"
                                          : booking.status === "pending"
                                            ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
                                            : "bg-red-500/10 text-red-500 border-red-500/30"
                                      }
                                    >
                                      {booking.status === "confirmed" ? (
                                        <CheckCircle className="mr-1 h-3 w-3" />
                                      ) : booking.status === "pending" ? (
                                        <Clock className="mr-1 h-3 w-3" />
                                      ) : (
                                        <XCircle className="mr-1 h-3 w-3" />
                                      )}
                                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </Badge>
                                  </div>
                                  <CardDescription>
                                    Booked on {new Date(booking.requestDate).toLocaleDateString()}
                                  </CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm font-medium">Room Type</p>
                                      <p className="text-sm">{booking.roomType}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">Price per Night</p>
                                      <p className="text-sm">{booking.price}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">Check-in</p>
                                      <p className="text-sm">{new Date(booking.checkIn).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">Check-out</p>
                                      <p className="text-sm">{new Date(booking.checkOut).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">Total Nights</p>
                                      <p className="text-sm">{booking.totalNights} nights</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">Total Amount</p>
                                      <p className="text-sm">{booking.totalAmount}</p>
                                    </div>
                                  </div>
                                  {booking.specialRequests && (
                                    <div className="mt-4">
                                      <p className="text-sm font-medium">Special Requests</p>
                                      <p className="text-sm text-muted-foreground">{booking.specialRequests}</p>
                                    </div>
                                  )}
                                </CardContent>
                                <CardFooter className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    className="border-napps-green/30 text-napps-green hover:bg-napps-green/10"
                                    onClick={() => {
                                      window.open(`tel:${booking.phone}`)
                                    }}
                                  >
                                    <Phone className="mr-2 h-4 w-4" />
                                    Call Hotel
                                  </Button>
                                  <Button
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => {
                                      const whatsappUrl = `https://wa.me/${booking.whatsapp}`
                                      window.open(whatsappUrl, "_blank")
                                    }}
                                  >
                                    <WhatsApp className="mr-2 h-4 w-4" />
                                    WhatsApp
                                  </Button>
                                </CardFooter>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-center py-12"
                    >
                      <BedDouble className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Bookings Yet</h3>
                      <p className="text-muted-foreground mb-4">
                        You haven't made any hotel reservations for the conference yet.
                      </p>
                      <Button
                        className="bg-napps-green hover:bg-napps-green/90"
                        onClick={() => document.querySelector('[data-state="inactive"][value="hotels"]')?.click()}
                      >
                        <BedDouble className="mr-2 h-4 w-4" />
                        Browse Hotels
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Hotel Details Dialog */}
          <Dialog open={isHotelDetailsOpen} onOpenChange={setIsHotelDetailsOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{selectedHotel?.name}</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    {selectedHotel?.address}
                    <Badge variant="outline" className="ml-2 bg-napps-green/10 text-napps-green border-napps-green/30">
                      <Ruler className="mr-1 h-3 w-3" />
                      {selectedHotel?.distance} km from venue
                    </Badge>
                  </div>
                </DialogDescription>
              </DialogHeader>

              {selectedHotel && (
                <div className="space-y-6">
                  {/* Hotel Images Carousel */}
                  <Carousel className="w-full">
                    <CarouselContent>
                      {selectedHotel.images.map((image: string, index: number) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <div className="overflow-hidden rounded-lg">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`${selectedHotel.name} - Image ${index + 1}`}
                                className="h-[300px] w-full object-cover"
                              />
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>

                  {/* Hotel Description */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">About the Hotel</h3>
                    <p className="text-muted-foreground">{selectedHotel.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedHotel.amenities.map((amenity: string) => (
                        <TooltipProvider key={amenity}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1 text-xs bg-napps-green/10 text-napps-green px-2 py-1 rounded-full">
                                {renderAmenityIcon(amenity)}
                                <span className="capitalize">{amenity}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </div>

                  {/* Reviews Summary */}
                  <div className="p-4 bg-napps-green/5 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Guest Reviews</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 stroke-yellow-400" />
                        <span className="text-xl font-bold ml-1">{selectedHotel.reviews.average}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Based on {selectedHotel.reviews.count} reviews
                      </span>
                    </div>
                    <div className="space-y-1">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-2">
                          <div className="w-12 text-sm">{rating} stars</div>
                          <Progress
                            value={(selectedHotel.reviews.breakdown[rating] / selectedHotel.reviews.count) * 100}
                            className="h-2 flex-1"
                            indicatorClassName={`${rating >= 4 ? "bg-green-500" : rating === 3 ? "bg-yellow-500" : "bg-red-500"}`}
                          />
                          <div className="w-8 text-sm text-right">{selectedHotel.reviews.breakdown[rating]}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Room Packages */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Available Room Packages</h3>
                    <div className="space-y-4">
                      {selectedHotel.packages.map((pkg: any) => (
                        <Card key={pkg.id} className="border-napps-green/20 dark:border-napps-green/30">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-base">{pkg.name}</CardTitle>
                              <Badge
                                className={`
                                ${
                                  selectedHotel.priceCategory === "economy"
                                    ? "bg-blue-500"
                                    : selectedHotel.priceCategory === "standard"
                                      ? "bg-purple-500"
                                      : "bg-amber-500"
                                } 
                                text-white
                              `}
                              >
                                {pkg.price} per night
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm text-muted-foreground mb-2">{pkg.description}</p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4 text-napps-green" />
                                <span>{pkg.capacity}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Maximize className="h-4 w-4 text-napps-green" />
                                <span>{pkg.size}</span>
                              </div>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {pkg.amenities.map((amenity: string) => (
                                <div key={amenity} className="flex items-center gap-1 text-xs">
                                  {renderAmenityIcon(amenity)}
                                </div>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button
                              className="w-full bg-napps-green hover:bg-napps-green/90"
                              onClick={() => {
                                setIsHotelDetailsOpen(false)
                                openBookingDialog(selectedHotel, pkg)
                              }}
                            >
                              <BedDouble className="mr-2 h-4 w-4" />
                              Book This Room
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-napps-green/30 text-napps-green hover:bg-napps-green/10"
                  onClick={() => {
                    window.open(`tel:${selectedHotel?.phone}`)
                  }}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Hotel
                </Button>
                <Button variant="outline" onClick={() => setIsHotelDetailsOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Booking Dialog */}
          <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Book Your Stay</DialogTitle>
                <DialogDescription>
                  {selectedHotel?.name} - {selectedPackage?.name} ({selectedPackage?.price} per night)
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="checkIn">
                    Check-in Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="checkIn"
                    type="date"
                    min="2025-05-13"
                    max="2025-05-17"
                    value={bookingDetails.checkIn}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, checkIn: e.target.value })}
                    className={`border-napps-green/30 focus-visible:ring-napps-green ${formErrors.checkIn ? "border-red-500" : ""}`}
                    required
                    aria-invalid={!!formErrors.checkIn}
                    aria-describedby={formErrors.checkIn ? "checkIn-error" : undefined}
                  />
                  {formErrors.checkIn && (
                    <p id="checkIn-error" className="text-sm text-red-500 mt-1">
                      {formErrors.checkIn}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkOut">
                    Check-out Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="checkOut"
                    type="date"
                    min={bookingDetails.checkIn || "2025-05-14"}
                    max="2025-05-19"
                    value={bookingDetails.checkOut}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, checkOut: e.target.value })}
                    className={`border-napps-green/30 focus-visible:ring-napps-green ${formErrors.checkOut ? "border-red-500" : ""}`}
                    required
                    aria-invalid={!!formErrors.checkOut}
                    aria-describedby={formErrors.checkOut ? "checkOut-error" : undefined}
                  />
                  {formErrors.checkOut && (
                    <p id="checkOut-error" className="text-sm text-red-500 mt-1">
                      {formErrors.checkOut}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">
                    Your Contact Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    placeholder="e.g. 08012345678"
                    value={bookingDetails.contactNumber}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, contactNumber: e.target.value })}
                    className={`border-napps-green/30 focus-visible:ring-napps-green ${formErrors.contactNumber ? "border-red-500" : ""}`}
                    required
                    aria-invalid={!!formErrors.contactNumber}
                    aria-describedby={formErrors.contactNumber ? "contactNumber-error" : undefined}
                  />
                  {formErrors.contactNumber && (
                    <p id="contactNumber-error" className="text-sm text-red-500 mt-1">
                      {formErrors.contactNumber}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                  <Textarea
                    id="specialRequests"
                    placeholder="Any special requirements or preferences"
                    value={bookingDetails.specialRequests}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, specialRequests: e.target.value })}
                    className="min-h-[80px] border-napps-green/30 focus-visible:ring-napps-green"
                  />
                </div>

                {bookingDetails.checkIn && bookingDetails.checkOut && (
                  <div className="rounded-md bg-napps-green/10 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Booking Summary</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Room Type:</span>
                        <span>{selectedPackage?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-in:</span>
                        <span>{new Date(bookingDetails.checkIn).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-out:</span>
                        <span>{new Date(bookingDetails.checkOut).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Number of nights:</span>
                        <span>{calculateNights()}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total price:</span>
                        <span>{calculateTotalPrice()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleWhatsAppBooking}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <WhatsApp className="mr-2 h-4 w-4" />
                      Request via WhatsApp
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Proximity Map Dialog */}
          <Dialog open={isProximityMapOpen} onOpenChange={setIsProximityMapOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Hotel Proximity to Conference Venue</DialogTitle>
                <DialogDescription>View the location of hotels relative to the conference venue</DialogDescription>
              </DialogHeader>
              <div className="relative h-[500px] w-full border rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                {/* Conference Venue Marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 rounded-full bg-napps-green/20 flex items-center justify-center animate-pulse">
                    <div className="w-12 h-12 rounded-full bg-napps-green/40 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-napps-green flex items-center justify-center text-white font-bold">
                        <Building className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap bg-napps-green text-white px-2 py-1 rounded text-xs font-medium">
                    Conference Venue
                  </div>
                </div>

                {/* Hotel Markers */}
                {hotels.map((hotel) => (
                  <TooltipProvider key={hotel.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          className="absolute cursor-pointer"
                          style={{
                            top: `${hotel.mapPosition.y}%`,
                            left: `${hotel.mapPosition.x}%`,
                          }}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setSelectedHotel(hotel)
                            setIsProximityMapOpen(false)
                            setIsHotelDetailsOpen(true)
                          }}
                        >
                          <div
                            className={`
                            w-10 h-10 rounded-full 
                            ${
                              hotel.priceCategory === "economy"
                                ? "bg-blue-500/70"
                                : hotel.priceCategory === "standard"
                                  ? "bg-purple-500/70"
                                  : "bg-amber-500/70"
                            } 
                            flex items-center justify-center text-white font-bold
                            hover:scale-110 transition-transform
                          `}
                          >
                            <BedDouble className="h-5 w-5" />
                          </div>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <div className="text-center">
                          <p className="font-medium">{hotel.name}</p>
                          <p className="text-xs">{hotel.distance} km from venue</p>
                          <div className="flex items-center justify-center mt-1">
                            <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400 mr-1" />
                            <span className="text-xs">{hotel.rating}</span>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}

                {/* Distance Scale */}
                <div className="absolute bottom-4 right-4 bg-white dark:bg-slate-700 p-2 rounded-md shadow-md">
                  <div className="text-xs font-medium mb-1">Distance Scale</div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500/70"></div>
                    <span className="text-xs">Economy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500/70"></div>
                    <span className="text-xs">Standard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-amber-500/70"></div>
                    <span className="text-xs">Premium</span>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsProximityMapOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Filter Dialog */}
          <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Filter Hotels</DialogTitle>
                <DialogDescription>Refine your search with these filters</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label>Hotel Category</Label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="border-napps-green/30 focus-visible:ring-napps-green">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Maximum Distance: {maxDistance} km</Label>
                  <Slider
                    value={[maxDistance]}
                    max={5}
                    step={0.5}
                    onValueChange={(value) => setMaxDistance(value[0])}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Amenities</Label>
                  <ScrollArea className="h-[200px] rounded-md border p-4">
                    <div className="space-y-4">
                      {["wifi", "breakfast", "pool", "parking", "restaurant", "ac"].map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox
                            id={`amenity-${amenity}`}
                            checked={filteredAmenities.includes(amenity as FilteredAmenity)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFilteredAmenities([...filteredAmenities, amenity as FilteredAmenity])
                              } else {
                                setFilteredAmenities(filteredAmenities.filter((a) => a !== amenity))
                              }
                            }}
                          />
                          <label
                            htmlFor={`amenity-${amenity}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                          >
                            {renderAmenityIcon(amenity)}
                            <span className="capitalize">{amenity}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
              <DialogFooter className="flex justify-between">
                <Button variant="outline" onClick={resetFilters}>
                  Reset Filters
                </Button>
                <Button className="bg-napps-green hover:bg-napps-green/90" onClick={() => setIsFilterDialogOpen(false)}>
                  Apply Filters
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  )
}

