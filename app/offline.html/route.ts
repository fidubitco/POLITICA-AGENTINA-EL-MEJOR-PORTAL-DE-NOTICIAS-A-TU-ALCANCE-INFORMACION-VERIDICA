export async function GET() {
  return new Response(
    `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sin Conexión - Política Argentina</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: linear-gradient(135deg, #09090b 0%, #18181b 100%);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      text-align: center;
      max-width: 500px;
    }
    .icon {
      width: 120px;
      height: 120px;
      margin: 0 auto 32px;
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
    }
    h1 {
      font-size: 32px;
      font-weight: 900;
      margin-bottom: 16px;
      background: linear-gradient(to right, #ffffff, #a1a1aa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    p {
      font-size: 18px;
      color: #a1a1aa;
      line-height: 1.6;
      margin-bottom: 32px;
    }
    button {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      color: white;
      border: none;
      padding: 16px 32px;
      font-size: 16px;
      font-weight: 700;
      border-radius: 12px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    button:hover {
      transform: translateY(-2px);
    }
    button:active {
      transform: translateY(0);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">📡</div>
    <h1>Sin Conexión</h1>
    <p>No hay conexión a internet. Por favor verifica tu conexión y vuelve a intentar.</p>
    <button onclick="window.location.reload()">
      Reintentar
    </button>
  </div>
</body>
</html>`,
    {
      headers: {
        'Content-Type': 'text/html',
      },
    }
  );
}
