import React , {useEffect, useState} from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';

const Edit_book = gql`
mutation Mutation($id: ID!, $title: String!) {
  editBook(_id: $id, title: $title) {
    msg
    status
  }
}
`
const Get_book = gql`
query Query($id: ID!) {
  getBook(_id: $id) {
    _id
    title
  }
}
`

const EditBook = () => {

  const [title, setTitle] = useState("");

  const { id } = useParams();

  const [Edit_Book] = useMutation(Edit_book);

  const { data, loading , error , refetch } = useQuery(Get_book, {
    variables : {
      "id" : id
    }
  })

  const navigate = useNavigate();

  // console.log(data)

  useEffect(() => {

    if (data) {
      setTitle(data.getBook.title)
    }

  }, [data])
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const submit = async () => {
    
    if (!title) return alert('please Enter sth!!');

    const Edit = await Edit_Book({
      variables: {
        "id": id,
        "title": title
      }
    });

    await refetch();

    alert('Edit author successfully ');

    navigate('/books')


  }



  return (
    <>
      <div className='w-full h-screen relative px-8'>
        <div className='absolute top-[calc(50vh-23%)] left-[calc(50vw-40%)] flex flex-col w-[80%]
        mx-auto border-[1px] border-gray-400 rounded-sm'>
          <h1 className="text-center bg-[#f6f8fa] py-3 border-b-2 border-gray-400 ">
            Edit Book
          </h1>
          <div className='grid md:grid-cols-2 my-11'>
            <h3 className='font-bold my-4 md:pl-10 px-2 lg:text-center'>
              Enter Book title :
            </h3>
            <div className='px-2'>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength='40'
                className="w-full md:w-[250px] lg:w-[350px] mt-2 md:ml-10
                bg-gray-300 p-2 rounded-md focus:outline-none lg:ml-14"
              />
            </div>
          </div>
          {/* <div className='grid md:grid-cols-2 my-11'>
            <h3 className='font-bold my-4 md:pl-10 px-2 lg:text-center'>
              Select Author :
            </h3>
            <div className='px-2'>
             
              <select
                name="authorlist"
                value={author_id}
                onChange={(e) => setAuthor_id(e.target.value)}
                className='lg:ml-14 border-2  border-gray-300'
              >
                <option value="choose" >
                  Choose an Author
                </option>
                {data.getBook.map(item => {
                  return (
                    <option
                      value={item._id}
                    >
                      {item.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div> */}
          <div className='flex justify-center'>
            <button
              onClick={submit}
              className=' rounded-md py-2 px-4 my-2
              bg-[#24292f] text-white 
              focus:ring-4 focus:ring-gray-400'>
              submit
            </button>
          </div>
        </div>

      </div>
    </>
  )
}

export default EditBook;