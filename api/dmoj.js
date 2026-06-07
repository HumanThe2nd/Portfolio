export default async function handler(req, res) {
    try {
        const response = await fetch('https://dmoj.ca/api/v2/user/HumanThe2nd', {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'DMOJ API error', status: response.status });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error('DMOJ proxy error:', error);
        return res.status(500).json({ error: 'Failed to fetch DMOJ stats' });
    }
}
