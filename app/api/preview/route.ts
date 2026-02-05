import { redirectToPreviewURL } from '@prismicio/next';
import type { NextRequest } from 'next/server';
import { createClient } from '@/lib/prismic';

export async function GET(request: NextRequest): Promise<Response> {
  const client = createClient();

  return redirectToPreviewURL({
    client,
    request,
    defaultURL: '/',
  });
}
