const DMOJ_URL = 'https://dmoj.ca/api/v2/user/HumanThe2nd';
const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15'
];

const CACHED_DATA = {
    api_version: '2.0',
    method: 'get',
    fetched: '2026-06-07T19:04:33.284212+00:00',
    data: {
        object: {
            id: 140878,
            username: 'Humanthe2nd',
            points: 6078.138999999999,
            performance_points: 499.873143357555,
            problem_count: 1016,
            rank: null,
            rating: null
        }
    }
};

export default async function handler(req, res) {
    let lastError = null;

    for (const ua of USER_AGENTS) {
        try {
            console.log('[DMOJ API] Attempting fetch with UA:', ua.substring(0, 50) + '...');
            const response = await fetch(DMOJ_URL, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'User-Agent': ua,
                    'Referer': 'https://dmoj.ca/',
                    'Origin': 'https://dmoj.ca'
                },
                timeout: 10000
            });

            console.log('[DMOJ API] Response status:', response.status);
            const bodyText = await response.text();
            
            if (!response.ok) {
                lastError = new Error(`Status ${response.status}: ${bodyText.substring(0, 200)}`);
                console.warn('[DMOJ API] Non-OK response:', lastError.message);
                if (response.status === 403 || response.status === 429) {
                    console.log('[DMOJ API] Retrying with different UA...');
                    continue;
                }
                break;
            }

            try {
                const json = JSON.parse(bodyText);
                console.log('[DMOJ API] Success! Returning live data');
                return res.status(200).json({ ...json, _source: 'live', _fetched: new Date().toISOString() });
            } catch (parseErr) {
                lastError = new Error(`Invalid JSON from DMOJ: ${parseErr.message}`);
                console.error('[DMOJ API] JSON parse error:', lastError.message);
                break;
            }
        } catch (err) {
            lastError = err;
            console.error('[DMOJ API] Fetch error:', err.message);
        }
    }

    console.warn('[DMOJ API] All attempts failed, returning cached data:', lastError?.message ?? 'unknown');
    return res.status(200).json({ ...CACHED_DATA, _source: 'cached', _error: lastError?.message });
}
