import React from 'react';

import PeopleList from './features/people/PeopleList';

const App = () => (
  <div className="bg-gray-900 text-white min-h-screen font-sans">
    <div className="container mx-auto p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 tracking-wider">
          Star Wars Characters
        </h1>
        <p className="text-gray-400 mt-2">
          Information from a galaxy far, far away...
        </p>
      </header>

      <main>
        <PeopleList />
      </main>
    </div>
  </div>
);

export default App;
