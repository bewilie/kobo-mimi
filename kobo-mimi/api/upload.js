import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false,
  },
};

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

  // Optional: Check password
  const adminPassword = process.env.ADMIN_PASSWORD || '';
  if (adminPassword) {
    const providedPassword = request.headers['x-admin-password'];
    if (providedPassword !== adminPassword) {
      return response.status(401).json({ error: 'Unauthorized' });
    }
  }

  try {
    // Vercel request is a readable stream, which can be passed directly to @vercel/blob's put function.
    const blob = await put(filename, request, {
      access: 'public',
    });
    return response.status(200).json(blob);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
