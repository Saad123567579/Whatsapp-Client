import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { toggleCurrent, setCIUser } from '../../redux/userSlice';


const Allcontacts = () => {
  const allcontacts = useSelector((state) => state?.user?.allContacts);
  const dispatch = useDispatch();

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='w-full h-10 p-2 flex justify-start items-center'>
        <div className='cursor-pointer hover:shadow-md p-1 rounded-full' onClick={async() => await dispatch(toggleCurrent())}>
          <IoMdArrowRoundBack />
        </div>
      </div>

      <div className='w-full flex-grow overflow-auto'> {/* Only the outermost container should have overflow-auto */}
        {allcontacts === null ? (
          <div>Loading...</div>
        ) : (
          <div className='flex-col w-full '>
            {allcontacts.map((contact) => (
              <div className='flex flex-col p-2 w-full' key={contact.letter}>
                <h1 className='font-semibold text-2xl p-2'>{contact.letter}</h1>

                {contact.entries.map((user) => (
                  <div className='flex items-center m-2 mr-1 p-3 cursor-pointer rounded-lg hover:shadow-md w-full' key={user.id} onClick={async()=>await dispatch(setCIUser(user))}>
                    <img className='rounded-full h-8 w-8' src={user.image} alt={user.name} />
                    <h1 className='font-semibold text-gray-800 ml-2'>{user.name}</h1>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Allcontacts;
