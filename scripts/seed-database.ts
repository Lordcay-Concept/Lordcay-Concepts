import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI!;

// Define schemas
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  liveUrl: String,
  githubUrl: String,
  category: String,
  featured: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: String,
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

const projects = [
  {
    title: "Ikan Online Store",
    description: "Full-featured e-commerce platform with product management, cart, checkout, and payment integration.",
    technologies: ["JavaScript", "Node.Js", "MongoDB", "Paystack", "Chakra UI"],
    liveUrl: "https://ikan-online-store.vercel.app",
    githubUrl: "https://github.com/Lordcay-Concept",
    category: "E-commerce",
    featured: false,
  },
  {
    title: "Research Hub",
    description: "AI-powered research platform with intelligent search, content generation, and academic analysis tools.",
    technologies: ["JavaScript", "Grok", "Chakra UI", "TensorFlow", "Node.js", "MongoDB"],
    liveUrl: "https://research-hub-space.vercel.app",
    githubUrl: "https://github.com/Lordcay-Concept",
    category: "AI",
    featured: false,
  },
  {
    title: "A&Q Master Pro",
    description: "Comprehensive appointment and queue management system with real-time updates, SMS notifications, and analytics.",
    technologies: ["React", "TypeScript", "TailwindCSS + ShadCN", "Node.js", "Socket.io", "MongoDB", "Twilio", "NextAuth"],
    liveUrl: "https://aqmasterpro.vercel.app",
    githubUrl: "https://github.com/Lordcay-Concept",
    category: "Enterprise",
    featured: false,
  },
  {
    title: "Possible Height School",
    description: "Complete school management system with student records, grading, attendance, fees, and parent portal.",
    technologies: ["Next.js", "PostgreSQL", "Supabase", "TailwindCSS + ShadCN", "NextAuth", "Node.js", "TypeScript"],
    liveUrl: "https://possibleheightschools.vercel.app",
    githubUrl: "https://github.com/Lordcay-Concept",
    category: "Education",
    featured: false,
  },
  {
    title: "BonaPay Web",
    description: "Secure fintech web platform for payments, transfers, bill payments, and financial management.",
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "TailwindCSS + ShadCN", "NextAuth", "Node.js", "Twilio"],
    liveUrl: "https://bonapay.vercel.app",
    githubUrl: "https://github.com/Lordcay-Concept",
    category: "Fintech",
    featured: false,
  },
  {
    title: "BonaPay App",
    description: "Mobile fintech application with biometric authentication, QR payments, and real-time transaction tracking.",
    technologies: ["React Native", "Expo", "Node.js", "Supabase", "Firebase", "TypeScript", "Twilio", "TailwindCSS + ShadCN", "NextAuth"],
    liveUrl: "https://github.com/Lordcay-Concept/bonapay-app/releases/tag/v1.0.0",
    githubUrl: "https://github.com/Lordcay-Concept",
    category: "Mobile",
    featured: false,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await User.deleteMany({});

    // Insert projects
    const insertedProjects = await Project.insertMany(projects);

    // Create admin user
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash('Admin123!', salt);
    
    await User.create({
      email: 'uferecaleb@gmail.com',
      password: hashedPassword,
      name: 'Administrator',
      role: 'admin',
    });
    

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seed();