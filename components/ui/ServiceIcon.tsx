import {
  Bot,
  Globe,
  Palette,
  Search,
  Share2,
  Target,
  Video,
  type LucideIcon,
} from "lucide-react";

export type ServiceIconId =
  | "social"
  | "video"
  | "web"
  | "ai"
  | "brand"
  | "ads"
  | "seo";

const ICONS: Record<ServiceIconId, LucideIcon> = {
  social: Share2,
  video: Video,
  web: Globe,
  ai: Bot,
  brand: Palette,
  ads: Target,
  seo: Search,
};

type ServiceIconProps = {
  id: ServiceIconId;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export function ServiceIcon({
  id,
  size = 16,
  strokeWidth = 2,
  className = "",
}: ServiceIconProps) {
  const Icon = ICONS[id];
  return (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    />
  );
}
