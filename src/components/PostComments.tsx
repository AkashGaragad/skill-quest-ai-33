import { useState, useEffect } from 'react';
import { MessageCircle, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSocialFeatures } from '@/hooks/useSocialFeatures';
import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';

interface PostCommentsProps {
  postId: string;
  commentsCount: number;
}

export const PostComments = ({ postId, commentsCount }: PostCommentsProps) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const { comments, fetchComments, addComment } = useSocialFeatures();
  const { user } = useAuth();

  const postComments = comments[postId] || [];

  useEffect(() => {
    if (showComments && postComments.length === 0) {
      fetchComments(postId);
    }
  }, [showComments, postId, fetchComments, postComments.length]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !user) return;

    await addComment(postId, newComment);
    setNewComment('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowComments(!showComments)}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary p-0"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-medium">{commentsCount}</span>
        <span className="text-sm">
          {showComments ? 'Hide comments' : 'View comments'}
        </span>
      </Button>

      {showComments && (
        <div className="space-y-4 pl-4 border-l-2 border-muted">
          {/* Add new comment */}
          {user && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center text-white text-sm font-semibold">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-2">
                <Textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="min-h-[80px] resize-none"
                />
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Comment
                </Button>
              </div>
            </div>
          )}

          {/* Comments list */}
          <div className="space-y-4">
            {postComments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-foreground">
                      {comment.profiles?.name || 'Unknown User'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {!user && (
            <div className="text-center text-muted-foreground text-sm py-4">
              Please log in to add comments
            </div>
          )}
        </div>
      )}
    </div>
  );
};