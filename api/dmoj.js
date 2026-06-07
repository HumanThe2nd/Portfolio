export default async function handler(req, res) {
    try {
        // Some upstream APIs block non-browser user agents. Try a few common UA strings.
        const url = 'https://dmoj.ca/api/v2/user/HumanThe2nd';
        const userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
            'curl/7.64.1'
        ];

        let lastErr = null;
        let data = null;
        for (const ua of userAgents) {
            try {
                const response = await fetch(url, {
                    headers: {
                        'Accept': 'application/json',
                        'User-Agent': ua,
                        'Referer': 'https://dmoj.ca/'
                    },
                    // set a reasonable timeout via AbortController if desired in future
                });

                if (!response.ok) {
                    // Continue to next UA if blocked (e.g., 403), otherwise return error
                    if (response.status === 403) {
                        lastErr = new Error(`403 for UA ${ua}`);
                        continue;
                    }
                    return res.status(response.status).json({ error: 'DMOJ API error', status: response.status });
                }

                data = await response.json();
                break;
            } catch (err) {
                lastErr = err;
                // try next UA
            }
        }

        if (!data) {
            console.error('DMOJ proxy: all attempts failed', lastErr);
            return res.status(502).json({ error: 'DMOJ fetch blocked or failed', details: lastErr && lastErr.message ? lastErr.message : String(lastErr) });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('DMOJ proxy error:', error);
        return res.status(500).json({ error: 'Failed to fetch DMOJ stats' });
    }
}
