import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, ArrowLeft, AlertCircle, MessageSquare, Globe } from "lucide-react";
import { Link } from "wouter";

export default function Crisis() {
  const crisisLines = [
    {
      name: "Lifeline",
      phone: "13 11 14",
      description: "24/7 crisis support and suicide prevention",
      category: "General",
    },
    {
      name: "Beyond Blue",
      phone: "1300 22 4636",
      description: "Depression, anxiety, and mental health support",
      category: "General",
    },
    {
      name: "Suicide Call Back Service",
      phone: "1300 659 467",
      description: "24/7 suicide prevention counseling",
      category: "Suicide Prevention",
    },
    {
      name: "Kids Helpline",
      phone: "1800 55 1800",
      description: "For young people aged 5-25",
      category: "Youth",
    },
    {
      name: "MensLine Australia",
      phone: "1300 78 99 78",
      description: "Support for men dealing with relationship and family concerns",
      category: "Men's Health",
    },
    {
      name: "1800 RESPECT",
      phone: "1800 737 732",
      description: "Domestic, family and sexual violence counseling",
      category: "Domestic Violence",
    },
    {
      name: "QLife",
      phone: "1800 184 527",
      description: "LGBTI+ peer support and referral",
      category: "LGBTI+",
    },
    {
      name: "SANE Australia",
      phone: "1800 187 263",
      description: "Complex mental health support",
      category: "Mental Health",
    },
    {
      name: "headspace",
      phone: "1800 650 890",
      description: "Mental health support for 12-25 year olds (3pm-10pm)",
      category: "Youth",
    },
  ];

  const emergencySteps = [
    {
      title: "Call 000",
      description: "If you or someone else is in immediate danger",
      icon: AlertCircle,
    },
    {
      title: "Go to Emergency",
      description: "Visit your nearest hospital emergency department",
      icon: AlertCircle,
    },
    {
      title: "Call a Crisis Line",
      description: "Speak with a trained counselor 24/7",
      icon: Phone,
    },
    {
      title: "Reach Out",
      description: "Contact a trusted friend, family member, or support person",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-destructive/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">Crisis Support</h1>
              <p className="text-sm text-muted-foreground">Immediate help is available</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8 max-w-6xl">
        {/* Emergency Alert */}
        <Card className="mb-8 border-destructive bg-destructive/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-destructive/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <CardTitle className="text-destructive">In an Emergency</CardTitle>
                <CardDescription>If you're in immediate danger, call 000 or go to your nearest hospital emergency department</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* What to Do */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">What to Do Right Now</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {emergencySteps.map((step, idx) => (
              <Card key={idx} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Crisis Hotlines */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">24/7 Crisis Hotlines</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {crisisLines.map((line, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                          {line.category}
                        </span>
                      </div>
                      <CardTitle className="text-xl mb-2">{line.name}</CardTitle>
                      <CardDescription className="mb-3">{line.description}</CardDescription>
                      <a href={`tel:${line.phone.replace(/\s/g, "")}`}>
                        <Button className="w-full gap-2" size="lg">
                          <Phone className="w-4 h-4" />
                          {line.phone}
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Online Resources */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Online Support</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <Globe className="w-8 h-8 text-primary mb-3" />
                <CardTitle>Lifeline Text</CardTitle>
                <CardDescription>Text 0477 13 11 14 (6pm-midnight AEDT)</CardDescription>
                <a href="https://www.lifeline.org.au/crisis-text/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full mt-3">Visit Website</Button>
                </a>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="w-8 h-8 text-primary mb-3" />
                <CardTitle>Beyond Blue Chat</CardTitle>
                <CardDescription>Online chat support available 24/7</CardDescription>
                <a href="https://www.beyondblue.org.au/get-support/get-immediate-support" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full mt-3">Start Chat</Button>
                </a>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="w-8 h-8 text-primary mb-3" />
                <CardTitle>headspace Chat</CardTitle>
                <CardDescription>Webchat for young people (3pm-10pm)</CardDescription>
                <a href="https://headspace.org.au/eheadspace/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full mt-3">Start Chat</Button>
                </a>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Safety Note */}
        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle>You Are Not Alone</CardTitle>
            <CardDescription className="text-base">
              Reaching out for help is a sign of strength, not weakness. These services are staffed by trained professionals who understand what you're going through and are here to support you—no judgment, just compassion.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Link href="/chat">
                <Button variant="outline">Chat with Trina</Button>
              </Link>
              <Link href="/resources">
                <Button variant="outline">Find Local Services</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Infinite branding */}
      <div className="infinite-branding">infinite♾2025</div>
    </div>
  );
}
