import React, { useState, FormEvent } from 'react';
import { UnsplashImage, UnsplashResponse } from './types';
import ImageCard from './components/ImageCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  // --- USER'S PROVIDED KEYS ---
  // WARNING: Do not expose your Secret Key in client-side applications.
  // The Access Key is sufficient for public actions like searching for photos.
  const UNSPLASH_ACCESS_KEY = 'qYcN7OPH8KhJQYA8mbAiGVTw6-GyEyga3RtBZv2_qts';

  const [query, setQuery] = useState('landscapes');
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a search term.");
      return;
    }

    setLoading(true);
    setError(null);
    setImages([]);
    setSearched(true);

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(query)}&per_page=12`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        }
      );

      if (!response.ok) {
        let errorMessage = `API request failed with status: ${response.status}`;
        try {
            const errorData = await response.json();
            if (errorData && errorData.errors) {
                errorMessage = errorData.errors.join(', ');
            }
        } catch (jsonError) {
            // Could not parse error JSON, stick with the status message.
        }
        throw new Error(errorMessage);
      }

      const data: UnsplashResponse = await response.json();
      if (data.results.length === 0) {
        setError('No images found for your query. Try something else!');
      } else {
        setImages(data.results);
      }

    } catch (err: any) {
      setError(err.message || 'An unknown error occurred. Check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Unsplash API Tester
          </h1>
          <p className="text-gray-400 mt-2">
            Enter a search term to test your Unsplash API credentials.
          </p>
        </header>

        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., mountains, coffee, technology..."
            className="flex-grow bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            aria-label="Search for images"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        <main>
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          
          {images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((image) => (
                <ImageCard key={image.id} image={image} />
              ))}
            </div>
          )}

          {!loading && !error && images.length === 0 && !searched && (
            <div className="text-center text-gray-500 mt-12">
                <p>Enter something in the search bar above and click "Search" to see images.</p>
             </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default App;
