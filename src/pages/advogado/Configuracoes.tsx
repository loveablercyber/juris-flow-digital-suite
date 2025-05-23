import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AvailabilityToggle from "@/components/advogado/AvailabilityToggle";

const Configuracoes = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas configurações e preferências
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Atendimento Online</CardTitle>
            <CardDescription>
              Configure sua disponibilidade para atendimento via WhatsApp
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AvailabilityToggle />
          </CardContent>
        </Card>

        {/* Outras configurações podem ser adicionadas aqui */}
      </div>
    </div>
  );
};

export default Configuracoes; 