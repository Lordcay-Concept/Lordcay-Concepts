import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const skills = {
  "Frontend": [
    "React", "Next.js", "TypeScript", "Tailwind CSS", 
    "Shadcn UI", "Redux", "React Query", "Vite", "Chakra UI"
  ],
  "Backend": [
    "Node.js", "Express.js", "Python", "MongoDB", 
    "PostgreSQL", "REST APIs", "GraphQL", "Prisma"
  ],
  "Mobile": [
    "React Native", "Expo", "Flutter", "iOS/Android", 
    "Push Notifications", "Biometric Auth", "QR Codes"
  ],
  "DevOps & Tools": [
    "Git", "GitHub", "Docker", "VS Code", 
    "Figma", "Vercel", "Netlify", "Supabase"
  ],
  "Cloud & Services": [
    "AWS", "Firebase", "MongoDB Atlas", "Cloudinary",
    "Twilio", "Paystack", "Stripe", "SendGrid", "FlutterWave"
  ],
  "AI & Emerging": [
    "OpenAI API", "TensorFlow", "LangChain", "Grok",
    "AI Integration", "Machine Learning", "Chatbots"
  ]
}

export function Skills() {
  return (
    <section className="py-12 sm:py-20">
      <div className="container px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base max-w-2xl mx-auto">
            Technologies I work with to build amazing digital experiences
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([category, items]) => (
            <Card key={category} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-center text-lg sm:text-xl">
                  <span className="gradient-text">{category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 sm:px-3 sm:py-1.5 bg-muted rounded-full text-xs sm:text-sm transition-all hover:bg-primary/10 hover:scale-105 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}