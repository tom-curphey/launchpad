import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const doc = searchParams.get('doc');

  if (!doc) {
    return NextResponse.json({ error: 'Doc parameter required' }, { status: 400 });
  }

  try {
    // Map doc names to file paths
    const docMap: Record<string, string> = {
      'launchpad-documentation': 'docs/Workflows/launchpad-documentation.md',
    };

    const filePath = docMap[doc];
    if (!filePath) {
      return NextResponse.json({ error: 'Doc not found' }, { status: 404 });
    }

    const fullPath = path.join(process.cwd(), filePath);
    const content = await readFile(fullPath, 'utf-8');

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error reading doc:', error);
    return NextResponse.json({ error: 'Failed to read doc' }, { status: 500 });
  }
}
