import React , {useEffect} from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const Get_books = gql`
query Query {
  getBooks {
    title
    authorId
    _id
    author {
      name
    }
  }
}
`

const AllBooks = () => {

  const { data, error, loading , refetch } = useQuery(Get_books);

  
  useEffect(() => {
    
    if (data) refetch()
    
  }, [])
  
  if (loading) return <h1>Loading...</h1>

  return (
    <>
      <div className="w-full h-screen relative px-8">
        <div className="absolute top-[calc(50vh-37%)] left-[calc(50vw-45%)]
          flex flex-col w-[90%] mx-auto  border-[1px] border-gray-400 rounded-sm">
          <h1 className="text-center bg-[#f6f8fa] py-3 border-b-2 border-gray-400">All Books</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 w-full py-3 mt-3 place-items-center">
            {data.getBooks !== 0 ?
              data.getBooks.map(item => {
                return (
                  <>
                    <div className="relative mt-2 flex flex-col gap-2 justify-center items-center bg-gray-200 
                      shadow-lg shadow-slate-600 rounded-[8px]  w-[90%] ">
                      <div className='py-2'>
                        <Link to={`/book/${item._id}`}>
                        <img
                            className="w-[100px] h-[100px] shadow-lg p-2
                           shadow-slate-600 rounded-[50%] border-[2px] border-blue-300"
                          src='./Bookimage.png'
                          alt="/"
                        />
                        </Link>
                      </div>
                      <div className='py-3 break-words'>
                      <Link to={`/book/${item._id}`}><p className='font-bold'>{item.title}</p></Link>
                      </div>
                      <div className='py-3 '>
                        <Link to={`/author/${item.authorId}`}>
                          <p className='border-b-2 border-gray-500'>Creator :{item.author.name}</p>
                        </Link>
                      </div>
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
                )
              })
              :
              <p>There is no book!!!</p>
             }
          </div>
        </div>
      </div>
    </>
  )
}

export default AllBooks;