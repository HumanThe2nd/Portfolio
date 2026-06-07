export default async function handler(req, res) {
    const url = 'https://dmoj.ca/api/v2/user/HumanThe2nd';
    const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15'
    ];

    let lastError = null;

    for (const ua of userAgents) {
        try {
            const response = await fetch(url, {
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
                return res.status(response.status).json({ error: 'DMOJ API error', status: response.status, body: bodyText });
            }

            try {
                const json = JSON.parse(bodyText);
                return res.status(200).json(json);
            } catch (parseErr) {
                return res.status(502).json({ error: 'Invalid JSON from DMOJ', details: parseErr.message, body: bodyText });
            }
        } catch (err) {
            lastError = err;
        }
    }

    console.error('DMOJ proxy failed:', lastError);
    return res.status(502).json({ error: 'DMOJ fetch blocked or failed', details: lastError?.message ?? 'unknown' });
}
