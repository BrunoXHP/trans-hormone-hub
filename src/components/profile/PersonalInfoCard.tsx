
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AvatarSection from "./AvatarSection";

interface PersonalInfoCardProps {
  profileData: {
    avatar: string;
    name: string;
    email: string;
    gender: string;
    birthdate: string;
    phone: string;
  };
  onInputChange: (field: string, value: string) => void;
  onAvatarClick: () => void;
  refs: {
    name: React.RefObject<HTMLInputElement>;
    email: React.RefObject<HTMLInputElement>;
    gender: React.RefObject<HTMLButtonElement>;
    birthdate: React.RefObject<HTMLInputElement>;
    phone: React.RefObject<HTMLInputElement>;
    avatar: React.RefObject<HTMLDivElement>;
  };
}

const PersonalInfoCard: FC<PersonalInfoCardProps> = ({
  profileData, onInputChange, onAvatarClick, refs
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-foreground">Informações Pessoais</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <AvatarSection
        avatarUrl={profileData.avatar}
        name={profileData.name}
        onAvatarClick={onAvatarClick}
        divRef={refs.avatar}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">Nome Completo</Label>
          <Input
            id="name"
            value={profileData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            placeholder="Seu nome completo"
            className="text-foreground"
            ref={refs.name}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">Email</Label>
          <Input
            id="email"
            type="email"
            value={profileData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            placeholder="seu@email.com"
            className="text-foreground"
            ref={refs.email}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-foreground">Identidade de Gênero</Label>
          <Select value={profileData.gender} onValueChange={(value) => onInputChange('gender', value)}>
            <SelectTrigger className="text-foreground" ref={refs.gender}>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mulher-trans">Mulher Trans</SelectItem>
              <SelectItem value="homem-trans">Homem Trans</SelectItem>
              <SelectItem value="nao-binario">Não-binário</SelectItem>
              <SelectItem value="outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthdate" className="text-foreground">Data de Nascimento</Label>
          <Input
            id="birthdate"
            type="date"
            value={profileData.birthdate}
            onChange={(e) => onInputChange('birthdate', e.target.value)}
            className="text-foreground"
            ref={refs.birthdate}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-foreground">Telefone</Label>
        <Input
          id="phone"
          type="tel"
          value={profileData.phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
          placeholder="(11) 99999-9999"
          className="text-foreground"
          ref={refs.phone}
        />
      </div>
    </CardContent>
  </Card>
);

export default PersonalInfoCard;
