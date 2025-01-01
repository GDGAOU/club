"use client";

import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ExclamationTriangleIcon, 
  EyeIcon, 
  EyeSlashIcon,
  ClipboardDocumentIcon,
  TrashIcon,
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  ArrowTopRightOnSquareIcon,
  ClockIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";

export interface Discount {
  id: string;
  title: string;
  description: string;
  code: string;
  link: string;
  category: string;
  discount: string;
  status: keyof typeof STATUS_COLORS;
  expiryDate: string;
  createdAt: string;
  visible: boolean;
  store?: {
    id: string;
    name: string;
    image?: string;
  };
  _count?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

const STATUS_COLORS = {
  active: "bg-green-500/10 text-green-500",
  pending: "bg-yellow-500/10 text-yellow-500",
  expired: "bg-red-500/10 text-red-500",
  draft: "bg-zinc-500/10 text-zinc-500",
};

const STATUS_LABELS = {
  active: "Active",
  pending: "Pending Review",
  expired: "Expired",
  draft: "Draft",
};

interface DiscountCardProps {
  discount: Discount;
  isExpiringSoon: (date: string) => boolean;
  onDelete: (id: string) => void;
}

export function DiscountCard({ discount, isExpiringSoon, onDelete }: DiscountCardProps) {
  const { toast } = useToast();
  const isExpiring = isExpiringSoon(discount.expiryDate);
  const isExpired = new Date(discount.expiryDate) < new Date();
  const expiryText = isExpired 
    ? "Expired" 
    : isExpiring
    ? `Expires in ${Math.ceil((new Date(discount.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days`
    : `Expires ${format(new Date(discount.expiryDate), "MMM d, yyyy")}`;

  return (
    <Card className={cn(
      "relative overflow-hidden border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md",
      !discount.visible && "opacity-60"
    )}>
      <CardHeader className="space-y-4 pb-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <h3 className="text-xl font-bold hover:text-primary cursor-pointer">
                      {discount.title}
                    </h3>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src={discount.store?.image || ''} />
                        <AvatarFallback>{discount.store?.name?.charAt(0) || 'S'}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{discount.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {discount.description}
                        </p>
                        <div className="flex items-center pt-2">
                          <span className="text-xs text-muted-foreground">
                            Posted by {discount.store?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                {discount.store.id === "user" && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 shrink-0 rounded-full"
                          onClick={() => {
                            toast({
                              description: `Discount ${discount.visible ? "hidden" : "visible"} successfully!`,
                            });
                          }}
                        >
                          {discount.visible ? (
                            <EyeIcon className="h-4 w-4" />
                          ) : (
                            <EyeSlashIcon className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {discount.visible ? "Hide Discount" : "Show Discount"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "rounded-full font-medium",
                    STATUS_COLORS[discount.status]
                  )}
                >
                  {STATUS_LABELS[discount.status]}
                </Badge>
                {isExpiring && !isExpired && (
                  <Badge variant="outline" className="gap-1 border-yellow-500 text-yellow-500">
                    <ExclamationTriangleIcon className="h-3 w-3" />
                    Expires Soon
                  </Badge>
                )}
                {isExpired && (
                  <Badge variant="outline" className="gap-1 border-red-500 text-red-500">
                    <ExclamationTriangleIcon className="h-3 w-3" />
                    Expired
                  </Badge>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          navigator.clipboard.writeText(discount.code);
                          toast({
                            description: "Discount code copied to clipboard!",
                          });
                        }}
                      >
                        <ClipboardDocumentIcon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy discount code</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {discount.store.id === "user" ? (
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            onDelete(discount.id);
                            toast({
                              description: "Discount deleted successfully!",
                              variant: "destructive",
                            });
                          }}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      ) : null}
                    </TooltipTrigger>
                    <TooltipContent>Delete discount</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {discount.description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <code className="relative rounded-lg bg-muted px-3 py-1.5 font-mono text-sm font-semibold cursor-pointer hover:bg-muted/70">
                  {discount.code}
                </code>
              </HoverCardTrigger>
              <HoverCardContent side="top" align="center">
                <p className="text-sm font-medium">Click to copy code</p>
              </HoverCardContent>
            </HoverCard>
            <Badge variant="secondary" className="font-mono">
              {discount.discount}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">
              {discount.category}
            </Badge>
            <Badge 
              variant="outline" 
              className={cn(
                "gap-1 whitespace-nowrap",
                isExpiring 
                  ? "border-yellow-500 text-yellow-500" 
                  : isExpired
                  ? "border-red-500 text-red-500"
                  : ""
              )}
            >
              <ClockIcon className="h-3 w-3 shrink-0" />
              {expiryText}
            </Badge>
          </div>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="flex items-center justify-between flex-wrap gap-4 pt-4">
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                  <HandThumbUpIcon className="h-4 w-4" />
                  <span className="font-medium">{discount._count?.likes || 0}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Like this discount</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Separator orientation="vertical" className="h-4" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                  <ChatBubbleLeftIcon className="h-4 w-4" />
                  <span className="font-medium">{discount._count?.comments || 0}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>View comments</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Separator orientation="vertical" className="h-4" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                  <ShareIcon className="h-4 w-4" />
                  <span className="font-medium">{discount._count?.shares || 0}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share discount</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="h-8 gap-1.5"
                asChild
              >
                <Link
                  href={discount.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5"
                >
                  Visit Store
                  <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Open store in new tab</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
