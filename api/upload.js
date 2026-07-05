import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false,
  },
};

function getBlobToken() {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return process.env.BLOB_READ_WRITE_TOKEN;
  }
  const tokenKey = Object.keys(process.env).find(key => key.endsWith('READ_WRITE_TOKEN'));
  return tokenKey ? process.env[tokenKey] : undefined;
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  // Get filename from query params
  const url = new URL(request.url, `http://${request.headers.host}`);
  const filename = url.searchParams.get('filename');

  if (!filename) {
    return response.status(400).json({ error: 'Filename query parameter is required' });
  }

  try {
    const token = getBlobToken();
    // Vercel request is a readable stream, which can be passed directly to @vercel/blob's put function.
    const blob = await put(filename, request, {
      access: 'public',
      token,
    });
    return response.status(200).json(blob);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
