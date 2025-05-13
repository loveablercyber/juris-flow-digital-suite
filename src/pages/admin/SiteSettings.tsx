
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save, Upload, Globe, Moon, Sun, Image, PaintBucket, Languages, Mail } from "lucide-react";
import MockActionButton from "@/components/admin/MockActionButton";

const SiteSettings = () => {
  const [colorMode, setColorMode] = useState<'light' | 'dark' | 'system'>('light');
  
  const handleColorModeChange = (value: string) => {
    setColorMode(value as 'light' | 'dark' | 'system');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Configurações do Site</h1>
        <MockActionButton action="Salvar Todas as Alterações" />
      </div>
      
      <Tabs defaultValue="general">
        <div className="flex overflow-auto pb-2">
          <TabsList className="h-9">
            <TabsTrigger value="general" className="text-sm">
              Geral
            </TabsTrigger>
            <TabsTrigger value="appearance" className="text-sm">
              Aparência
            </TabsTrigger>
            <TabsTrigger value="contact" className="text-sm">
              Contato
            </TabsTrigger>
            <TabsTrigger value="social" className="text-sm">
              Redes Sociais
            </TabsTrigger>
            <TabsTrigger value="integrations" className="text-sm">
              Integrações
            </TabsTrigger>
            <TabsTrigger value="advanced" className="text-sm">
              Avançado
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Site</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="site-name">Nome do Site</Label>
                  <Input id="site-name" defaultValue="ADVOCACIALEX" />
                </div>
                <div>
                  <Label htmlFor="site-url">URL do Site</Label>
                  <Input id="site-url" defaultValue="https://advocacialex.com" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="site-description">Descrição do Site</Label>
                <Textarea 
                  id="site-description" 
                  rows={3} 
                  defaultValue="Escritório de advocacia especializado com atendimento personalizado em diversas áreas do direito. Consulta gratuita disponível."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="time-zone">Fuso Horário</Label>
                  <Select defaultValue="america-sao_paulo">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o fuso horário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-sao_paulo">América/São Paulo (GMT-3)</SelectItem>
                      <SelectItem value="america-brasilia">América/Brasília (GMT-3)</SelectItem>
                      <SelectItem value="america-manaus">América/Manaus (GMT-4)</SelectItem>
                      <SelectItem value="america-rio_branco">América/Rio Branco (GMT-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date-format">Formato de Data</Label>
                  <Select defaultValue="dd/mm/yyyy">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o formato de data" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="maintenance-mode" />
                <Label htmlFor="maintenance-mode">Modo de Manutenção</Label>
              </div>
              
              <div className="flex justify-end">
                <MockActionButton action="Salvar Informações" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Logos e Favicon</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Logo Principal</Label>
                <div className="border border-dashed border-gray-300 rounded-md p-6 text-center mt-2">
                  <div className="h-24 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">logo-header.png</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Upload className="h-4 w-4 mr-2" />
                    Alterar Logo
                  </Button>
                </div>
              </div>
              
              <div>
                <Label>Logo Rodapé (Versão Alternativa)</Label>
                <div className="border border-dashed border-gray-300 rounded-md p-6 text-center mt-2">
                  <div className="h-24 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">logo-footer.png</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Upload className="h-4 w-4 mr-2" />
                    Alterar Logo
                  </Button>
                </div>
              </div>
              
              <div>
                <Label>Favicon</Label>
                <div className="border border-dashed border-gray-300 rounded-md p-6 text-center mt-2">
                  <div className="h-16 w-16 mx-auto bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">favicon.png</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Upload className="h-4 w-4 mr-2" />
                    Alterar Favicon
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <MockActionButton action="Salvar Imagens" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tema e Cores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Esquema de Cores</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div 
                    className="border-2 border-primary rounded-md p-4 flex flex-col items-center cursor-pointer bg-card"
                  >
                    <div className="flex space-x-2 mb-3">
                      <div className="h-6 w-6 rounded-full bg-primary"></div>
                      <div className="h-6 w-6 rounded-full bg-secondary"></div>
                    </div>
                    <span className="text-sm font-medium">Padrão</span>
                  </div>
                  
                  <div 
                    className="border border-input rounded-md p-4 flex flex-col items-center cursor-pointer bg-card"
                  >
                    <div className="flex space-x-2 mb-3">
                      <div className="h-6 w-6 rounded-full bg-blue-600"></div>
                      <div className="h-6 w-6 rounded-full bg-blue-300"></div>
                    </div>
                    <span className="text-sm font-medium">Azul</span>
                  </div>
                  
                  <div 
                    className="border border-input rounded-md p-4 flex flex-col items-center cursor-pointer bg-card"
                  >
                    <div className="flex space-x-2 mb-3">
                      <div className="h-6 w-6 rounded-full bg-green-600"></div>
                      <div className="h-6 w-6 rounded-full bg-green-300"></div>
                    </div>
                    <span className="text-sm font-medium">Verde</span>
                  </div>
                  
                  <div 
                    className="border border-input rounded-md p-4 flex flex-col items-center cursor-pointer bg-card"
                  >
                    <div className="flex space-x-2 mb-3">
                      <div className="h-6 w-6 rounded-full bg-purple-600"></div>
                      <div className="h-6 w-6 rounded-full bg-purple-300"></div>
                    </div>
                    <span className="text-sm font-medium">Roxo</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Cores Personalizadas</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="primary-color" className="text-xs">Cor Principal</Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <div className="h-6 w-6 rounded bg-primary"></div>
                      <Input id="primary-color" defaultValue="#1E40AF" className="flex-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondary-color" className="text-xs">Cor Secundária</Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <div className="h-6 w-6 rounded bg-secondary"></div>
                      <Input id="secondary-color" defaultValue="#6B7280" className="flex-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="accent-color" className="text-xs">Cor de Destaque</Label>
                    <div className="flex items-center mt-1 space-x-2">
                      <div className="h-6 w-6 rounded bg-accent"></div>
                      <Input id="accent-color" defaultValue="#F3F4F6" className="flex-1" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Modo de Cores</Label>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="light-mode" 
                      name="color-mode" 
                      checked={colorMode === 'light'} 
                      onChange={() => handleColorModeChange('light')}
                    />
                    <Label htmlFor="light-mode" className="flex items-center">
                      <Sun className="h-4 w-4 mr-2" />
                      Modo Claro
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="dark-mode" 
                      name="color-mode" 
                      checked={colorMode === 'dark'} 
                      onChange={() => handleColorModeChange('dark')}
                    />
                    <Label htmlFor="dark-mode" className="flex items-center">
                      <Moon className="h-4 w-4 mr-2" />
                      Modo Escuro
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="system-mode" 
                      name="color-mode" 
                      checked={colorMode === 'system'} 
                      onChange={() => handleColorModeChange('system')}
                    />
                    <Label htmlFor="system-mode" className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Seguir Configuração do Sistema
                    </Label>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-2">
                  <Switch id="allow-user-toggle" defaultChecked />
                  <Label htmlFor="allow-user-toggle">Permitir que usuários alternem entre modos</Label>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="custom-font" />
                <Label htmlFor="custom-font">Usar fonte personalizada</Label>
              </div>
              
              <div className="flex justify-end">
                <MockActionButton action="Salvar Aparência" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Layout e Componentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-announcement">Banner de Anúncios</Label>
                  <Switch id="show-announcement" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-breadcrumbs">Breadcrumbs</Label>
                  <Switch id="show-breadcrumbs" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-cookie-banner">Banner de Cookies</Label>
                  <Switch id="show-cookie-banner" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-whatsapp">Botão do WhatsApp</Label>
                  <Switch id="show-whatsapp" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-back-to-top">Botão "Voltar ao Topo"</Label>
                  <Switch id="show-back-to-top" defaultChecked />
                </div>
              </div>
              
              <div className="flex justify-end">
                <MockActionButton action="Salvar Layout" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Principal</Label>
                  <Input id="email" defaultValue="contato@advocacialex.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone Principal</Label>
                  <Input id="phone" defaultValue="(11) 3456-7890" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input id="whatsapp" defaultValue="(11) 91234-5678" />
                </div>
                <div>
                  <Label htmlFor="attendance-hours">Horário de Atendimento</Label>
                  <Input id="attendance-hours" defaultValue="Segunda a Sexta, 9h às 18h" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Endereço</Label>
                <Textarea 
                  id="address" 
                  rows={3} 
                  defaultValue="Av. Paulista, 1000, Conjunto 101
Bela Vista, São Paulo - SP
CEP: 01310-000"
                />
              </div>
              
              <div className="flex justify-end">
                <MockActionButton action="Salvar Contato" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Formulários de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email de Notificação</h3>
                  <p className="text-sm text-muted-foreground">Email que receberá as notificações dos formulários</p>
                </div>
                <Input className="w-64" defaultValue="contato@advocacialex.com" />
              </div>
              
              <div className="space-y-2">
                <Label>Campos Obrigatórios</Label>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="req-name" defaultChecked />
                    <Label htmlFor="req-name">Nome</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="req-email" defaultChecked />
                    <Label htmlFor="req-email">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="req-phone" defaultChecked />
                    <Label htmlFor="req-phone">Telefone</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="req-subject" />
                    <Label htmlFor="req-subject">Assunto</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="req-message" defaultChecked />
                    <Label htmlFor="req-message">Mensagem</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="captcha" defaultChecked />
                <Label htmlFor="captcha">Ativar CAPTCHA nos formulários</Label>
              </div>
              
              <div className="flex justify-end">
                <MockActionButton action="Salvar Configurações" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" defaultValue="https://facebook.com/advocacialex" />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" defaultValue="https://instagram.com/advocacialex" />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input id="linkedin" defaultValue="https://linkedin.com/company/advocacialex" />
              </div>
              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <Input id="twitter" defaultValue="https://twitter.com/advocacialex" />
              </div>
              <div>
                <Label htmlFor="youtube">YouTube</Label>
                <Input id="youtube" defaultValue="https://youtube.com/advocacialex" />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="show-social-header" defaultChecked />
                <Label htmlFor="show-social-header">Exibir ícones no cabeçalho</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="show-social-footer" defaultChecked />
                <Label htmlFor="show-social-footer">Exibir ícones no rodapé</Label>
              </div>
              
              <div className="flex justify-end">
                <MockActionButton action="Salvar Redes Sociais" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integrações e APIs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Google Analytics</h3>
                    <p className="text-sm text-muted-foreground">Integração para análise de tráfego do site</p>
                  </div>
                  <Switch id="ga-integration" defaultChecked />
                </div>
                <Input placeholder="ID de acompanhamento (ex: G-XXXXXXXXXX)" defaultValue="G-ABC123XYZ" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Google Tag Manager</h3>
                    <p className="text-sm text-muted-foreground">Gerenciamento centralizado de tags</p>
                  </div>
                  <Switch id="gtm-integration" />
                </div>
                <Input placeholder="ID do container (ex: GTM-XXXXXX)" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Facebook Pixel</h3>
                    <p className="text-sm text-muted-foreground">Rastreamento de conversões do Facebook</p>
                  </div>
                  <Switch id="fb-pixel" defaultChecked />
                </div>
                <Input placeholder="ID do Pixel (ex: XXXXXXXXXX)" defaultValue="123456789012345" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">RD Station</h3>
                    <p className="text-sm text-muted-foreground">Integração para marketing e automação</p>
                  </div>
                  <Switch id="rd-integration" defaultChecked />
                </div>
                <Input placeholder="Token de Integração" defaultValue="••••••••••••••••••••" type="password" />
              </div>
              
              <div className="flex justify-end">
                <MockActionButton action="Salvar Integrações" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Avançadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Idiomas</Label>
                <div className="flex items-center justify-between border p-3 rounded-md">
                  <div className="flex items-center gap-2">
                    <Languages className="h-5 w-5" />
                    <span>Português (Brasil)</span>
                    <Badge>Padrão</Badge>
                  </div>
                  <Switch defaultChecked disabled />
                </div>
                
                <div className="flex items-center justify-between border p-3 rounded-md">
                  <div className="flex items-center gap-2">
                    <Languages className="h-5 w-5" />
                    <span>English</span>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between border p-3 rounded-md">
                  <div className="flex items-center gap-2">
                    <Languages className="h-5 w-5" />
                    <span>Español</span>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Cache do Site</Label>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Ativar cache para melhorar o desempenho</p>
                    <p className="text-xs text-muted-foreground">Última limpeza: 13/05/2025 às 10:30</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Limpar Cache</Button>
                    <Switch id="enable-cache" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="robots-txt">Arquivo Robots.txt</Label>
                <Textarea 
                  id="robots-txt" 
                  rows={5}
                  className="font-mono text-sm"
                  defaultValue={`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /wp-admin/
Sitemap: https://advocacialex.com/sitemap.xml`}
                />
              </div>
              
              <div className="space-y-3">
                <Label>Código Personalizado</Label>
                <Tabs defaultValue="header">
                  <TabsList className="w-full">
                    <TabsTrigger className="flex-1" value="header">Header</TabsTrigger>
                    <TabsTrigger className="flex-1" value="footer">Footer</TabsTrigger>
                  </TabsList>
                  <TabsContent value="header" className="pt-2">
                    <Textarea 
                      rows={5}
                      className="font-mono text-sm"
                      placeholder="Insira código personalizado para o cabeçalho (head) da página"
                    />
                  </TabsContent>
                  <TabsContent value="footer" className="pt-2">
                    <Textarea 
                      rows={5}
                      className="font-mono text-sm"
                      placeholder="Insira código personalizado para o rodapé da página"
                    />
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="flex justify-end">
                <MockActionButton action="Salvar Configurações Avançadas" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteSettings;
