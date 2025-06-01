import * as React from 'react';
import { useAuthenticator, Flex, TextAreaField, Loader, Text, View, Button } from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import { useAIGeneration } from "./client";

function App() {
  const { signOut } = useAuthenticator();
  const [description, setDescription] = React.useState("");
  const [{ data, error, isLoading }, generateRecipe] = useAIGeneration("generateRecipe");

  const handleClick = async () => {
    if (description.trim()) {
      generateRecipe({ description });
    }
  };

  return (
    <main>
      <h1>My App</h1>
      <Flex direction="column" gap="1rem">
        <div>
          <h2>File Upload</h2>
          <StorageManager
            acceptedFileTypes={['image/*', 'application/pdf']}
            accessLevel="private"
            maxFileCount={5}
            isResumable
          />
        </div>
        
        <Flex direction="column" gap="1rem">
          <TextAreaField
            autoResize
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            placeholder="Enter a description for your recipe"
          />
          <Button onClick={handleClick} isDisabled={!description.trim() || isLoading}>
            Generate recipe
          </Button>
        </Flex>
        
        {isLoading ? (
          <Loader variation="linear" />
        ) : error ? (
          <Text color="red">{error.message || "An error occurred"}</Text>
        ) : data ? (
          <Flex direction="column" gap="1rem" padding="1rem" backgroundColor="rgba(0,0,0,0.05)">
            <Text fontWeight="bold" fontSize="1.2rem">{data?.name}</Text>
            <Text fontWeight="bold">Ingredients:</Text>
            <View as="ul">
              {data?.ingredients?.map((ingredient) => (
                <View as="li" key={ingredient}>
                  {ingredient}
                </View>
              ))}
            </View>
            <Text fontWeight="bold">Instructions:</Text>
            <Text>{data?.instructions}</Text>
          </Flex>
        ) : null}
        
        <Button onClick={signOut}>Sign out</Button>
      </Flex>
    </main>
  );
}

export default App;