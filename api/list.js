import { list } from '@vercel/blob';

function getBlobToken() {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return process.env.BLOB_READ_WRITE_TOKEN;
  }
  const tokenKey = Object.keys(process.env).find(key => key.endsWith('READ_WRITE_TOKEN'));
  return tokenKey ? process.env[tokenKey] : undefined;
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = getBlobToken();
    const { blobs } = await list({ token });
    // Sort books alphabetically or by upload date
    const sortedBlobs = blobs.sort((a, b) => b.uploadedAt - a.uploadedAt);
    return response.status(200).json(sortedBlobs);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
