'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Briefcase,
  MessageSquare,
  CheckCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  featured: boolean;
}

interface Message {
  _id: string;
  read: boolean;
}

export default function DashboardOverview() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [projectsRes, messagesRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/messages'),
      ]);
      
      const projectsData = await projectsRes.json();
      const messagesData = await messagesRes.json();
      
      setProjects(projectsData);
      setMessages(messagesData);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>;
  }

  const unreadCount = messages.filter(m => !m.read).length;
  const featuredCount = projects.filter(p => p.featured).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold gradient-text">Overview</h1>
        <p className="text-sm text-muted-foreground">Welcome back! Here's what's happening with your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-purple-500/10">
              <Briefcase className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Projects</p>
              <p className="text-2xl font-bold">{projects.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-500/10">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Featured</p>
              <p className="text-2xl font-bold">{featuredCount}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <MessageSquare className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Messages</p>
              <p className="text-2xl font-bold">{messages.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-orange-500/10">
              <Clock className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Unread Messages</p>
              <p className="text-2xl font-bold">{unreadCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Recent Projects</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/dashboard/projects">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No projects yet</p>
            ) : (
              <div className="space-y-2">
                {projects.slice(0, 5).map((project) => (
                  <div key={project._id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-sm">{project.title}</span>
                    {project.featured && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white">Featured</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Recent Messages</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/dashboard/messages">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {messages.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No messages yet</p>
            ) : (
              <div className="space-y-2">
                {messages.slice(0, 5).map((message) => (
                  <div key={message._id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-sm truncate max-w-[150px]">
                      {message.read ? '📖' : '📩'} {message._id}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {message.read ? 'Read' : 'Unread'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}