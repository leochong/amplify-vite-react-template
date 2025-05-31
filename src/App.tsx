import * as React from 'react';
import { useAuthenticator, Flex, TextAreaField, Loader, Text, View, Button } from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import { useAIGeneration } from "./client";

function App() {
  const { signOut } = useAuthenticator();
  const [description, setDescription] = React.useState("");
  const [{ data, isLoading }, generateRecipe] = useAIGeneration("generateRecipe");

  const handleClick = async () => {
    generateRecipe({ description });
  };

  return (
    <main>
      <h1>My App</h1>
      <Flex direction="column">
        <div>
          <h2>File Upload</h2>
          <StorageManager
            acceptedFileTypes={['image/*', 'application/pdf']}
            accessLevel="private"
            maxFileCount={5}
            isResumable
          />
        </div>
        
        <Flex direction="row">
          <TextAreaField
            autoResize
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
          />
          <Button onClick={handleClick}>Generate recipe</Button>
        </Flex>
        
        {isLoading ? (
          <Loader variation="linear" />
        ) : (
          <>
            <Text fontWeight="bold">{data?.name}</Text>
            <View as="ul">
              {data?.ingredients?.map((ingredient) => (
                <View as="li" key={ingredient}>
                  {ingredient}
                </View>
              ))}
            </View>
            <Text>{data?.instructions}</Text>
          </>
        )}
        
        <Button onClick={signOut}>Sign out</Button>
      </Flex>
    </main>
  );
}

export default App;