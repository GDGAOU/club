import { useState } from "react";
import { Heart, Share2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAnalytics } from "@/providers/analytics-provider";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
}

interface SocialActionsProps {
  discountId: string;
  initialLikes: number;
  initialComments: Comment[];
  initialUserHasLiked: boolean;
}

export function SocialActions({
  discountId,
  initialLikes,
  initialComments,
  initialUserHasLiked,
}: SocialActionsProps) {
  const { toast } = useToast();
  const { trackShare } = useAnalytics();
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  const [userHasLiked, setUserHasLiked] = useState(initialUserHasLiked);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/discounts/${discountId}/social`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: userHasLiked ? "unlike" : "like",
        }),
      });

      if (response.ok) {
        setUserHasLiked(!userHasLiked);
        setLikes(prev => userHasLiked ? prev - 1 : prev + 1);
      }
    } catch (error) {
      console.error("Error handling like:", error);
      toast({
        title: "Error",
        description: "Failed to process like action",
        variant: "destructive",
      });
    }
  };

  const handleComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/discounts/${discountId}/social`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newComment,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setComments(prev => [data.data, ...prev]);
        setNewComment("");
        toast({
          description: "Comment added successfully",
        });
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async (platform: string) => {
    try {
      // Track share analytics
      trackShare(discountId, platform);

      // Share based on platform
      switch (platform) {
        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?text=Check out this student discount!&url=${encodeURIComponent(
              window.location.href
            )}`,
            "_blank"
          );
          break;
        case "facebook":
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href
            )}`,
            "_blank"
          );
          break;
        case "linkedin":
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              window.location.href
            )}`,
            "_blank"
          );
          break;
        case "copy":
          await navigator.clipboard.writeText(window.location.href);
          toast({
            description: "Link copied to clipboard",
          });
          break;
      }

      // Record share in database
      await fetch(`/api/discounts/${discountId}/social`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform,
        }),
      });
    } catch (error) {
      console.error("Error sharing discount:", error);
      toast({
        title: "Error",
        description: "Failed to share discount",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={userHasLiked ? "default" : "outline"}
        size="sm"
        onClick={handleLike}
      >
        <Heart
          className={`h-4 w-4 mr-1 ${userHasLiked ? "fill-current" : ""}`}
        />
        {likes}
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <MessageCircle className="h-4 w-4 mr-1" />
            {comments.length}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button
                onClick={handleComment}
                disabled={isSubmitting || !newComment.trim()}
              >
                {isSubmitting ? "Posting..." : "Post"}
              </Button>
            </div>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar>
                      <AvatarImage src={comment.user.image} />
                      <AvatarFallback>
                        {comment.user.name?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleShare("twitter")}>
            Share on Twitter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("facebook")}>
            Share on Facebook
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("linkedin")}>
            Share on LinkedIn
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("copy")}>
            Copy Link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
