const FormData = require('form-data');

exports.handler = async (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: ''
        };
    }

    try {
        const response = await fetch(
            'https://automations.solvid.ai/webhook/b256bc7a-cd19-4608-a493-cd0ac77dcdca',
            {
                method: 'POST',
                body: event.body,
                headers: {
                    'Content-Type': event.headers['content-type'] || 'application/octet-stream'
                }
            }
        );

        return {
            statusCode: response.status,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: await response.text()
        };
    } catch (err) {
        return {
            statusCode: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: err.message })
        };
    }
};
