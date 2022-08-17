import Devit from '../../components/devit';

const DavitPage = props => {
  console.log(props);
  return (
    <>
      <Devit {...props} />
    </>
  );
};

export default DavitPage;

export const getServerSideProps = async context => {
  const { params, res } = context;
  const { id } = params;
  const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`);

  if (apiResponse.ok) {
    const props = await apiResponse.json();
    return { props };
  }
  if (res) res.writeHead(301, { Location: '/home' }).end();
};

/* DavitPage.getInitialProps = context => {
  const { query, res } = context;
  const { id } = query;
  return fetch(`http://localhost:3000/api/devits/${id}`).then(apiResponse => {
    if (apiResponse.ok) return apiResponse.json();
    if (res) res.writeHead(301, {Location: '/home'}).end();
  
  });
}; */
