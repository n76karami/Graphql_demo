import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

// const GET_HELLO = gql`
// query Query {
//   getAuthors {
//     _id
//     name
//     createdAt
//   }
// }
// `;

// const { loading, error, data , refetch } = useQuery(GET_HELLO
//   // , { pollInterval: 500 }
// );


// useEffect(() => {
  
//   // setauthors(data)
//   if (data) refetch()

// }, [])

// console.log(data)

// if (loading) return <p>Loading...</p>;
// if (error) return <p>Error : {error.message}</p>;
const WebLayout = () => {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default WebLayout;