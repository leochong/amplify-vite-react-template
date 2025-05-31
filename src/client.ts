import { generateClient } from "aws-amplify/api";
import { Schema } from "../amplify/data/resource";
import { createAIHooks } from "@aws-amplify/ui-react-ai";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

// Configure Amplify with outputs
Amplify.configure(outputs);

// Create client with correct auth mode
export const client = generateClient<Schema>();
export const { useAIConversation, useAIGeneration } = createAIHooks();