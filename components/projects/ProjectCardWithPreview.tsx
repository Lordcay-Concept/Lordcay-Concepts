'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Eye } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ProjectCardWithPreviewProps {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  category: string;
}

export function ProjectCardWithPreview({
  title,
  description,
  technologies,
  liveUrl,
  githubUrl,
  imageUrl,
  category,
}: ProjectCardWithPreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePreview = async () => {
    if (!liveUrl) return;
    
    setIsLoading(true);
    // Use a proxy service to fetch website preview (you can also use og:image)
    // For now, we'll open the actual site in a dialog
    setPreviewUrl(liveUrl);
    setIsLoading(false);
  };

  return (
    <>
      <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-scale-up">
        {/* Image/Preview Area */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-500/20 to-blue-500/20">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-6xl animate-float">🚀</div>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Preview Button Overlay */}
          {liveUrl && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                  onClick={handlePreview}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-[90vw] h-[80vh]">
                <DialogHeader>
                  <DialogTitle>{title} - Live Preview</DialogTitle>
                </DialogHeader>
                <div className="flex-1 mt-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <iframe
                      src={liveUrl}
                      title={title}
                      className="w-full h-full rounded-lg border"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    />
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              {category}
            </Badge>
          </div>
          <CardTitle className="group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex gap-2">
          {liveUrl && (
            <Button size="sm" className="flex-1 gradient-bg" asChild>
              <Link href={liveUrl} target="_blank">
                Live Demo <ExternalLink className="ml-2 h-3 w-3" />
              </Link>
            </Button>
          )}
          {githubUrl && (
            <Button size="sm" variant="outline" className="flex-1" asChild>
              <Link href={githubUrl} target="_blank">
                Code <SiGithub className="ml-2 h-3 w-3" />
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Optional: Add OG Meta Tag fetcher for better previews */}
      <style jsx global>{`
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-600 {
          animation-delay: 600ms;
        }
      `}</style>
    </>
  );
}