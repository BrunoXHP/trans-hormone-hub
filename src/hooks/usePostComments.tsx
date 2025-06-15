
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Comment } from "./types/communityPostTypes";
import { useAuth } from "@/hooks/useAuth";

export const usePostComments = ({
  profileId,
  onCommentsFetched,
  onCommentAdded,
  onCommentRemoved,
}: {
  profileId: string | undefined;
  onCommentsFetched?: (commentsByPost: { [key: string]: Comment[] }) => void;
  onCommentAdded?: (postId: string, comment: Comment) => void;
  onCommentRemoved?: (postId: string, commentId: string) => void;
}) => {
  const { toast } = useToast();

  // Carregar comentários do banco de dados
  const fetchComments = async () => {
    if (!profileId) return;
    try {
      const { data, error } = await supabase
        .from('post_comments')
        .select(`
          *,
          profiles!user_id (
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
        const user_name =
          comment.profiles && typeof comment.profiles === "object" && comment.profiles && "name" in comment.profiles && comment.profiles.name
            ? comment.profiles.name
            : "Usuário";
        const user_avatar = user_name ? user_name.charAt(0) : "U";

        if (!commentsByPost[comment.post_id]) {
          commentsByPost[comment.post_id] = [];
        }
        commentsByPost[comment.post_id].push({
          id: comment.id,
          content: comment.content,
          user_id: comment.user_id,
          post_id: comment.post_id,
          created_at: comment.created_at,
          user_name,
          user_avatar,
        });
      });

      onCommentsFetched && onCommentsFetched(commentsByPost);
    } catch (error) {
      console.error("Unexpected error fetching comments:", error);
    }
  };

  const addComment = async (postId: string, content: string, profile: { id: string, name?: string }) => {
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
        .from("post_comments")
        .insert([
          {
            content: content.trim(),
            user_id: profile.id,
            post_id: postId,
          },
        ])
        .select(
          `
          *,
          profiles!user_id (
            name
          )
        `
        )
        .maybeSingle();

      if (error || !data) {
        console.error("Error adding comment:", error);
        toast({
          title: "Erro",
          description: "Erro ao adicionar comentário.",
          variant: "destructive",
        });
        return;
      }

      const user_name =
        data.profiles && typeof data.profiles === "object" && data.profiles && "name" in data.profiles && data.profiles.name
          ? data.profiles.name
          : "Usuário";
      const user_avatar = user_name ? user_name.charAt(0) : "U";

      const newComment: Comment = {
        id: data.id,
        content: data.content,
        user_id: data.user_id,
        post_id: data.post_id,
        created_at: data.created_at,
        user_name,
        user_avatar,
      };
      onCommentAdded && onCommentAdded(postId, newComment);
      toast({
        title: "Sucesso",
        description: "Comentário adicionado com sucesso!",
      });
    } catch (error) {
      console.error("Unexpected error adding comment:", error);
    }
  };

  const removeComment = async (commentId: string, postId: string) => {
    try {
      const { error } = await supabase
        .from("post_comments" as any)
        .delete()
        .eq("id", commentId);

      if (error) {
        console.error("Error removing comment:", error);
        toast({
          title: "Erro",
          description: "Erro ao remover comentário.",
          variant: "destructive",
        });
        return;
      }
      onCommentRemoved && onCommentRemoved(postId, commentId);

      toast({
        title: "Sucesso",
        description: "Comentário removido com sucesso!",
      });
    } catch (error) {
      console.error("Unexpected error removing comment:", error);
    }
  };

  return {
    fetchComments,
    addComment,
    removeComment,
  };
};
