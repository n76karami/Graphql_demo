import React , { useState} from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const create_author = gql`
mutation Mutation($name: String!) {
  createAuthor(name: $name) {
    msg
    status
  }
}
`

const Get_authors = gql`
query Query {
  getAuthors {
    name
  }
}
`

const CreateAuthor = () => {

  const [name, setName] = useState("");

  const [Create_Author] = useMutation(create_author);

  const { data, loading, error, refetch } = useQuery(Get_authors)

  const navigate = useNavigate();

  // console.log(data)

  const submit = async () => {

    if (!name) return alert('please Enter sth!!')
    
    const findName = data.getAuthors.some(item => item.name == name)

    // console.log(findName)

    if(findName) return alert('The name you entered is already used!!')
    
    const create = await Create_Author({
      variables: {
        "name": name
      }
    });

    console.log(create)

    await refetch()

    alert('New author successfully created');

    navigate('/authors')

  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className='w-full h-screen relative px-8'>
      <div className='absolute top-[calc(50vh-23%)] left-[calc(50vw-40%)] flex flex-col w-[80%]
       mx-auto border-[1px] border-gray-400 rounded-sm'>
        <h1 className="text-center bg-[#f6f8fa] py-3 border-b-2 border-gray-400 ">
          Create New Author
        </h1>
        <div className='grid md:grid-cols-2 my-11'>
          <h3 className='font-bold my-4 md:pl-10 px-2 lg:text-center'>
            Enter Author Name :
          </h3>
          <div className='px-2'>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full md:w-[250px] lg:w-[350px] mt-2 md:ml-10
              bg-gray-300 p-2 rounded-md focus:outline-none lg:ml-14"
            />
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
  )
}

export default CreateAuthor;