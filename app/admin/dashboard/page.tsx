'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  Trash2, 
  Edit, 
  Plus, 
  Loader2, 
  LogOut, 
  Eye, 
  CheckCircle, 
  Clock,
  LayoutGrid,
  MessageSquare,
  Users,
  Briefcase
} from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
  featured: boolean;
}

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; type: string } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewingMessage, setViewingMessage] = useState<Message | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    category: 'E-commerce',
    featured: false,
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchProjects(), fetchMessages()]);
    setLoading(false);
  };

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  const fetchMessages = async () => {
    const res = await fetch('/api/messages');
    const data = await res.json();
    setMessages(data);
  };

  const handleAddProject = async () => {
    setFormLoading(true);
    const technologiesArray = formData.technologies.split(',').map(tech => tech.trim());
    
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        technologies: technologiesArray,
      }),
    });
    
    if (res.ok) {
      await fetchProjects();
      setIsDialogOpen(false);
      resetForm();
    }
    setFormLoading(false);
  };

  const handleUpdateProject = async () => {
    if (!editingProject) return;
    setFormLoading(true);
    
    const technologiesArray = formData.technologies.split(',').map(tech => tech.trim());
    
    const res = await fetch(`/api/projects/${editingProject._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        technologies: technologiesArray,
      }),
    });
    
    if (res.ok) {
      await fetchProjects();
      setIsDialogOpen(false);
      setEditingProject(null);
      resetForm();
    }
    setFormLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    
    const res = await fetch(`/api/${deleteTarget.type}/${deleteTarget.id}`, {
      method: 'DELETE',
    });
    
    if (res.ok) {
      if (deleteTarget.type === 'projects') {
        await fetchProjects();
      } else {
        await fetchMessages();
      }
      setDeleteTarget(null);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    await fetch(`/api/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: true }),
    });
    await fetchMessages();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: '',
      liveUrl: '',
      githubUrl: '',
      category: 'E-commerce',
      featured: false,
    });
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      category: project.category,
      featured: project.featured,
    });
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingProject(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter(m => !m.read).length;
  const featuredCount = projects.filter(p => p.featured).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-6 px-3 md:py-12 md:px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold gradient-text">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your portfolio content</p>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {activeTab === 'projects' && (
              <Button onClick={openAddDialog} className="gap-2 flex-1 sm:flex-none" size="sm">
                <Plus className="h-4 w-4" /> Add Project
              </Button>
            )}
            <Button variant="outline" onClick={handleLogout} className="gap-2 flex-1 sm:flex-none" size="sm">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards - Mobile Friendly */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Briefcase className="h-4 w-4 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Projects</p>
                <p className="text-xl font-bold">{projects.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <MessageSquare className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Messages</p>
                <p className="text-xl font-bold">{messages.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Featured</p>
                <p className="text-xl font-bold">{featuredCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Clock className="h-4 w-4 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Unread</p>
                <p className="text-xl font-bold">{unreadCount}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects" className="gap-2 text-xs sm:text-sm">
              <Briefcase className="h-4 w-4" /> Projects
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2 text-xs sm:text-sm">
              <MessageSquare className="h-4 w-4" /> Messages {unreadCount > 0 && `(${unreadCount})`}
            </TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base sm:text-lg">All Projects</CardTitle>
              </CardHeader>
              <CardContent>
                {projects.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Briefcase className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No projects yet. Click "Add Project" to create one.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {projects.map((project) => (
                      <div key={project._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-3 sm:p-4 border rounded-lg hover:shadow-md transition-all bg-background">
                        <div className="flex-1 w-full sm:w-auto">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-semibold text-sm sm:text-base">{project.title}</h3>
                            {project.featured && <Badge className="text-xs bg-gradient-to-r from-purple-500 to-blue-500">Featured</Badge>}
                            <Badge variant="outline" className="text-xs">{project.category}</Badge>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span key={tech} className="text-[10px] bg-muted px-2 py-0.5 rounded">
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="text-[10px] text-muted-foreground">+{project.technologies.length - 3}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1 w-full sm:w-auto justify-end">
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => openEditDialog(project)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => setDeleteTarget({ id: project._id, type: 'projects' })}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base sm:text-lg">Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                {messages.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Mail className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No messages yet.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {messages.map((message) => (
                      <div key={message._id} className={`p-3 sm:p-4 border rounded-lg transition-all ${!message.read ? 'bg-primary/5 border-primary/20' : ''}`}>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                          <div>
                            <h3 className="font-semibold text-sm sm:text-base">{message.name}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">{message.email}</p>
                          </div>
                          <div className="flex gap-1 w-full sm:w-auto">
                            {!message.read && (
                              <Button variant="outline" size="sm" className="text-xs h-8" onClick={() => handleMarkAsRead(message._id)}>
                                <CheckCircle className="h-3 w-3 mr-1" /> Read
                              </Button>
                            )}
                            <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => setDeleteTarget({ id: message._id, type: 'messages' })}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm mt-2 bg-muted/30 p-2 rounded">{message.message}</p>
                        <p className="text-[10px] text-muted-foreground mt-2">
                          {new Date(message.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add/Edit Project Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-4">
            <DialogHeader>
              <DialogTitle className="text-lg">{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div>
                <Label className="text-sm">Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Project title"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Project description"
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm">Technologies (comma-separated)</Label>
                <Input
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, Next.js, MongoDB"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm">Live URL</Label>
                <Input
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://example.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm">GitHub URL</Label>
                <Input
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/username/repo"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm">Category</Label>
                <select
                  className="w-full p-2 rounded-md border bg-background mt-1"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option>E-commerce</option>
                  <option>AI</option>
                  <option>Enterprise</option>
                  <option>Education</option>
                  <option>Fintech</option>
                  <option>Mobile</option>
                </select>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="featured" className="text-sm cursor-pointer">Feature this project</Label>
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full sm:w-auto">Cancel</Button>
              <Button onClick={editingProject ? handleUpdateProject : handleAddProject} disabled={formLoading} className="w-full sm:w-auto">
                {formLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (editingProject ? 'Update' : 'Create')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this {deleteTarget?.type === 'projects' ? 'project' : 'message'}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}