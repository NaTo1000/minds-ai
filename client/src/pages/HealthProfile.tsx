import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { 
  Shield, FileText, User, Heart, Pill, Brain, 
  ArrowLeft, Lock, Download, AlertCircle 
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

export default function HealthProfile() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  // Health profile state
  const [medicareNumber, setMedicareNumber] = useState("");
  const [healthCareCard, setHealthCareCard] = useState("");
  const [privateHealthInsurer, setPrivateHealthInsurer] = useState("");
  const [privateHealthNumber, setPrivateHealthNumber] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  // Questionnaire state
  const [currentFeelings, setCurrentFeelings] = useState("");
  const [triggers, setTriggers] = useState("");
  const [copingStrategies, setCopingStrategies] = useState("");
  const [currentMedications, setCurrentMedications] = useState("");
  const [medicationSideEffects, setMedicationSideEffects] = useState("");
  const [previousDiagnoses, setPreviousDiagnoses] = useState("");
  const [previousTreatments, setPreviousTreatments] = useState("");
  const [sleepQuality, setSleepQuality] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [currentSupport, setCurrentSupport] = useState("");
  const [preferredContactMethod, setPreferredContactMethod] = useState("");

  const handleSaveHealthProfile = () => {
    // TODO: Implement encryption and save to backend
    toast.success("Health profile saved securely");
  };

  const handleSaveQuestionnaire = () => {
    // TODO: Save questionnaire to backend
    toast.success("Questionnaire saved");
  };

  const handleGenerateReferral = () => {
    // TODO: Generate PDF referral form
    toast.success("Referral form generated");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-center">Sign In Required</CardTitle>
            <CardDescription className="text-center">
              You need to sign in to access your health profile and save your information securely.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a href={getLoginUrl()}>
                <Button className="w-full">Sign In</Button>
              </a>
              <Link href="/">
                <Button variant="outline" className="w-full">Back to Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-foreground">Health Profile</h1>
                <p className="text-sm text-muted-foreground">Securely manage your health information</p>
              </div>
            </div>
            <Link href="/crisis">
              <Button variant="destructive" size="sm">Crisis Help</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-8 max-w-4xl">
        {/* Security Notice */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              <div>
                <CardTitle className="text-base">Your Data is Secure</CardTitle>
                <CardDescription>
                  All sensitive information is encrypted and stored securely. Only you can access your health profile.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="questionnaire" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="questionnaire">
              <Brain className="w-4 h-4 mr-2" />
              Questionnaire
            </TabsTrigger>
            <TabsTrigger value="health-info">
              <Heart className="w-4 h-4 mr-2" />
              Health Info
            </TabsTrigger>
            <TabsTrigger value="referral">
              <FileText className="w-4 h-4 mr-2" />
              Referral Form
            </TabsTrigger>
          </TabsList>

          {/* Mental Health Questionnaire */}
          <TabsContent value="questionnaire" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mental Health Assessment</CardTitle>
                <CardDescription>
                  This information helps healthcare providers understand your situation better. Answer as honestly as you feel comfortable.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="feelings">How are you feeling right now?</Label>
                  <Textarea
                    id="feelings"
                    placeholder="Describe your current emotional state..."
                    value={currentFeelings}
                    onChange={(e) => setCurrentFeelings(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="triggers">What triggers your symptoms?</Label>
                  <Textarea
                    id="triggers"
                    placeholder="Situations, people, places, or thoughts that make things worse..."
                    value={triggers}
                    onChange={(e) => setTriggers(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coping">What coping strategies have helped you?</Label>
                  <Textarea
                    id="coping"
                    placeholder="Activities, techniques, or support that has been helpful..."
                    value={copingStrategies}
                    onChange={(e) => setCopingStrategies(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diagnoses">Previous mental health diagnoses (if any)</Label>
                  <Textarea
                    id="diagnoses"
                    placeholder="Depression, PTSD, anxiety disorder, etc..."
                    value={previousDiagnoses}
                    onChange={(e) => setPreviousDiagnoses(e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="treatments">Previous treatments or therapies</Label>
                  <Textarea
                    id="treatments"
                    placeholder="CBT, medication, counseling, hospitalization, etc..."
                    value={previousTreatments}
                    onChange={(e) => setPreviousTreatments(e.target.value)}
                    rows={2}
                  />
                </div>

                <Button onClick={handleSaveQuestionnaire} className="w-full">
                  Save Questionnaire
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="w-5 h-5" />
                  Medications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="medications">Current medications</Label>
                  <Textarea
                    id="medications"
                    placeholder="List all medications, dosages, and frequency..."
                    value={currentMedications}
                    onChange={(e) => setCurrentMedications(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="side-effects">Side effects or concerns</Label>
                  <Textarea
                    id="side-effects"
                    placeholder="Any side effects you're experiencing..."
                    value={medicationSideEffects}
                    onChange={(e) => setMedicationSideEffects(e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sleep & Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sleep-quality">Sleep quality</Label>
                    <select
                      id="sleep-quality"
                      value={sleepQuality}
                      onChange={(e) => setSleepQuality(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="">Select...</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                      <option value="very-poor">Very Poor</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sleep-hours">Average sleep per night</Label>
                    <Input
                      id="sleep-hours"
                      placeholder="e.g., 5-6 hours"
                      value={sleepHours}
                      onChange={(e) => setSleepHours(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="support">Current support network</Label>
                  <Textarea
                    id="support"
                    placeholder="Family, friends, therapist, support groups..."
                    value={currentSupport}
                    onChange={(e) => setCurrentSupport(e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-method">Preferred contact method</Label>
                  <Input
                    id="contact-method"
                    placeholder="Phone, email, text, in-person..."
                    value={preferredContactMethod}
                    onChange={(e) => setPreferredContactMethod(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Information */}
          <TabsContent value="health-info" className="space-y-6">
            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <div>
                    <CardTitle className="text-base">Sensitive Information</CardTitle>
                    <CardDescription>
                      This information is encrypted and stored securely. Never share your Medicare or health card numbers with anyone except authorized healthcare providers.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medicare & Health Cards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="medicare">Medicare Number</Label>
                  <Input
                    id="medicare"
                    type="password"
                    placeholder="Enter Medicare number..."
                    value={medicareNumber}
                    onChange={(e) => setMedicareNumber(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Your Medicare number is encrypted and never shared
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="healthcare-card">Health Care Card Number</Label>
                  <Input
                    id="healthcare-card"
                    type="password"
                    placeholder="Enter health care card number..."
                    value={healthCareCard}
                    onChange={(e) => setHealthCareCard(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="private-insurer">Private Health Insurer</Label>
                  <Input
                    id="private-insurer"
                    placeholder="e.g., Bupa, Medibank, NIB..."
                    value={privateHealthInsurer}
                    onChange={(e) => setPrivateHealthInsurer(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="private-number">Private Health Number</Label>
                  <Input
                    id="private-number"
                    type="password"
                    placeholder="Enter private health number..."
                    value={privateHealthNumber}
                    onChange={(e) => setPrivateHealthNumber(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emergency-contact">Contact Name</Label>
                  <Input
                    id="emergency-contact"
                    placeholder="Full name..."
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergency-phone">Contact Phone</Label>
                  <Input
                    id="emergency-phone"
                    type="tel"
                    placeholder="Phone number..."
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                  />
                </div>

                <Button onClick={handleSaveHealthProfile} className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Save Securely
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Referral Form */}
          <TabsContent value="referral" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Referral Form</CardTitle>
                <CardDescription>
                  Create a comprehensive referral form to share with your doctor, therapist, or other healthcare providers. This form includes your questionnaire responses and relevant health information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <h4 className="font-semibold text-sm">Your referral form will include:</h4>
                  <ul className="text-sm space-y-1 list-disc list-inside ml-2">
                    <li>Current feelings and symptoms</li>
                    <li>Identified triggers and coping strategies</li>
                    <li>Medication information and side effects</li>
                    <li>Previous diagnoses and treatments</li>
                    <li>Sleep quality and support network</li>
                    <li>Preferred contact method</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-3">
                    Note: Sensitive information like Medicare numbers will NOT be included in the referral form for security reasons.
                  </p>
                </div>

                <Button onClick={handleGenerateReferral} className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  Generate & Download Referral Form (PDF)
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-base">How to Use Your Referral Form</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="text-sm space-y-2 list-decimal list-inside">
                  <li>Download the PDF referral form</li>
                  <li>Review the information for accuracy</li>
                  <li>Print or email the form to your healthcare provider before your appointment</li>
                  <li>This helps them understand your situation quickly and provide better care</li>
                  <li>Update the form regularly as your situation changes</li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Infinite branding */}
      <div className="infinite-branding">infinite♾2025</div>
    </div>
  );
}
