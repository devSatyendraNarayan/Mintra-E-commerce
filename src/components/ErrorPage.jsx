import React from "react";

function ErrorPage() {
  const handleReload = () => {
    window.location.reload(); // Reloads the entire page
  };

  return (
    <>
      <div className="flex h-screen flex-col bg-white">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
          alt=""
          className="h-64 w-full object-cover"
        />

        <div className="flex flex-1 items-center justify-center">
          <div className="mx-auto max-w-xl px-4 py-8 text-center">
            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Something Went Wrong.
            </p>

            <p className="mt-4 text-gray-500">
              Try searching again, or return home to start from the beginning.
            </p>

            <a
              
              onClick={handleReload}
              className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
            >
              Go Back 
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
