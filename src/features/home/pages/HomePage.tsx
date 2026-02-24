import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to SAS Project</h1>
      <p className="text-gray-500">Select an action to get started.</p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate('/login')}
          className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/form')}
          className="rounded-lg bg-gray-700 px-6 py-2 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Go to Document Form
        </button>
      </div>
    </div>
  );
};

export default HomePage;
