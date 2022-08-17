import Devit from '../../components/devit';
import { useRouter } from 'next/router';

const DavitPage = props => {
  const router = useRouter();
  
  /* if(!props.id) return "...Loading"; */
  if(router.isFallback) return "...Loading";

  return (
    <>
      <Devit {...props} />
    </>
  );
};

export default DavitPage;

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'eY2jrmAyUVdt737MVCsY' } }],
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const { id } = params;
  const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`);

  if (apiResponse.ok) {
    const props = await apiResponse.json();
    return { props };
  }
};

/*  export const getServerSideProps = async context => {
  const { params, res } = context;
  const { id } = params;
  const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`);

  if (apiResponse.ok) {
    const props = await apiResponse.json();
    return { props };
  }
  if (res) res.writeHead(301, { Location: '/home' }).end();
}; */ 

/* DavitPage.getInitialProps = context => {
  const { query, res } = context;
  const { id } = query;
  return fetch(`http://localhost:3000/api/devits/${id}`).then(apiResponse => {
    if (apiResponse.ok) return apiResponse.json();
    if (res) res.writeHead(301, {Location: '/home'}).end();
  
  });
}; */
