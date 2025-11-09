import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Heart, MessageCircle, Activity, MapPin, FileText, Phone } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/trina-avatar.png" alt="Trina" className="w-12 h-12 rounded-full" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">{APP_TITLE}</h1>
                <p className="text-sm text-muted-foreground">Your mental health support companion</p>
              </div>
            </div>
            <Link href="/crisis">
              <Button variant="destructive" size="sm" className="gap-2">
                <Phone className="w-4 h-4" />
                Crisis Help
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Welcome to a safe space
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Meet Trina, Your Nurturing Support Companion
            </h2>
            <p className="text-lg text-muted-foreground">
              Trina is here to listen, support, and guide you through difficult moments. Whether you're dealing with depression, PTSD, panic attacks, or insomnia, you're not alone. Take a deep breath—help is here.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/chat">
                <Button size="lg" className="gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Chat with Trina
                </Button>
              </Link>
              <Link href="/activities">
                <Button size="lg" variant="outline" className="gap-2">
                  <Activity className="w-5 h-5" />
                  Calming Activities
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-gentle-pulse"></div>
              <img 
                src="/trina-avatar.png" 
                alt="Trina the Nurture Turtle" 
                className="relative w-80 h-80 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 bg-card/30 rounded-3xl mb-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">How Minds AI Can Help You</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access evidence-based tools, connect with local resources, and find the support you need—all in one safe, compassionate space.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/chat">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Talk to Trina</CardTitle>
                <CardDescription>
                  Chat anonymously or save your conversations. Trina provides compassionate support and evidence-based guidance.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/activities">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Calming Activities</CardTitle>
                <CardDescription>
                  Breathing exercises, meditation, CBT tools, sleep hygiene, and grounding techniques to help you feel better.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/resources">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Find Local Services</CardTitle>
                <CardDescription>
                  Connect with mental health services, WorkCover, Legal Aid, and support groups in your area across Australia.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/profile">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Health Profile</CardTitle>
                <CardDescription>
                  Securely store your health information and create referral forms for doctors and services.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/crisis">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-destructive/20">
              <CardHeader>
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-destructive" />
                </div>
                <CardTitle>Crisis Support</CardTitle>
                <CardDescription>
                  Immediate access to crisis hotlines, emergency resources, and 24/7 support services.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 h-full">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>You're Not Alone</CardTitle>
              <CardDescription>
                Millions of Australians experience mental health challenges. Seeking help is a sign of strength, not weakness.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h3 className="text-3xl font-bold text-foreground">Ready to Start Your Journey?</h3>
          <p className="text-lg text-muted-foreground">
            Take the first step towards feeling better. Trina is here to listen, support, and guide you.
          </p>
          <Link href="/chat">
            <Button size="lg" className="gap-2">
              <MessageCircle className="w-5 h-5" />
              Start Chatting with Trina
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              <p>© 2025 {APP_TITLE}. Supporting mental health across Australia.</p>
              <p className="mt-1">If you're in crisis, please call <strong>Lifeline 13 11 14</strong> or <strong>000</strong> for emergencies.</p>
            </div>
            <div className="flex gap-4">
              <Link href="/crisis">
                <Button variant="link" size="sm">Crisis Resources</Button>
              </Link>
              <Link href="/resources">
                <Button variant="link" size="sm">Find Help</Button>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Infinite branding */}
      <div className="infinite-branding">infinite♾2025</div>
    </div>
  );
}
