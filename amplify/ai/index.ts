import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

const bedrockClient = new BedrockRuntimeClient({ region: 'us-west-2' });

export const handler = async (event: any) => {
  try {
    const { message } = JSON.parse(event.body);

    const payload = {
      prompt: message,
      max_tokens: 500,
      temperature: 0.7,
      anthropic_version: "bedrock-2023-05-31"
    };

    const command = new InvokeModelCommand({
      modelId: 'anthropic.claude-v2',
      body: JSON.stringify(payload),
      contentType: 'application/json',
      accept: 'application/json',
    });

    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: responseBody.completion
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};