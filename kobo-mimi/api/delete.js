import { del } from '@vercel/blob';

export default async function handler(request, response) {
  if (request.method !== 'POST' && request.method !== 'DELETE') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const url = new URL(request.url, `http://${request.headers.host}`);
  const blobUrl = url.searchParams.get('url');

  if (!blobUrl) {
    return response.status(400).json({ error: 'Blob URL is required' });
  }

  // Check password
  const adminPassword = process.env.ADMIN_PASSWORD || '';
  if (adminPassword) {
    const providedPassword = request.headers['x-admin-password'];
    if (providedPassword !== adminPassword) {
      return response.status(401).json({ error: 'Unauthorized' });
    }
  }

  try {
    await del(blobUrl);
    return response.status(200).json({ success: true });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
