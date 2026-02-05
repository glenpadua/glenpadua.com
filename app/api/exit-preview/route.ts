import { exitPreview } from '@prismicio/next';

export async function GET(): Promise<Response> {
  return exitPreview();
}
