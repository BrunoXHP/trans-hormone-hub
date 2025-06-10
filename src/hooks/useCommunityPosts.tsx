
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  content: string;
  user_id: string;
  post_id: string;
  created_at: string;
  user_name: string;
  user_avatar: string;
}

interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
  liked: boolean;
  user_id?: string;
}

export const useCommunityPosts = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "Marina Costa",
      avatar: "MC",
      content: "Acabei de começar minha terapia hormonal! Alguém tem dicas para os primeiros meses?",
      timestamp: new Date(2025, 4, 3, 14, 35),
      likes: 24,
      comments: [],
      liked: false
    },
    {
      id: "2",
      author: "Pedro Almeida",
      avatar: "PA",
      content: "Encontrei um grupo de apoio incrível na minha cidade. Estou muito feliz por ter uma comunidade que me entende!",
      timestamp: new Date(2025, 4, 2, 9, 12),
      likes: 18,
      comments: [],
      liked: true
    },
    {
      id: "3",
      author: "Julia Mendes",
      avatar: "JM",
      content: "Alguém aqui já passou pelo processo de retificação de documentos? Estou precisando de orientação sobre os procedimentos.",
      timestamp: new Date(2025, 4, 1, 16, 22),
      likes: 31,
      comments: [],
      liked: false
    }
  ]);
  const [loading, setLoading] = useState(false);
  const { profile } = useAuth();
  const { toast } = useToast();

  // Carregar comentários do banco de dados
  const fetchComments = async () => {
    if (!profile?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('post_comments' as any)
        .select(`
          *,
          profiles:user_id (
            name
          )
        `)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching comments:', error);
        return;
      }

      // Agrupar comentários por post
      const commentsByPost: { [key: string]: Comment[] } = {};
      data?.forEach((comment: any) => {
        if (!commentsByPost[comment.post_id]) {
          commentsByPost[comment.post_id] = [];
        }
        commentsByPost[comment.post_id].push({
          id: comment.id,
          content: comment.content,
          user_id: comment.user_id,
          post_id: comment.post_id,
          created_at: comment.created_at,
          user_name: comment.profiles?.name || 'Usuário',
          user_avatar: comment.profiles?.name?.charAt(0) || 'U'
        });
      });

      // Atualizar posts com comentários
      setPosts(prevPosts => 
        prevPosts.map(post => ({
          ...post,
          comments: commentsByPost[post.id] || []
        }))
      );
    } catch (error) {
      console.error('Unexpected error fetching comments:', error);
    }
  };

  useEffect(() => {
    if (profile?.id) {
      fetchComments();
    }
  }, [profile?.id]);

  const addComment = async (postId: string, content: string) => {
    if (!profile?.id) {
      toast({
        title: "Erro",
        description: "Usuário não autenticado.",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Erro",
        description: "O comentário não pode estar vazio.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('post_comments' as any)
        .insert([{
          content: content.trim(),
          user_id: profile.id,
          post_id: postId,
        }])
        .select(`
          *,
          profiles:user_id (
            name
          )
        `)
        .single();

      if (error) {
        console.error('Error adding comment:', error);
        toast({
          title: "Erro",
          description: "Erro ao adicionar comentário.",
          variant: "destructive",
        });
        return;
      }

      const newComment: Comment = {
        id: data.id,
        content: data.content,
        user_id: data.user_id,
        post_id: data.post_id,
        created_at: data.created_at,
        user_name: data.profiles?.name || 'Usuário',
        user_avatar: data.profiles?.name?.charAt(0) || 'U'
      };

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );

      toast({
        title: "Sucesso",
        description: "Comentário adicionado com sucesso!",
      });
    } catch (error) {
      console.error('Unexpected error adding comment:', error);
    }
  };

  const removeComment = async (commentId: string, postId: string) => {
    try {
      const { error } = await supabase
        .from('post_comments' as any)
        .delete()
        .eq('id', commentId);

      if (error) {
        console.error('Error removing comment:', error);
        toast({
          title: "Erro",
          description: "Erro ao remover comentário.",
          variant: "destructive",
        });
        return;
      }

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, comments: post.comments.filter(comment => comment.id !== commentId) }
            : post
        )
      );

      toast({
        title: "Sucesso",
        description: "Comentário removido com sucesso!",
      });
    } catch (error) {
      console.error('Unexpected error removing comment:', error);
    }
  };

  const createPost = (content: string) => {
    if (!content.trim()) return;
    
    const post: Post = {
      id: Date.now().toString(),
      author: profile?.name || "Você",
      avatar: profile?.name?.charAt(0) || "VC",
      content,
      timestamp: new Date(),
      likes: 0,
      comments: [],
      liked: false,
      user_id: profile?.id
    };
    
    setPosts([post, ...posts]);
  };

  const toggleLike = (id: string) => {
    setPosts(
      posts.map(post => {
        if (post.id === id) {
          return {
            ...post,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked
          };
        }
        return post;
      })
    );
  };

  return {
    posts,
    loading,
    createPost,
    toggleLike,
    addComment,
    removeComment,
  };
};
