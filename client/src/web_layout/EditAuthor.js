import React , {useEffect, useState} from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useNavigate , useParams } from 'react-router-dom';

const Edit_author = gql`
mutation Mutation($id: ID!, $name: String!) {
  editAuthor(_id: $id, name: $name) {
    msg
    status
  }
}
`
const Get_author = gql`
query Query($id: ID!) {
  getAuthor(_id: $id) {
    _id
    name
  }
}
`

const EditAuthor = () => {

  const [name, setName] = useState("");

  const { id } = useParams();

  const [Edit_Author] = useMutation(Edit_author);

  const { data, loading, error , refetch } = useQuery(Get_author, {
    variables: {
    "id": id
  }});

  const navigate = useNavigate();
  

  useEffect(() => {

    if (data) {
      setName(data.getAuthor.name)
    }

  } , [data])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const submit = async () => {

    if (!name) return alert('please Enter sth!!')
    
    const Edit = await Edit_Author({
      variables: {
        "id": id,
        "name": name
      }
    });

    await refetch();

    alert('Edit author successfully ');

    navigate('/authors')

  }

  return (
    <div className='w-full h-screen relative px-8'>
      <div className='absolute top-[calc(50vh-23%)] left-[calc(50vw-40%)] flex flex-col w-[80%]
       mx-auto border-[1px] border-gray-400 rounded-sm'>
        <h1 className="text-center bg-[#f6f8fa] py-3 border-b-2 border-gray-400 ">
          Edit Author
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

export default EditAuthor;