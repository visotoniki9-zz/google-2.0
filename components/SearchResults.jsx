import PaginationButtons from './PaginationButtons';

function SearchResults({ results }) {
  return (
    <div className="mx-auto w-full px-3 sm:pl-[5%] md:pl-[14%] lg:pl-52">
      {/* About X results (Y Seconds) */}
      <p className="text-gray-600 text-md mb-5">
        About
        {' '}
        {results.searchInformation?.formattedTotalResults}
        {' '}
        results
        {' '}
        (
        {(results.searchInformation?.searchTime).toFixed(2)}
        {' '}
        seconds)
      </p>
      {/* Results */}
      {results.items?.map((result) => (
        <div
          key={result.link}
          className="max-w-xl mb-8"
        >
          <div className="group">
            {/* Url */}
            <a href={result.link} className="text-sml truncate text-sm">
              {result.formattedUrl}
            </a>
            {/* Title */}
            <a href={result.link}>
              <h2 className="truncate text-xl text-blue-800 font-medium group-hover:underline">{result.title}</h2>
            </a>
          </div>
          {/* Snippet */}
          <p className="text-gray-700 line-clamp-2">{result.snippet}</p>
        </div>
      ))}
      <PaginationButtons />
    </div>
  );
}

export default SearchResults;
