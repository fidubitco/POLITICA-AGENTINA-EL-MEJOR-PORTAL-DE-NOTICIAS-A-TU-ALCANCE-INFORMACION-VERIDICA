import { ImageResponse } from 'next/og';
import { writeFileSync } from 'fs';
import { join } from 'path';

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcon(size: number) {
  const response = new ImageResponse(
    (
      <div
        style={{
          fontSize: size * 0.5,
          background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        PA
      </div>
    ),
    {
      width: size,
      height: size,
    }
  );

  const buffer = await response.arrayBuffer();
  const path = join(process.cwd(), 'public', 'icons', `icon-${size}x${size}.png`);
  writeFileSync(path, Buffer.from(buffer));
  console.log(`✅ Generated: icon-${size}x${size}.png`);
}

async function main() {
  console.log('🎨 Generating PWA icons...\n');

  for (const size of sizes) {
    await generateIcon(size);
  }

  console.log('\n✅ All icons generated successfully!');
}

main().catch(console.error);
