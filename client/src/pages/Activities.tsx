import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wind, Brain, Moon, Heart, BookOpen, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Activities() {
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale");

  const startBreathingExercise = () => {
    setBreathingActive(true);
    const cycle = () => {
      setBreathingPhase("inhale");
      setTimeout(() => setBreathingPhase("hold"), 4000);
      setTimeout(() => setBreathingPhase("exhale"), 8000);
      setTimeout(() => setBreathingPhase("rest"), 12000);
    };
    cycle();
    const interval = setInterval(cycle, 16000);
    return () => clearInterval(interval);
  };

  const stopBreathingExercise = () => {
    setBreathingActive(false);
    setBreathingPhase("inhale");
  };

  const groundingTechniques = [
    {
      name: "5-4-3-2-1 Technique",
      description: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste",
      steps: [
        "Look around and name 5 things you can see",
        "Notice 4 things you can touch (texture, temperature)",
        "Listen for 3 sounds you can hear",
        "Identify 2 things you can smell",
        "Notice 1 thing you can taste",
      ],
    },
    {
      name: "Physical Grounding",
      description: "Use physical sensations to anchor yourself in the present",
      steps: [
        "Stamp your feet on the ground",
        "Hold ice cubes in your hands",
        "Splash cold water on your face",
        "Stretch your body slowly",
        "Clench and release your fists",
      ],
    },
    {
      name: "Mental Grounding",
      description: "Use your mind to focus on the present moment",
      steps: [
        "Describe your surroundings in detail",
        "Count backwards from 100 by 7s",
        "Name categories (colors, animals, countries)",
        "Recite a poem or song lyrics",
        "Think of your favorite place in detail",
      ],
    },
  ];

  const cbtTools = [
    {
      title: "Thought Record",
      description: "Identify and challenge unhelpful thoughts",
      prompts: [
        "What situation triggered this thought?",
        "What automatic thought came to mind?",
        "What emotions did you feel? (0-100%)",
        "What evidence supports this thought?",
        "What evidence contradicts this thought?",
        "What's a more balanced perspective?",
      ],
    },
    {
      title: "Behavioral Activation",
      description: "Schedule activities to improve mood",
      prompts: [
        "What activities used to bring you joy?",
        "What small activity could you do today?",
        "When will you do this activity?",
        "Who could join you or support you?",
        "How did you feel after completing it?",
      ],
    },
    {
      title: "Worry Time",
      description: "Set aside specific time for worries",
      prompts: [
        "Choose a 15-minute worry time each day",
        "Write down worries as they come up",
        "During worry time, review your list",
        "For each worry: Can I control this?",
        "If yes, make a plan. If no, practice letting go",
      ],
    },
  ];

  const sleepHygiene = [
    "Keep a consistent sleep schedule (same bedtime and wake time)",
    "Create a relaxing bedtime routine (30-60 minutes before bed)",
    "Make your bedroom cool, dark, and quiet",
    "Avoid screens 1 hour before bed (blue light disrupts sleep)",
    "Limit caffeine after 2pm and avoid alcohol before bed",
    "Exercise regularly, but not within 3 hours of bedtime",
    "If you can't sleep after 20 minutes, get up and do something calming",
    "Use your bed only for sleep (not work or watching TV)",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
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
                <h1 className="text-xl font-bold text-foreground">Calming Activities</h1>
                <p className="text-sm text-muted-foreground">Evidence-based tools to help you feel better</p>
              </div>
            </div>
            <Link href="/crisis">
              <Button variant="destructive" size="sm">Crisis Help</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-8 max-w-6xl">
        <Tabs defaultValue="breathing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="breathing">
              <Wind className="w-4 h-4 mr-2" />
              Breathing
            </TabsTrigger>
            <TabsTrigger value="grounding">
              <Heart className="w-4 h-4 mr-2" />
              Grounding
            </TabsTrigger>
            <TabsTrigger value="cbt">
              <Brain className="w-4 h-4 mr-2" />
              CBT Tools
            </TabsTrigger>
            <TabsTrigger value="sleep">
              <Moon className="w-4 h-4 mr-2" />
              Sleep
            </TabsTrigger>
            <TabsTrigger value="journaling">
              <BookOpen className="w-4 h-4 mr-2" />
              Journaling
            </TabsTrigger>
            <TabsTrigger value="meditation">
              <Sparkles className="w-4 h-4 mr-2" />
              Meditation
            </TabsTrigger>
          </TabsList>

          {/* Breathing Exercises */}
          <TabsContent value="breathing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Box Breathing (4-4-4-4)</CardTitle>
                <CardDescription>
                  A simple breathing technique used by Navy SEALs to reduce stress and improve focus
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative w-64 h-64 flex items-center justify-center">
                    <div
                      className={`absolute w-48 h-48 rounded-full bg-primary/20 ${
                        breathingActive ? "animate-breathe" : ""
                      }`}
                    />
                    <div className="relative z-10 text-center">
                      {breathingActive ? (
                        <>
                          <p className="text-4xl font-bold text-primary capitalize">{breathingPhase}</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            {breathingPhase === "inhale" && "Breathe in through your nose"}
                            {breathingPhase === "hold" && "Hold your breath"}
                            {breathingPhase === "exhale" && "Breathe out through your mouth"}
                            {breathingPhase === "rest" && "Rest and prepare"}
                          </p>
                        </>
                      ) : (
                        <p className="text-lg text-muted-foreground">Click start to begin</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {!breathingActive ? (
                      <Button onClick={startBreathingExercise} size="lg">
                        Start Breathing Exercise
                      </Button>
                    ) : (
                      <Button onClick={stopBreathingExercise} variant="outline" size="lg">
                        Stop
                      </Button>
                    )}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-3">How to Practice:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Inhale slowly through your nose for 4 seconds</li>
                    <li>Hold your breath for 4 seconds</li>
                    <li>Exhale slowly through your mouth for 4 seconds</li>
                    <li>Rest for 4 seconds before the next cycle</li>
                    <li>Repeat for 5-10 minutes or until you feel calmer</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4-7-8 Breathing</CardTitle>
                <CardDescription>
                  Dr. Andrew Weil's technique for relaxation and sleep
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Empty your lungs completely</li>
                  <li>Breathe in quietly through your nose for 4 seconds</li>
                  <li>Hold your breath for 7 seconds</li>
                  <li>Exhale completely through your mouth for 8 seconds (make a whoosh sound)</li>
                  <li>Repeat 3-4 times</li>
                </ol>
                <p className="text-sm text-muted-foreground mt-4">
                  This technique is particularly helpful for falling asleep and managing anxiety.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Grounding Techniques */}
          <TabsContent value="grounding" className="space-y-6">
            {groundingTechniques.map((technique, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>{technique.name}</CardTitle>
                  <CardDescription>{technique.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    {technique.steps.map((step, stepIdx) => (
                      <li key={stepIdx}>{step}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle>When to Use Grounding</CardTitle>
                <CardDescription>
                  Grounding techniques are most helpful when you're experiencing:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Panic attacks or intense anxiety</li>
                  <li>PTSD flashbacks or dissociation</li>
                  <li>Overwhelming emotions</li>
                  <li>Racing thoughts</li>
                  <li>Feeling disconnected from reality</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CBT Tools */}
          <TabsContent value="cbt" className="space-y-6">
            {cbtTools.map((tool, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tool.prompts.map((prompt, promptIdx) => (
                      <div key={promptIdx} className="flex gap-3">
                        <span className="text-primary font-semibold">{promptIdx + 1}.</span>
                        <p className="text-sm flex-1">{prompt}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Save to Journal
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Sleep Hygiene */}
          <TabsContent value="sleep" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sleep Hygiene Tips</CardTitle>
                <CardDescription>
                  Evidence-based practices to improve sleep quality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {sleepHygiene.map((tip, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-primary font-semibold">{idx + 1}.</span>
                      <p className="text-sm flex-1">{tip}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sleep Diary</CardTitle>
                <CardDescription>
                  Track your sleep patterns to identify issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p><strong>What to track:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Bedtime and wake time</li>
                    <li>How long it took to fall asleep</li>
                    <li>Number of times you woke during the night</li>
                    <li>How rested you felt in the morning (1-10)</li>
                    <li>Caffeine, alcohol, or medication use</li>
                    <li>Exercise and stress levels</li>
                  </ul>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Start Sleep Diary
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Journaling */}
          <TabsContent value="journaling" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gratitude Journaling</CardTitle>
                <CardDescription>
                  Write 3 things you're grateful for each day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Research shows that gratitude journaling can improve mood, reduce stress, and increase overall well-being.
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Today I'm grateful for:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-2">
                    <li>Something small (a good cup of coffee, sunshine)</li>
                    <li>Someone in your life (friend, family, pet)</li>
                    <li>Something about yourself (a strength, achievement)</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emotion Journaling</CardTitle>
                <CardDescription>
                  Process and understand your feelings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p><strong>Prompts to explore:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>How am I feeling right now?</li>
                    <li>What triggered this emotion?</li>
                    <li>Where do I feel this in my body?</li>
                    <li>What do I need right now?</li>
                    <li>What would help me feel better?</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Meditation */}
          <TabsContent value="meditation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Body Scan Meditation</CardTitle>
                <CardDescription>
                  Progressive relaxation from head to toe (10-15 minutes)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Lie down or sit comfortably</li>
                  <li>Close your eyes and take 3 deep breaths</li>
                  <li>Focus on your toes—notice any sensations, then relax them</li>
                  <li>Move up to your feet, ankles, calves, knees, thighs</li>
                  <li>Continue through your hips, stomach, chest, back</li>
                  <li>Relax your hands, arms, shoulders, neck</li>
                  <li>Finally, relax your jaw, face, and scalp</li>
                  <li>Take a few more deep breaths and slowly open your eyes</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loving-Kindness Meditation</CardTitle>
                <CardDescription>
                  Cultivate compassion for yourself and others
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p><strong>Repeat these phrases silently:</strong></p>
                  <div className="space-y-2 ml-4">
                    <p>May I be safe</p>
                    <p>May I be healthy</p>
                    <p>May I be happy</p>
                    <p>May I live with ease</p>
                  </div>
                  <p className="mt-4">Then extend these wishes to others: a loved one, a neutral person, someone difficult, and finally all beings.</p>
                </div>
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
