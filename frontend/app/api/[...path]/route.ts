import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

async function forwardToBackend(request: NextRequest, { params }: { params: { path: string[] } }) {
  const backendBase = process.env.BACKEND_URL;
  if (!backendBase) {
    return NextResponse.json(
      { error: 'BACKEND_URL service binding is not configured' },
      { status: 500 }
    );
  }

  const subPath = (params.path || []).join('/');
  const search = request.nextUrl.search;
  const targetUrl = new URL(`/api/${subPath}${search}`, backendBase);

  const forwardHeaders = new Headers(request.headers);
  forwardHeaders.delete('host');

  const fetchInit: RequestInit = {
    method: request.method,
    headers: forwardHeaders,
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    fetchInit.body = await request.arrayBuffer();
  }

  try {
    const response = await fetch(targetUrl, fetchInit);
    const data = await response.arrayBuffer();
    return new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Backend service communication failure', message: err.message },
      { status: 502 }
    );
  }
}

export const GET = forwardToBackend;
export const POST = forwardToBackend;
export const PATCH = forwardToBackend;
export const PUT = forwardToBackend;
export const DELETE = forwardToBackend;
