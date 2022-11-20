import React , {useEffect, useState} from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Get_book = gql`
query Query($id: ID!) {
  getBook(_id: $id) {
    _id
    title
    authorId
    createdAt
    author {
      name
      _id
    }
  }
}
`


const Book = () => {

  const { id } = useParams();

  const { data, loading, error , refetch } = useQuery(Get_book, {
    variables: {
    "id": id
    }
  });

  console.log(data)
  
  useEffect(() => {
    
    if (data) refetch()
    
  }, [data])

  if (loading) return <h1>Loading...</h1>


  return (
    <>
      <div className="w-full h-screen relative px-8 ">
        <div className="absolute top-[calc(50vh-37%)] left-[calc(50vw-45%)]
          flex flex-col w-[90%] mx-auto  border-[1px] border-gray-400 rounded-sm">
          <h1 className="text-center bg-[#f6f8fa] py-3 border-b-2 border-gray-400">Singl Book</h1>
          <div className="my-5 grid md:grid-cols-2 place-items-center">
            <div className="mx-auto">
              <img
                className="md:w-[200px] md:h-[200px] w-[150px] h-[150px]  p-2
                shadow-lg shadow-slate-600 rounded-[50%] border-[2px] border-blue-300"
                src='/Bookimage.png'
                alt="/"
              />
            </div>
            <div className="mx-auto md:ml-[-25px] ">
              <h1 className="text-center md:text-left px-5 py-2 break-words">{data.getBook.title}</h1>
              <Link to={`/author/${data.getBook.authorId}`}>
                <p className="text-center md:text-left px-5 py-2 font-bold border-b-2 border-gray-400">
                  Creator :{data.getBook.author.name}
                </p>
              </Link>
              <p className="text-center md:text-left px-5 py-2 border-b-2 border-gray-400">
                <span className='font-bold'>Created at :</span>
                {data.getBook.createdAt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Book;