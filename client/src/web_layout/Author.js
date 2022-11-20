import React , {useEffect, useState} from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Get_author = gql`
query Query($id: ID!) {
  getAuthor(_id: $id) {
    _id
    name
    createdAt
    books {
      _id
      title
      authorId
      createdAt
    }
  }
}
`

const Author = () => {

  const { id } = useParams();

  const { data, loading, error , refetch } = useQuery(Get_author, {
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
          <h1 className="text-center bg-[#f6f8fa] py-3 border-b-2 border-gray-400">Singl Author</h1>
          <div className="my-5 grid md:grid-cols-2 place-items-center">
            <div className="mx-auto">
              <img
                className="md:w-[200px] md:h-[200px] w-[150px] h-[150px] 
                shadow-lg shadow-slate-600 rounded-[50%] border-[2px] border-blue-300"
                src='/Author.png'
                alt="/"
              />
            </div>
            <div className="mx-auto md:ml-[-25px] ">
              <h1 className="text-center md:text-left px-5 py-2">{data.getAuthor.name}</h1>
              <p className="text-center md:text-left px-5 border-b-2 border-gray-400">
                <span className='font-bold'>Created at :</span>
                {data.getAuthor.createdAt}
              </p>
            </div>
          </div>
          <div className="border-2 border-black"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 w-full py-3 mt-3 place-items-center">
            {data.getAuthor.books[0] ?
              data.getAuthor.books.map(item => {
                return (
                  <>
                    <div className="relative mt-2 flex flex-col gap-2 justify-center items-center bg-gray-200 
                      shadow-lg shadow-slate-600 rounded-[8px]  w-[90%] ">
                      <div className='py-2'>
                        <Link to={`/book/${item._id}`}>
                        <img
                            className="w-[100px] h-[100px] shadow-lg p-2
                           shadow-slate-600 rounded-[50%] border-[2px] border-blue-300"
                          src='/Bookimage.png'
                          alt="/"
                        />
                        </Link>
                      </div>
                      <div className='py-3 break-words'>
                      <Link to={`/book/${item._id}`}><p className='font-bold'>{item.title}</p></Link>
                      </div>
                      {/* <div className='py-3 '>
                        <Link to={`/author/${item.authorId}`}>
                          <p className='border-b-2 border-gray-500'>Creator :{item.author.name}</p>
                        </Link>
                      </div> */}
                      <div className='py-3 flex justify-center gap-6'>
                        <Link to={`/book/${item._id}`}>
                          <button className=' rounded-md py-2 px-4 my-2
                           bg-[#24292f] text-white w-32
                            focus:ring-4 focus:ring-gray-400'>
                           Read more
                          </button>
                        </Link>
                        <Link to={`/book/edit/${item._id}`}>
                          <button className=' rounded-md py-2 px-4 my-2
                            bg-[#24292f] text-white w-32
                            focus:ring-4 focus:ring-gray-400'>
                            Edit
                          </button>
                        </Link>
                      </div>
                    </div>
                  </>
                );
              })
              :
              <p className="font-semibold md:col-span-2 lg:col-span-3 pt-20">
                  There is no Book!!!
              </p>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Author;