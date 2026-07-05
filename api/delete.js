import { del } from '@vercel/blob';

function getBlobToken() {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return process.env.BLOB_READ_WRITE_TOKEN;
  }
  const tokenKey = Object.keys(process.env).find(key => key.endsWith('READ_WRITE_TOKEN'));
  return tokenKey ? process.env[tokenKey] : undefined;
}

export default async function handler(request, response) {
  if (request.method !== 'POST' && request.method !== 'DELETE') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const url = new URL(request.url, `http://${request.headers.host}`);
  const blobUrl = url.searchParams.get('url');

  if (!blobUrl) {
    return response.status(400).json({ error: 'Blob URL is required' });
  }

  try {
    const token = getBlobToken();
    await del(blobUrl, { token });
    return response.status(200).json({ success: true });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
