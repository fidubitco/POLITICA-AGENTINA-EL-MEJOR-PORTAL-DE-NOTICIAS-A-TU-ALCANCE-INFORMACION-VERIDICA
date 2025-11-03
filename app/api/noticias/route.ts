import { NextRequest, NextResponse } from 'next/server';
import { supabaseHelpers } from '@/lib/supabase';

// GET /api/noticias - Obtener todas las noticias
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || undefined;
    const status = searchParams.get('status') || undefined;
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const { data, error } = await supabaseHelpers.getNoticias({
      category,
      status,
      limit,
      offset,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      count: data?.length || 0,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener noticias' },
      { status: 500 }
    );
  }
}

// POST /api/noticias - Crear nueva noticia
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validación básica
    if (!body.title || !body.excerpt || !body.content) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Generar slug del título
    const slug = body.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const noticiaData = {
      ...body,
      slug: body.slug || slug,
      views: 0,
      status: body.status || 'draft',
      is_breaking: body.is_breaking || false,
      published_at: body.status === 'published' ? new Date().toISOString() : null,
    };

    const { data, error } = await supabaseHelpers.createNoticia(noticiaData);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Noticia creada exitosamente',
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear noticia' },
      { status: 500 }
    );
  }
}

