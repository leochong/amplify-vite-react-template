import { useAuthenticator } from '@aws-amplify/ui-react';
import FileUpload from './components/FileUpload';

function App() {
  const { signOut } = useAuthenticator();

  return (
    <main>
      <h1>My App</h1>
      <div className="content">
        <h2>File Upload</h2>
        <p>Upload files to your S3 bucket</p>
        <FileUpload />
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;