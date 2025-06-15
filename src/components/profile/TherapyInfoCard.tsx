
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TherapyInfoCardProps {
  profileData: {
    startDate: string;
    currentTherapy: string;
  };
  onInputChange: (field: string, value: string) => void;
  refs: {
    startDate: React.RefObject<HTMLInputElement>;
    currentTherapy: React.RefObject<HTMLButtonElement>;
  };
}

const TherapyInfoCard: FC<TherapyInfoCardProps> = ({
  profileData, onInputChange, refs
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-foreground">Informações da Terapia</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate" className="text-foreground">Data de Início da TH</Label>
          <Input
            id="startDate"
            type="date"
            value={profileData.startDate}
            onChange={(e) => onInputChange('startDate', e.target.value)}
            className="text-foreground"
            ref={refs.startDate}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currentTherapy" className="text-foreground">Terapia Atual</Label>
          <Select value={profileData.currentTherapy} onValueChange={(value) => onInputChange('currentTherapy', value)}>
            <SelectTrigger className="text-foreground" ref={refs.currentTherapy}>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="estrogeno">Estrogênio</SelectItem>
              <SelectItem value="testosterona">Testosterona</SelectItem>
              <SelectItem value="bloqueadores">Bloqueadores</SelectItem>
              <SelectItem value="combinada">Terapia Combinada</SelectItem>
              <SelectItem value="outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default TherapyInfoCard;
