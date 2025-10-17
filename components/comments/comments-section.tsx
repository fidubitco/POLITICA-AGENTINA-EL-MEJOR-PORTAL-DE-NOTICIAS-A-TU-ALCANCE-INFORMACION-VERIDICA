'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { MessageCircle, ThumbsUp, Reply, Trash2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { formatRelativeTime } from '@/lib/utils';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
  replies?: Comment[];
}

interface CommentsSectionProps {
  postId: string;
}

export default function CommentsSection({ postId }: CommentsSectionProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?postId=${postId}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !session) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          content: newComment,
        }),
      });

      if (res.ok) {
        setNewComment('');
        await fetchComments();
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (parentId: string) => {
    if (!replyContent.trim() || !session) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          content: replyContent,
          parentId,
        }),
      });

      if (res.ok) {
        setReplyContent('');
        setReplyingTo(null);
        await fetchComments();
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('¿Eliminar este comentario?')) return;

    try {
      const res = await fetch(`/api/comments?id=${commentId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        await fetchComments();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-zinc-900/50 rounded-lg p-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-zinc-800 rounded-full" />
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-zinc-800 rounded w-32" />
                <div className="h-4 bg-zinc-800 rounded w-full" />
                <div className="h-4 bg-zinc-800 rounded w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
        <MessageCircle className="w-6 h-6 text-blue-500" />
        <h3 className="text-2xl font-bold">
          Comentarios ({comments.length})
        </h3>
      </div>

      {/* New Comment Form */}
      {session ? (
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-6">
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div className="flex gap-4">
                <Avatar className="flex-shrink-0">
                  <AvatarImage src={session.user?.image || ''} />
                  <AvatarFallback>{session.user?.name?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Escribe tu comentario..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="bg-zinc-900 border-zinc-800 min-h-[100px] resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!newComment.trim() || submitting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {submitting ? 'Publicando...' : 'Publicar Comentario'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-6 text-center">
            <p className="text-zinc-400 mb-4">Inicia sesión para comentar</p>
            <Button variant="outline" className="border-zinc-700">
              Iniciar Sesión
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <Card key={comment.id} className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="flex-shrink-0">
                  <AvatarImage src={comment.user.image || ''} />
                  <AvatarFallback>{comment.user.name?.[0] || 'U'}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{comment.user.name || 'Usuario'}</p>
                      <p className="text-xs text-zinc-500">
                        {formatRelativeTime(new Date(comment.createdAt))}
                      </p>
                    </div>
                    {session?.user?.id === comment.user.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(comment.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-950/30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <p className="text-zinc-300 leading-relaxed">{comment.content}</p>

                  <div className="flex items-center gap-4 pt-2">
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-blue-400">
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Me gusta
                    </Button>
                    {session && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyingTo(comment.id)}
                        className="text-zinc-400 hover:text-blue-400"
                      >
                        <Reply className="w-4 h-4 mr-2" />
                        Responder
                      </Button>
                    )}
                  </div>

                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <div className="pt-4 space-y-3 border-t border-zinc-800">
                      <Textarea
                        placeholder="Escribe tu respuesta..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="bg-zinc-900 border-zinc-800"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleReply(comment.id)}
                          disabled={!replyContent.trim() || submitting}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Enviar
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyContent('');
                          }}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="space-y-4 mt-4 pl-12 border-l-2 border-zinc-800">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <Avatar className="flex-shrink-0 w-8 h-8">
                            <AvatarImage src={reply.user.image || ''} />
                            <AvatarFallback className="text-xs">
                              {reply.user.name?.[0] || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-sm">{reply.user.name || 'Usuario'}</p>
                              <p className="text-xs text-zinc-500">
                                {formatRelativeTime(new Date(reply.createdAt))}
                              </p>
                            </div>
                            <p className="text-sm text-zinc-300 mt-1">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {comments.length === 0 && (
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-12 text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
              <p className="text-zinc-400 text-lg">
                Sé el primero en comentar este artículo
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
