
export interface Comment {
  id: string;
  content: string;
  user_id: string;
  post_id: string;
  created_at: string;
  user_name: string;
  user_avatar: string;
}

export interface Post {
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
