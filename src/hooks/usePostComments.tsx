
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles?: {
    name: string;
    email: string;
  } | null;
}

export const usePostComments = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchComments = async () => {
    try {
      console.log('Fetching comments for post:', postId);
      
      const { data, error } = await supabase
        .from('post_comments')
        .select(`
          *,
          profiles (
            name,
            email
          )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching comments:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os comentários.",
          variant: "destructive",
        });
        return;
      }

      console.log('Comments fetched:', data);
      setComments(data || []);
    } catch (error) {
      console.error('Unexpected error fetching comments:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao carregar comentários.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const addComment = async (content: string) => {
    try {
      setSubmitting(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para comentar.",
          variant: "destructive",
        });
        return false;
      }

      console.log('Adding comment for user:', user.id, 'on post:', postId);

      const { data, error } = await supabase
        .from('post_comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          content: content.trim()
        })
        .select(`
          *,
          profiles (
            name,
            email
          )
        `)
        .single();

      if (error) {
        console.error('Error adding comment:', error);
        toast({
          title: "Erro",
          description: "Não foi possível adicionar o comentário.",
          variant: "destructive",
        });
        return false;
      }

      console.log('Comment added successfully:', data);
      
      // Add the new comment to the local state
      setComments(prev => [...prev, data]);
      
      toast({
        title: "Comentário adicionado",
        description: "Seu comentário foi publicado com sucesso.",
      });
      
      return true;
    } catch (error) {
      console.error('Unexpected error adding comment:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao adicionar comentário.",
        variant: "destructive",
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para excluir comentários.",
          variant: "destructive",
        });
        return false;
      }

      console.log('Deleting comment:', commentId, 'by user:', user.id);

      const { error } = await supabase
        .from('post_comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', user.id); // Ensure user can only delete their own comments

      if (error) {
        console.error('Error deleting comment:', error);
        toast({
          title: "Erro",
          description: "Não foi possível excluir o comentário.",
          variant: "destructive",
        });
        return false;
      }

      console.log('Comment deleted successfully');
      
      // Remove the comment from local state
      setComments(prev => prev.filter(comment => comment.id !== commentId));
      
      toast({
        title: "Comentário excluído",
        description: "O comentário foi removido com sucesso.",
      });
      
      return true;
    } catch (error) {
      console.error('Unexpected error deleting comment:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao excluir comentário.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    comments: comments.map(comment => ({
      ...comment,
      author: comment.profiles?.name || 'Usuário',
      email: comment.profiles?.email || ''
    })),
    loading,
    submitting,
    addComment,
    deleteComment,
    refreshComments: fetchComments
  };
};
