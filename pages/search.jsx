import Head from 'next/head';
import cache from 'memory-cache';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';

const { GOOGLE_API_KEY, GOOGLE_CONTEXT_KEY } = process.env;

function Search({ results }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>
          {router.query.term}
          {' '}
          - Google Search
        </title>
      </Head>
      <Header />
      <SearchResults results={results} />
    </div>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const startIndex = context.query.start || '0';
  const reqUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`;

  const cachedResponse = cache.get(reqUrl);

  if (cachedResponse) {
    return {
      props: {
        results: cachedResponse,
      },
    };
  }

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
