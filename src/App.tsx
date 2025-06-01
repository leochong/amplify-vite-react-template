import { useAuthenticator } from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

function App() {
  const { signOut } = useAuthenticator();

  return (
    <main>
      <h1>My App</h1>
      <div>
        <h2>File Upload</h2>
        <StorageManager
          acceptedFileTypes={['image/*', 'application/pdf']}
          accessLevel="private"
          maxFileCount={5}
          isResumable
        />
        <br />
        🥳 App successfully hosted.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;