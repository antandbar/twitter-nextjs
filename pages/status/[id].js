/* import { firestore } from "../../firebase/admin";
import { collection, getDoc, doc } from "firebase/firestore"; */
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

/* export const getStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'eY2jrmAyUVdt737MVCsY' } }],
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const { id } = params;
  if (firestore) {
    const docRef = collection(firestore, "devits");
    return getDoc(doc(docRef, id))
      .then((doc) => {
        const { createdAt } = doc.data();
    
        const props = {
          ...doc.data(),
          id: doc.id,
          createdAt: +createdAt.toDate(),
        };
        return { props };
      })
      .catch(() => {
        return { props: { } };
      });
  }
}; */

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
