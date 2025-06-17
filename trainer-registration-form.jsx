"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, User, Phone, Award, BookOpen, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useTrainer } from "../hooks/useTrainer"

const specialties = [
  { value: "cardio", label: "Cardio" },
  { value: "pesi", label: "Pesi" },
  { value: "yoga", label: "Yoga" },
  { value: "pilates", label: "Pilates" },
  { value: "crossfit", label: "CrossFit" },
  { value: "nuoto", label: "Nuoto" },
  { value: "boxe", label: "Boxe" },
  { value: "danza", label: "Danza" },
  { value: "functional", label: "Allenamento Funzionale" },
  { value: "riabilitazione", label: "Riabilitazione" },
]

export default function TrainerRegistrationForm() {
  const { createTrainer } = useTrainer()

  const [formData, setFormData] = useState({
    phone: "",
    birth_date: "",
    specialty: "",
    bio: "",
    certifications: "",
    years_experience: 0,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "years_experience" ? Number.parseInt(value) || 0 : value,
    }))

    // Rimuovi l'errore quando l'utente inizia a digitare
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      specialty: value,
    }))

    if (errors.specialty) {
      setErrors((prev) => ({
        ...prev,
        specialty: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Validazione telefono (se fornito)
    if (formData.phone && !/^[+]?[0-9\s\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Inserisci un numero di telefono valido"
    }

    // Validazione anni di esperienza
    if (formData.years_experience < 0) {
      newErrors.years_experience = "Gli anni di esperienza non possono essere negativi"
    }

    // Validazione data di nascita (se fornita)
    if (formData.birth_date) {
      const birthDate = new Date(formData.birth_date)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()

      if (age < 16 || age > 80) {
        newErrors.birth_date = "Età deve essere compresa tra 16 e 80 anni"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      // Prepara i dati da inviare (rimuovi campi vuoti)
      const dataToSend = {
        ...formData,
        phone: formData.phone || undefined,
        birth_date: formData.birth_date || undefined,
        specialty: formData.specialty || undefined,
        bio: formData.bio || undefined,
        certifications: formData.certifications || undefined,
      }

      // Rimuovi campi undefined
      Object.keys(dataToSend).forEach((key) => {
        if (dataToSend[key] === undefined) {
          delete dataToSend[key]
        }
      })

      console.log("Invio dati trainer:", dataToSend)

      // Chiamata API usando il hook
      const response = await createTrainer(dataToSend)

      if (response.success) {
        setSubmitSuccess(true)
        setSubmitMessage("Registrazione trainer completata con successo!")

        // Reset del form dopo successo
        setFormData({
          phone: "",
          birth_date: "",
          specialty: "",
          bio: "",
          certifications: "",
          years_experience: 0,
        })

        console.log("Trainer creato:", response.data)
      } else {
        // Gestisci errori di validazione dal backend
        if (response.errors) {
          const backendErrors = {}
          Object.entries(response.errors).forEach(([field, messages]) => {
            backendErrors[field] = Array.isArray(messages) ? messages[0] : messages
          })
          setErrors(backendErrors)
        }

        setSubmitSuccess(false)
        setSubmitMessage(response.message || "Errore durante la registrazione")
      }
    } catch (error) {
      setSubmitSuccess(false)
      setSubmitMessage("Errore di connessione. Riprova più tardi.")
      console.error("Errore registrazione trainer:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    (<div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div
              className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Registrazione Trainer</CardTitle>
            <CardDescription>Completa il tuo profilo per diventare un trainer certificato</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Telefono */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Telefono
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+39 123 456 7890"
                  className="transition-all focus:ring-2 focus:ring-blue-500" />
                {errors.phone && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Data di nascita */}
              <div className="space-y-2">
                <Label htmlFor="birth_date" className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  Data di nascita
                </Label>
                <Input
                  id="birth_date"
                  name="birth_date"
                  type="date"
                  value={formData.birth_date}
                  onChange={handleInputChange}
                  className="transition-all focus:ring-2 focus:ring-blue-500" />
                {errors.birth_date && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    {errors.birth_date}
                  </p>
                )}
              </div>

              {/* Specialità */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Specialità
                </Label>
                <Select value={formData.specialty} onValueChange={handleSelectChange}>
                  <SelectTrigger className="transition-all focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Seleziona la tua specialità" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty.value} value={specialty.value}>
                        {specialty.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.specialty && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    {errors.specialty}
                  </p>
                )}
              </div>

              {/* Anni di esperienza */}
              <div className="space-y-2">
                <Label htmlFor="years_experience" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Anni di esperienza
                </Label>
                <Input
                  id="years_experience"
                  name="years_experience"
                  type="number"
                  min="0"
                  max="50"
                  value={formData.years_experience}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="transition-all focus:ring-2 focus:ring-blue-500" />
                {errors.years_experience && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    {errors.years_experience}
                  </p>
                )}
              </div>

              {/* Certificazioni */}
              <div className="space-y-2">
                <Label htmlFor="certifications" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Certificazioni
                </Label>
                <Input
                  id="certifications"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleInputChange}
                  placeholder="es: NASM-CPT, ACSM, Yoga Alliance RYT-200"
                  className="transition-all focus:ring-2 focus:ring-blue-500" />
                <p className="text-sm text-muted-foreground">Elenca le tue certificazioni separate da virgole</p>
                {errors.certifications && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    {errors.certifications}
                  </p>
                )}
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Racconta qualcosa di te, della tua esperienza e del tuo approccio all'allenamento..."
                  rows={4}
                  className="transition-all resize-none focus:ring-2 focus:ring-blue-500" />
                <p className="text-sm text-muted-foreground">Descrivi la tua esperienza e filosofia di allenamento</p>
                {errors.bio && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    {errors.bio}
                  </p>
                )}
              </div>

              {/* Messaggio di stato */}
              {submitMessage && (
                <div
                  className={`rounded-lg p-4 flex items-center gap-2 ${
                    submitSuccess
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}>
                  {submitSuccess ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  {submitMessage}
                </div>
              )}

              {/* Pulsante di submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full transition-colors bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
                    Registrazione in corso...
                  </div>
                ) : (
                  "Completa Registrazione"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>)
  );
}
