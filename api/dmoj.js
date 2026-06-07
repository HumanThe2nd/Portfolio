import fs from 'fs';
import path from 'path';

const CACHE_FILE = path.join(process.cwd(), 'dmoj_api_output.json');
const DMOJ_URL = 'https://dmoj.ca/api/v2/user/HumanThe2nd';
const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15'
];

async function readCache() {
    try {
        const raw = await fs.promises.readFile(CACHE_FILE, 'utf8');
        return JSON.parse(raw);
    } catch (err) {
        console.error('Unable to read DMOJ cache file:', err.message);
        return null;
    }
}

export default async function handler(req, res) {
    let lastError = null;

    for (const ua of USER_AGENTS) {
        try {
            const response = await fetch(DMOJ_URL, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'User-Agent': ua,
                    'Referer': 'https://dmoj.ca/',
                    'Origin': 'https://dmoj.ca'
                }
            });

            const bodyText = await response.text();
            if (!response.ok) {
                lastError = new Error(`Status ${response.status}: ${bodyText}`);
                if (response.status === 403 || response.status === 429) {
                    continue;
                }
                break;
            }

            try {
                const json = JSON.parse(bodyText);
                return res.status(200).json(json);
            } catch (parseErr) {
                lastError = new Error(`Invalid JSON from DMOJ: ${parseErr.message}`);
                break;
            }
        } catch (err) {
            lastError = err;
        }
    }

    console.warn('DMOJ live fetch failed, falling back to cache:', lastError?.message ?? 'unknown');
    const cacheJson = await readCache();
    if (cacheJson) {
        return res.status(200).json(cacheJson);
    }

    console.error('DMOJ proxy failed and no cache available:', lastError);
    return res.status(502).json({ error: 'DMOJ fetch blocked or failed', details: lastError?.message ?? 'unknown' });
}
