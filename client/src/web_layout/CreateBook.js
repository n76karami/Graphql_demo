import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const Create_book = gql`
mutation Mutation($title: String!, $authorId: ID!) {
  createBook(title: $title, authorId: $authorId) {
    msg
    status
  }
}
`

const Get_authors = gql`
query Query {
  getAuthors {
    name
    _id
  }
}
`

const CreateBook = () => {

  const [title, setTitle] = useState('');
  const [author_id, setAuthor_id] = useState('choose');

  const navigate = useNavigate();

  const [Create_Book] = useMutation(Create_book);

  const { data, error , loading , refetch } = useQuery(Get_authors);
  // , { pollInterval: 500 }

  console.log(data)

  const submit = async () => {
    
    if (!title || !author_id) return alert('please fill all sections!!');

    const isIdThere = data.getAuthors.some(item => item._id == author_id);

    console.log(isIdThere);

    if (author_id === 'choose') return alert('please choose')

    if (!isIdThere) return alert('The entered id is incorrect!!!')
    
    const create = await Create_Book({
      variables: {
        "title": title,
        "authorId": author_id
      } 
    })

    console.log(create)

    await refetch()

    // window.location.assign('/books')
    alert('New book successfully created')

    navigate('/books')

  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div className='w-full h-screen relative px-8'>
        <div className='absolute top-[calc(50vh-23%)] left-[calc(50vw-40%)] flex flex-col w-[80%]
        mx-auto border-[1px] border-gray-400 rounded-sm'>
          <h1 className="text-center bg-[#f6f8fa] py-3 border-b-2 border-gray-400 ">
            Create New Book
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
          <div className='grid md:grid-cols-2 my-11'>
            <h3 className='font-bold my-4 md:pl-10 px-2 lg:text-center'>
              Select Author :
            </h3>
            <div className='px-2'>
              {/* <input
                type='text'
                value={author_id}
                onChange={(e) => setAuthor_id(e.target.value)}
                className="w-full md:w-[250px] lg:w-[350px] mt-2 md:ml-10
                bg-gray-300 p-2 rounded-md focus:outline-none lg:ml-14"
              /> */}
              <select
                name="authorlist"
                value={author_id}
                onChange={(e) => setAuthor_id(e.target.value)}
                className='lg:ml-14 border-2  border-gray-300'
              >
                <option value="choose" >
                  Choose an Author
                </option>
                {data.getAuthors.map(item => {
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
          </div>
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

export default CreateBook;