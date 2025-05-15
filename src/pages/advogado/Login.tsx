
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const AdvogadoLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication
    if (username === "advogado" && password === "senha123") {
      // Store mock token in localStorage
      localStorage.setItem("advogadoToken", "mock-token-adv-123");
      localStorage.setItem("advogadoUser", JSON.stringify({
        name: "Dr. João Silva",
        role: "advogado",
        oab: "OAB/SP 123456",
        area: "Direito Civil"
      }));
      
      toast({
        title: "Login bem-sucedido",
        description: "Bem-vindo ao painel do advogado",
      });
      
      navigate("/advogado/dashboard");
    } else {
      toast({
        title: "Falha no login",
        description: "Credenciais inválidas. Tente advogado/senha123",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Painel do Advogado</CardTitle>
          <CardDescription className="text-center">
            Entre com suas credenciais para acessar o painel do escritório
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-sm text-gray-500">
              <p>Credenciais de demonstração:</p>
              <p>Usuário: advogado</p>
              <p>Senha: senha123</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Entrar</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdvogadoLogin;
