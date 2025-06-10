
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Comment {
  id: string;
  content: string;
  user_id: string;
  post_id: string;
  created_at: string;
  user_name: string;
  user_avatar: string;
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onAddComment: (postId: string, content: string) => void;
  onRemoveComment: (commentId: string, postId: string) => void;
}

const CommentSection = ({ postId, comments, onAddComment, onRemoveComment }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const { profile } = useAuth();

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(postId, newComment);
      setNewComment("");
    }
  };

  const handleRemoveComment = (commentId: string) => {
    if (window.confirm('Tem certeza que deseja remover este comentário?')) {
      onRemoveComment(commentId, postId);
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <button 
        className="flex items-center gap-1 text-sm text-muted-foreground mb-4"
        onClick={() => setShowComments(!showComments)}
      >
        <MessageSquare size={18} />
        <span>{comments.length} comentários</span>
      </button>

      {showComments && (
        <div className="space-y-4">
          {/* Lista de comentários */}
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
              <Avatar className="h-8 w-8">
                <div className="bg-primary/10 text-primary h-full w-full flex items-center justify-center text-sm">
                  {comment.user_avatar}
                </div>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{comment.user_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(comment.created_at).toLocaleString()}
                    </p>
                  </div>
                  {profile?.id === comment.user_id && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveComment(comment.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 h-6 w-6 p-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <p className="text-sm mt-1">{comment.content}</p>
              </div>
            </div>
          ))}

          {/* Formulário para novo comentário */}
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <div className="bg-primary/10 text-primary h-full w-full flex items-center justify-center text-sm">
                {profile?.name?.charAt(0) || "VC"}
              </div>
            </Avatar>
            <div className="flex-1">
              <Textarea 
                placeholder="Escreva um comentário..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px] resize-none mb-2"
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleSubmitComment}
                  size="sm"
                  disabled={!newComment.trim()}
                >
                  Comentar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
