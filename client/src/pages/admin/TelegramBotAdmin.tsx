import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  Bot, 
  Users, 
  Send, 
  Settings, 
  MessageSquare, 
  ExternalLink,
  Copy,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface TelegramStats {
  subscribers: number;
  botUsername: string;
  channelId: string;
  isActive: boolean;
}

const TelegramBotAdmin: React.FC = () => {
  const [stats, setStats] = useState<TelegramStats>({
    subscribers: 0,
    botUsername: '@portaldenoticias_bot',
    channelId: '-3116123281',
    isActive: false
  });
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const botUrl = 'https://t.me/portaldenoticias_bot';
  const botToken = '8260637487:AAF7pnwUFHI6XJdnrClXoYg4dxSl6OqUW-Y';
  const channelUrl = 'https://web.telegram.org/k/#-3116123281';

  useEffect(() => {
    // Simular carga de estadísticas
    setStats({
      subscribers: 0,
      botUsername: '@capitansparrowia_bot',
      isActive: true
    });
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    try {
      // Aquí iría la llamada a la API para enviar el mensaje
      console.log('Enviando mensaje:', message);
      
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMessage('');
      alert('Mensaje enviado exitosamente a todos los suscriptores');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error al enviar el mensaje');
    } finally {
      setIsSending(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bot className="h-8 w-8 text-blue-500" />
            Telegram Bot Admin
          </h1>
          <p className="text-muted-foreground">
            Gestiona el bot de Telegram para notificaciones automáticas
          </p>
        </div>
        <Badge variant={stats.isActive ? "default" : "destructive"} className="text-sm">
          {stats.isActive ? "Activo" : "Inactivo"}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suscriptores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.subscribers}</div>
            <p className="text-xs text-muted-foreground">
              Usuarios suscritos a notificaciones
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bot Username</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{stats.botUsername}</div>
            <p className="text-xs text-muted-foreground">
              Nombre del bot en Telegram
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Canal</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">-3116123281</div>
            <p className="text-xs text-muted-foreground">
              Canal de noticias automáticas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bot Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Información del Bot
          </CardTitle>
          <CardDescription>
            Detalles de configuración y enlaces del bot
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bot-url">URL del Bot</Label>
              <div className="flex gap-2">
                <Input 
                  id="bot-url" 
                  value={botUrl} 
                  readOnly 
                  className="font-mono text-sm"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyToClipboard(botUrl)}
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(botUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="bot-token">Token del Bot</Label>
              <div className="flex gap-2">
                <Input 
                  id="bot-token" 
                  value={botToken} 
                  readOnly 
                  className="font-mono text-sm"
                  type="password"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyToClipboard(botToken)}
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="channel-url">Canal de Telegram</Label>
              <div className="flex gap-2">
                <Input 
                  id="channel-url" 
                  value={channelUrl} 
                  readOnly 
                  className="font-mono text-sm"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyToClipboard(channelUrl)}
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(channelUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Comandos del Bot</h4>
            <div className="bg-muted p-4 rounded-lg">
              <div className="space-y-2 text-sm font-mono">
                <div><span className="text-blue-600">/start</span> - Mensaje de bienvenida</div>
                <div><span className="text-blue-600">/noticias</span> - Últimas 5 noticias</div>
                <div><span className="text-blue-600">/suscribir</span> - Suscribirse a notificaciones</div>
                <div><span className="text-blue-600">/desuscribir</span> - Desuscribirse</div>
                <div><span className="text-blue-600">/ayuda</span> - Mostrar ayuda</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Send Message */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Enviar Mensaje a Suscriptores
          </CardTitle>
          <CardDescription>
            Envía un mensaje personalizado a todos los usuarios suscritos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="message">Mensaje</Label>
            <Textarea
              id="message"
              placeholder="Escribe tu mensaje aquí..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              El mensaje se enviará a {stats.subscribers} suscriptores
            </p>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim() || isSending}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              {isSending ? 'Enviando...' : 'Enviar Mensaje'}
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setMessage('')}
              disabled={!message.trim()}
            >
              Limpiar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Instrucciones de Uso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Para usuarios:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Busca @capitansparrowia_bot en Telegram</li>
                <li>Envía /start para comenzar</li>
                <li>Usa /suscribir para recibir notificaciones</li>
                <li>Usa /noticias para ver las últimas noticias</li>
              </ol>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Para administradores:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>El bot se conecta automáticamente al iniciar el servidor</li>
                <li>Las notificaciones se envían automáticamente al publicar noticias</li>
                <li>Usa el formulario arriba para enviar mensajes personalizados</li>
                <li>Monitorea las estadísticas de suscriptores</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { TelegramBotAdmin };
export default TelegramBotAdmin;
