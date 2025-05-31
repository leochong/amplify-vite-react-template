import { defineAI } from '@aws-amplify/backend';
import { anthropic } from '@aws-amplify/backend-ai';

export const ai = defineAI({
  providers: {
    anthropic: anthropic({
      models: {
        generateRecipe: {
          model: 'claude-3-haiku-20240307',
          instructions: `You are a recipe generator. Generate a recipe based on the description provided.
          Return a JSON object with the following structure:
          {
            "name": "Recipe Name",
            "ingredients": ["ingredient 1", "ingredient 2", ...],
            "instructions": "Step by step instructions"
          }`,
        },
      },
    }),
  },
});