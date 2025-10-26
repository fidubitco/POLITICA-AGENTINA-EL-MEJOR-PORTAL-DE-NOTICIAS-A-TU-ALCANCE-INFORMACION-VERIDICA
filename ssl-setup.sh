#!/bin/bash

# 🔒 CONFIGURACIÓN SSL CON LET'S ENCRYPT
# Portal de Noticias Profesional - Política Argentina

# Instalar Certbot
sudo apt update
sudo apt install -y certbot python3-certbot-nginx

# Obtener certificado SSL
sudo certbot --nginx -d politicaargentina.com -d www.politicaargentina.com

# Configurar renovación automática
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo crontab -

echo "✅ SSL configurado exitosamente"
