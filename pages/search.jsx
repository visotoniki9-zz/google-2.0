import Head from 'next/head';
import cache from 'memory-cache';
import Header from '../components/Header';

const { GOOGLE_API_KEY, GOOGLE_CONTEXT_KEY } = process.env;

function Search({ results }) {
  return (
    <div>
      <Head>
        <title>Search</title>
      </Head>
      {/* Header  */}
      <Header />
      {/* Search results */}
    </div>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const reqUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CONTEXT_KEY}&q=${context.query.term}`;

  const cachedResponse = cache.get(reqUrl);

  if (cachedResponse) {
    console.log('Loaded from cache');
    return {
      props: {
        results: cachedResponse,
      },
    };
  }

  console.log('Not found in cache');
  const response = await fetch(reqUrl);
  const data = await response.json();
  const hours = 24;
  cache.put(reqUrl, data, hours * 24 * 60 * 60);

  return {
    props: {
      results: data,
    },
  };
}
