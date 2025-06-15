
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePostComments } from "./usePostComments";
import { Comment, Post } from "./types/communityPostTypes";

export const useCommunityPosts = () => {
  const { profile } = useAuth();
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

  // Funções de comentário separadas
  const { fetchComments, addComment: addCommentDb, removeComment: removeCommentDb } = usePostComments({
    profileId: profile?.id,
    onCommentsFetched: (commentsByPost) =>
      setPosts((prev) =>
        prev.map((post) => ({
          ...post,
          comments: commentsByPost[post.id] || [],
        }))
      ),
    onCommentAdded: (postId, newComment) =>
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      ),
    onCommentRemoved: (postId, commentId) =>
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments.filter((c) => c.id !== commentId),
              }
            : post
        )
      ),
  });

  useEffect(() => {
    if (profile?.id) {
      fetchComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id]);

  const addComment = (postId: string, content: string) => {
    if (!profile?.id) return;
    addCommentDb(postId, content, profile);
  };

  const removeComment = (commentId: string, postId: string) => {
    removeCommentDb(commentId, postId);
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
      user_id: profile?.id,
    };

    setPosts([post, ...posts]);
  };

  const toggleLike = (id: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked,
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
