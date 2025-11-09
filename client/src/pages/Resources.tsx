import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, Scale, DollarSign, Users, MapPin, Phone, Globe, 
  ArrowLeft, Search, ExternalLink 
} from "lucide-react";
import { Link } from "wouter";

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("all");

  const states = [
    { code: "all", name: "All States" },
    { code: "NSW", name: "New South Wales" },
    { code: "VIC", name: "Victoria" },
    { code: "QLD", name: "Queensland" },
    { code: "SA", name: "South Australia" },
    { code: "WA", name: "Western Australia" },
    { code: "TAS", name: "Tasmania" },
    { code: "NT", name: "Northern Territory" },
    { code: "ACT", name: "Australian Capital Territory" },
  ];

  const workCoverServices = [
    { state: "NSW", name: "icare NSW", phone: "13 44 22", website: "https://www.icare.nsw.gov.au" },
    { state: "VIC", name: "WorkSafe Victoria", phone: "1800 136 089", website: "https://www.worksafe.vic.gov.au" },
    { state: "QLD", name: "WorkCover Queensland", phone: "1300 362 128", website: "https://www.worksafe.qld.gov.au" },
    { state: "SA", name: "ReturnToWorkSA", phone: "13 18 55", website: "https://www.rtwsa.com" },
    { state: "WA", name: "WorkCover WA", phone: "1300 794 744", website: "https://www.workcover.wa.gov.au" },
    { state: "TAS", name: "WorkSafe Tasmania", phone: "1300 366 322", website: "https://www.worksafe.tas.gov.au" },
    { state: "NT", name: "NT WorkSafe", phone: "1800 019 115", website: "https://www.worksafe.nt.gov.au" },
    { state: "ACT", name: "Comcare", phone: "1300 366 979", website: "https://www.comcare.gov.au" },
  ];

  const legalAidServices = [
    { state: "NSW", name: "Legal Aid NSW", phone: "1300 888 529", website: "https://www.legalaid.nsw.gov.au" },
    { state: "VIC", name: "Victoria Legal Aid", phone: "1300 792 387", website: "https://www.legalaid.vic.gov.au" },
    { state: "QLD", name: "Legal Aid Queensland", phone: "1300 65 11 88", website: "https://www.legalaid.qld.gov.au" },
    { state: "SA", name: "Legal Services Commission SA", phone: "1300 366 424", website: "https://www.lsc.sa.gov.au" },
    { state: "WA", name: "Legal Aid WA", phone: "1300 650 579", website: "https://www.legalaid.wa.gov.au" },
    { state: "TAS", name: "Legal Aid Tasmania", phone: "1300 366 611", website: "https://www.legalaid.tas.gov.au" },
    { state: "NT", name: "NT Legal Aid", phone: "1800 019 343", website: "https://www.legalaid.nt.gov.au" },
    { state: "ACT", name: "Legal Aid ACT", phone: "(02) 6243 3411", website: "https://www.legalaidact.org.au" },
  ];

  const financialServices = [
    {
      name: "Centrelink",
      phone: "132 850",
      description: "Disability Support Pension, Crisis Payment, Rent Assistance",
      website: "https://www.servicesaustralia.gov.au",
      category: "Government Support",
    },
    {
      name: "National Debt Helpline",
      phone: "1800 007 007",
      description: "Free financial counseling and debt assistance",
      website: "https://ndh.org.au",
      category: "Financial Counseling",
    },
    {
      name: "Emergency Relief",
      phone: "Contact local community organizations",
      description: "Food, clothing, and financial assistance for immediate needs",
      website: "https://www.dss.gov.au",
      category: "Emergency Relief",
    },
    {
      name: "Medicare Mental Health",
      phone: "132 011",
      description: "Up to 10 subsidized psychology sessions per year with GP referral",
      website: "https://www.servicesaustralia.gov.au/mental-health-care-and-medicare",
      category: "Healthcare",
    },
  ];

  const mentalHealthServices = [
    {
      name: "Beyond Blue",
      phone: "1300 22 4636",
      description: "Depression, anxiety, and mental health support (24/7)",
      website: "https://www.beyondblue.org.au",
    },
    {
      name: "Lifeline",
      phone: "13 11 14",
      description: "Crisis support and suicide prevention (24/7)",
      website: "https://www.lifeline.org.au",
    },
    {
      name: "SANE Australia",
      phone: "1800 187 263",
      description: "Complex mental health support",
      website: "https://www.sane.org",
    },
    {
      name: "headspace",
      phone: "1800 650 890",
      description: "Mental health support for 12-25 year olds",
      website: "https://headspace.org.au",
    },
    {
      name: "MindSpot Clinic",
      phone: "1800 61 44 34",
      description: "Free online assessment and treatment for anxiety and depression",
      website: "https://www.mindspot.org.au",
    },
  ];

  const supportGroups = [
    {
      name: "PTSD Support Groups",
      description: "Peer support for people living with PTSD",
      website: "https://www.phoenixaustralia.org",
      type: "PTSD",
    },
    {
      name: "Anxiety Support Groups",
      description: "Local anxiety support groups across Australia",
      website: "https://www.anxietyaustralia.com.au",
      type: "Anxiety",
    },
    {
      name: "Depression Support Groups",
      description: "Peer support for depression recovery",
      website: "https://www.blackdoginstitute.org.au",
      type: "Depression",
    },
    {
      name: "Sleep Disorders Australia",
      description: "Support for people with chronic insomnia and sleep disorders",
      website: "https://www.sleepaus.on.net",
      type: "Sleep",
    },
  ];

  const filteredWorkCover = selectedState === "all" 
    ? workCoverServices 
    : workCoverServices.filter(s => s.state === selectedState);

  const filteredLegalAid = selectedState === "all" 
    ? legalAidServices 
    : legalAidServices.filter(s => s.state === selectedState);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
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
                <h1 className="text-xl font-bold text-foreground">Australian Resources</h1>
                <p className="text-sm text-muted-foreground">Find support services in your area</p>
              </div>
            </div>
            <Link href="/crisis">
              <Button variant="destructive" size="sm">Crisis Help</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-8 max-w-6xl">
        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-4 py-2 border rounded-md bg-background"
              >
                {states.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="mental-health" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="mental-health">
              <Users className="w-4 h-4 mr-2" />
              Mental Health
            </TabsTrigger>
            <TabsTrigger value="workcover">
              <Building2 className="w-4 h-4 mr-2" />
              WorkCover
            </TabsTrigger>
            <TabsTrigger value="legal">
              <Scale className="w-4 h-4 mr-2" />
              Legal Aid
            </TabsTrigger>
            <TabsTrigger value="financial">
              <DollarSign className="w-4 h-4 mr-2" />
              Financial
            </TabsTrigger>
            <TabsTrigger value="support-groups">
              <Users className="w-4 h-4 mr-2" />
              Support Groups
            </TabsTrigger>
          </TabsList>

          {/* Mental Health Services */}
          <TabsContent value="mental-health" className="space-y-4">
            {mentalHealthServices.map((service, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {service.name}
                      </CardTitle>
                      <CardDescription className="mt-2">{service.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <a href={`tel:${service.phone.replace(/\s/g, "")}`}>
                      <Button className="gap-2">
                        <Phone className="w-4 h-4" />
                        {service.phone}
                      </Button>
                    </a>
                    <a href={service.website} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="gap-2">
                        <Globe className="w-4 h-4" />
                        Visit Website
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* WorkCover Services */}
          <TabsContent value="workcover" className="space-y-4">
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle>About WorkCover</CardTitle>
                <CardDescription>
                  WorkCover provides workers' compensation insurance for workplace injuries and illnesses, including mental health conditions caused by work.
                </CardDescription>
              </CardHeader>
            </Card>

            {filteredWorkCover.map((service, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                          {service.state}
                        </span>
                      </div>
                      <CardTitle>{service.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <a href={`tel:${service.phone.replace(/\s/g, "")}`}>
                      <Button className="gap-2">
                        <Phone className="w-4 h-4" />
                        {service.phone}
                      </Button>
                    </a>
                    <a href={service.website} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="gap-2">
                        <Globe className="w-4 h-4" />
                        Visit Website
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Legal Aid Services */}
          <TabsContent value="legal" className="space-y-4">
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle>About Legal Aid</CardTitle>
                <CardDescription>
                  Legal Aid provides free or low-cost legal advice and representation for people who cannot afford a lawyer.
                </CardDescription>
              </CardHeader>
            </Card>

            {filteredLegalAid.map((service, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                          {service.state}
                        </span>
                      </div>
                      <CardTitle>{service.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <a href={`tel:${service.phone.replace(/\s/g, "")}`}>
                      <Button className="gap-2">
                        <Phone className="w-4 h-4" />
                        {service.phone}
                      </Button>
                    </a>
                    <a href={service.website} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="gap-2">
                        <Globe className="w-4 h-4" />
                        Visit Website
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Financial Services */}
          <TabsContent value="financial" className="space-y-4">
            {financialServices.map((service, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-secondary bg-secondary/10 px-2 py-1 rounded">
                          {service.category}
                        </span>
                      </div>
                      <CardTitle>{service.name}</CardTitle>
                      <CardDescription className="mt-2">{service.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {service.phone !== "Contact local community organizations" && (
                      <a href={`tel:${service.phone.replace(/\s/g, "")}`}>
                        <Button className="gap-2">
                          <Phone className="w-4 h-4" />
                          {service.phone}
                        </Button>
                      </a>
                    )}
                    <a href={service.website} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="gap-2">
                        <Globe className="w-4 h-4" />
                        Visit Website
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Support Groups */}
          <TabsContent value="support-groups" className="space-y-4">
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle>Peer Support Groups</CardTitle>
                <CardDescription>
                  Connect with others who understand what you're going through. Support groups provide a safe space to share experiences and learn coping strategies.
                </CardDescription>
              </CardHeader>
            </Card>

            {supportGroups.map((group, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                          {group.type}
                        </span>
                      </div>
                      <CardTitle>{group.name}</CardTitle>
                      <CardDescription className="mt-2">{group.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <a href={group.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="gap-2">
                      <Globe className="w-4 h-4" />
                      Find Groups Near You
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Map Integration Note */}
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>Find Services Near You</CardTitle>
                <CardDescription>
                  Use the contact information above to find services in your local area. Many organizations have regional offices and can connect you with nearby support.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Infinite branding */}
      <div className="infinite-branding">infinite♾2025</div>
    </div>
  );
}
