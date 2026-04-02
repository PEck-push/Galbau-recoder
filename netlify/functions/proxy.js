exports.handler = async (event) => {
    const headers = { 'Access-Control-Allow-Origin': '*' };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const body = event.isBase64Encoded
            ? Buffer.from(event.body, 'base64')
            : event.body;

        const response = await fetch(
            'https://automations.solvid.ai/webhook/b256bc7a-cd19-4608-a493-cd0ac77dcdca',
            {
                method: 'POST',
                body: body,
                headers: {
                    'Content-Type': event.headers['content-type'] || 'application/octet-stream'
                }
            }
        );

        return {
            statusCode: response.status,
            headers,
            body: await response.text()
        };
    } catch (err) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: err.message })
        };
    }
};