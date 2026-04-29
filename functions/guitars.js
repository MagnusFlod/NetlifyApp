const { v4: uuidv4 } = require('uuid');
const guitars = require('../guitarData.js');

exports.handler = async (event) =>
{
    const { httpMethod, body } = event;

    if (httpMethod === 'GET')
    {
        return {
            statusCode: 200,
            body: JSON.stringify(guitars)
        };
    }

    if (httpMethod === 'DELETE')
    {
        const { id } = JSON.parse(body);

        const index = guitars.findIndex(g => g.id === id);

        if (index === -1)
        {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Guitar not found" })
            };
        }

        const deletedGuitar = guitars.splice(index, 1);

        return {
            statusCode: 200,
            body: JSON.stringify(deletedGuitar[0])
        };
    }
};