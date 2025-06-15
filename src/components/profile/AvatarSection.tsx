
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface AvatarSectionProps {
  avatarUrl: string | undefined;
  name: string | undefined;
  onAvatarClick: () => void;
  divRef?: React.RefObject<HTMLDivElement>;
}

const AvatarSection: FC<AvatarSectionProps> = ({
  avatarUrl, name, onAvatarClick, divRef
}) => (
  <div className="flex flex-col items-center pb-2" ref={divRef}>
    <div className="relative">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatarUrl || undefined} />
        <AvatarFallback className="text-2xl bg-primary/20 text-primary">
          {name ? name.charAt(0).toUpperCase() : "?"}
        </AvatarFallback>
      </Avatar>
      <Button
        size="icon"
        variant="outline"
        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
        onClick={onAvatarClick}
        type="button"
      >
        <Camera className="h-4 w-4" />
      </Button>
    </div>
    <p className="text-sm text-muted-foreground text-center mt-2">
      Clique no ícone da câmera para alterar sua foto
    </p>
  </div>
);

export default AvatarSection;
