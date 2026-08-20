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
import { 
  Trash2, 
  Edit, 
  Plus, 
  Loader2, 
  Briefcase,
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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
    setLoading(false);
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

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });
    
    if (res.ok) {
      await fetchProjects();
      setDeleteTarget(null);
    }
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

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const featuredCount = projects.filter(p => p.featured).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold gradient-text">Projects</h1>
          <p className="text-sm text-muted-foreground">
            {projects.length} total • {featuredCount} featured
          </p>
        </div>
        <Button onClick={openAddDialog} className="gap-2">
          <Plus className="h-4 w-4" /> Add New Project
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">All Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Briefcase className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No projects yet. Click "Add New Project" to create one.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 border rounded-lg hover:shadow-md transition-all bg-background">
                  <div className="flex-1 w-full">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm sm:text-base">{project.title}</h3>
                      {project.featured && (
                        <Badge className="text-xs bg-gradient-to-r from-purple-500 to-blue-500">Featured</Badge>
                      )}
                      <Badge variant="outline" className="text-xs">{project.category}</Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="text-[10px] bg-muted px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[10px] text-muted-foreground">+{project.technologies.length - 4}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 w-full sm:w-auto">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => openEditDialog(project)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => setDeleteTarget(project._id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
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
              This action cannot be undone. This will permanently delete this project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteTarget && handleDelete(deleteTarget)} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}