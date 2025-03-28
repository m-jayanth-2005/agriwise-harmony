
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Check, Clock } from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

interface PostAuthor {
  id: string;
  name: string;
  avatar?: string;
  isExpert?: boolean;
}

interface Comment {
  id: string;
  author: PostAuthor;
  content: string;
  createdAt: Date;
  isVerified?: boolean;
  likes: number;
}

interface Post {
  id: string;
  author: PostAuthor;
  title: string;
  content: string;
  createdAt: Date;
  tags: string[];
  likes: number;
  comments: Comment[];
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const toggleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start gap-4 pb-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={post.author.avatar} alt={post.author.name} />
          <AvatarFallback className="bg-soil-light text-soil-darker">
            {post.author.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{post.author.name}</span>
            {post.author.isExpert && (
              <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs py-0">Expert</Badge>
            )}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {formatDistanceToNow(post.createdAt, { addSuffix: true })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <h3 className="font-medium text-lg mb-2">{post.title}</h3>
        <p className={`text-sm text-muted-foreground ${!isExpanded && 'line-clamp-3'}`}>
          {post.content}
        </p>
        {post.content.length > 150 && (
          <Button
            variant="link"
            className="p-0 h-auto text-xs text-muted-foreground hover:text-primary"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show less" : "Read more"}
          </Button>
        )}
        <div className="flex flex-wrap gap-1 mt-3">
          {post.tags.map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs py-0.5">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex items-center justify-between">
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 ${liked ? 'text-primary' : ''}`}
            onClick={toggleLike}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{likeCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments.length}</span>
          </Button>
        </div>
      </CardFooter>

      {showComments && post.comments.length > 0 && (
        <div className="border-t px-6 py-3 space-y-3">
          <h4 className="text-sm font-medium">Comments</h4>
          {post.comments.map((comment, i) => (
            <div key={i} className="flex gap-3 pb-3 border-b last:border-b-0 last:pb-0">
              <Avatar className="h-7 w-7">
                <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                <AvatarFallback className="text-xs bg-soil-light text-soil-darker">
                  {comment.author.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{comment.author.name}</span>
                  {comment.author.isExpert && (
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs py-0">Expert</Badge>
                  )}
                  {comment.isVerified && (
                    <Badge variant="outline" className="bg-green-100 text-green-800 text-xs py-0 flex items-center gap-0.5">
                      <Check className="h-3 w-3" /> Verified
                    </Badge>
                  )}
                </div>
                <p className="text-sm mt-1">{comment.content}</p>
                <div className="flex items-center text-xs text-muted-foreground mt-1 gap-3">
                  <span>{formatDistanceToNow(comment.createdAt, { addSuffix: true })}</span>
                  <Button variant="ghost" size="sm" className="p-0 h-5">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    <span>{comment.likes}</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default PostCard;
