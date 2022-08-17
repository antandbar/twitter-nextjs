import Devit from "../../components/devit";

const DavitPage = props => {
  console.log(props);
  return (<>
  <Devit {...props}/>
  </>)
};

export default DavitPage;

DavitPage.getInitialProps = context => {
  const { query, res } = context;
  const { id } = query;
  return fetch(`http://localhost:3000/api/devits/${id}`).then(apiResponse => {
    if (apiResponse.ok) return apiResponse.json();
    if (res) res.writeHead(301, {Location: '/home'}).end();
  
  });
};
