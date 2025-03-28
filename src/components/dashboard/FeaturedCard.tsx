
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface FeaturedCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
  bgColor?: string;
  className?: string;
}

const FeaturedCard = ({
  title,
  description,
  icon,
  linkTo,
  bgColor = "bg-card",
  className,
}: FeaturedCardProps) => {
  return (
    <Card className={cn("h-full group hover:shadow-lg transition-all duration-300", bgColor, className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-muted-foreground mb-4">
          {description}
        </CardDescription>
        <Button asChild variant="outline" className="w-full mt-2 group-hover:border-primary group-hover:text-primary transition-colors">
          <Link to={linkTo}>
            Explore
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeaturedCard;
