'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Trash2, 
  Loader2, 
  CheckCircle,
  Eye,
  MessageSquare,
} from 'lucide-react';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [viewingMessage, setViewingMessage] = useState<Message | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await fetch('/api/messages');
    const data = await res.json();
    setMessages(data);
    setLoading(false);
  };

  const handleMarkAsRead = async (id: string) => {
    await fetch(`/api/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: true }),
    });
    await fetchMessages();
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/messages/${id}`, {
      method: 'DELETE',
    });
    
    if (res.ok) {
      await fetchMessages();
      setDeleteTarget(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold gradient-text">Messages</h1>
        <p className="text-sm text-muted-foreground">
          {messages.length} total • {unreadCount} unread
        </p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">All Messages</CardTitle>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No messages yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((message) => (
                <div 
                  key={message._id} 
                  className={`p-4 border rounded-lg transition-all cursor-pointer hover:shadow-md ${
                    !message.read ? 'bg-primary/5 border-primary/20' : ''
                  }`}
                  onClick={() => setViewingMessage(message)}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm sm:text-base">{message.name}</h3>
                        {!message.read && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500 text-white">New</span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{message.email}</p>
                      <p className="text-sm mt-1 line-clamp-2">{message.message}</p>
                    </div>
                    <div className="flex gap-1 w-full sm:w-auto">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); setViewingMessage(message); }}>
                        <Eye className="h-3 w-3" />
                      </Button>
                      {!message.read && (
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); handleMarkAsRead(message._id); }}>
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        </Button>
                      )}
                      <Button variant="destructive" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); setDeleteTarget(message._id); }}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Message Dialog */}
      <Dialog open={!!viewingMessage} onOpenChange={() => setViewingMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message from {viewingMessage?.name}</DialogTitle>
          </DialogHeader>
          {viewingMessage && (
            <div className="space-y-4 py-2">
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{viewingMessage.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Message</p>
                <p className="text-sm bg-muted/30 p-3 rounded-lg">{viewingMessage.message}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Sent</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(viewingMessage.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                {!viewingMessage.read && (
                  <Button onClick={() => {
                    handleMarkAsRead(viewingMessage._id);
                    setViewingMessage(null);
                  }}>
                    <CheckCircle className="h-4 w-4 mr-2" /> Mark as Read
                  </Button>
                )}
                <Button variant="outline" onClick={() => setViewingMessage(null)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this message.
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