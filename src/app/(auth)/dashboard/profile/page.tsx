import { ctti_coder } from '@/assets/images'
import { TextInput } from '@/components'
import Image from 'next/image'
import React from 'react'

export default function Profile() {

  const user: UserProps = {
    id: "8921144",
    image: "amaka.jpg",
    firstname: "Kevin",
    middlename: 'Ojonugwa',
    lastname: "Gambari",
    type: "Admin",
    status: "Active",
    phone: "+234808709734",
    address: '32, Opposite Living Faith, Paso II, Gwagwalada',
    email: "Kevin@gmail.com",
    createdAt: "28/10/2023",
  }

  return (
    <main className="flex flex-col px-2">
      <section className="flex flex-col gap-4 sm:gap-10">
        {/* <h2 className="text-lg sm:text-xl md:text-2xl">Account Settings</h2> */}
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <label htmlFor="profileForm" className="cursor-pointer rounded-md text-thin text-xs text-slate-500  hover:text-primary dark:text-slate-400 dark:hover:border-slate-400 border border-slate-300 hover:border-primary peer-checked/profile:border-primary py-2 px-4 sm:py-3 sm:px-6 w-max select-none">Personal Information</label>
          {/* <label htmlFor="accountForm" className="cursor-pointer rounded-md text-thin text-xs text-slate-500  hover:text-primary dark:text-slate-400 dark:hover:border-slate-400 border border-slate-300 hover:border-primary peer-checked/account:border-primary py-2 px-4 sm:py-3 sm:px-6 w-max select-none">Account Details</label> */}
        </div>
      </section>
      <input type="radio" defaultChecked name="form-peer" id="profileForm" className="hidden peer/profile" />
      <input type="radio" name="form-peer" id="accountForm" className="hidden peer/account" />
      <section className="hidden peer/account:hidden flex-col pt-5 pb-10 peer-checked/profile:flex">
        <div className="flex flex-col gap-6">
          <form action="" className="flex flex-col gap-4 p-4">
            <h4 className="text-xs text-slate-500 opacity-80">Your Profile Picture</h4>
            <div className="flex gap-4 md:gap-6">
              <label htmlFor="profilePicture" className="relative h-14 w-14 md:h-16 md:w-16 flex-shrink-0 rounded-full overflow-hidden cursor-pointer">
                <input type="file" name="" id="profilePicture" className="hidden" />
                <Image src={user?.image || ctti_coder} alt={`${user?.firstname} ${user?.middlename} ${user?.lastname}`} fill={true} className='object-cover' />
              </label>
              <div className="flex flex-col gap-1 w-max justify-center sm:items-center">
                <div className="flex gap-4">
                  <button type="button" className="py-2 px-4 sm:px-8 bg-primary text-white text-[.6rem] text-xs rounded-md hover:bg-primary/90 cursor-pointer">Upload New</button>
                  <button type="button" className="py-2 px-4 sm:px-8 bg-slate-300/50 dark:bg-slate-100 dark:hover:text-slate-900 text-slate-700 text-[.6rem] text-xs rounded-md hover:bg-danger hover:text-white cursor-pointer">Delete Picture</button>
                </div>
                <p className="text-[.6rem] text-center text-slate-500">Your profile picture enables users recognize you on EDIMCS</p>
              </div>
            </div>
          </form>
          <form action="" className="px-4 sm:px-0 w-full sm:w-10/12 sm:scale-90 grid sm:grid-cols-2 gap-4 sm:gap-y-6 sm:justify-center relative after:bg-slate-300 after:-top-4 after:h-[.51px] after:w-11/12 after:left-1/2 after:-translate-x-1/2 after:absolute">
            <div className={`flex flex-col gap-1`}>
              <label htmlFor={'firstname'} className="text-gray-600 text-sm">First Name</label>
              <input type="text" required name={'firstname'} placeholder={'Enter First Name'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
            </div>
            <div className={`flex flex-col gap-1`}>
              <label htmlFor={'middlename'} className="text-gray-600 text-sm">Middle Name</label>
              <input type="text" required name={'middlename'} placeholder={'Enter Middle Name (optional)'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
            </div>
            <div className={`flex flex-col gap-1`}>
              <label htmlFor={'lastname'} className="text-gray-600 text-sm">Last Name</label>
              <input type="text" required name={'lastname'} placeholder={'Enter Last Name'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
            </div>
            <div className={`flex flex-col gap-1`}>
              <label htmlFor={'phone'} className="text-gray-600 text-sm">Phone Number</label>
              <input type="text" required name={'phone'} placeholder={'Enter Last Name'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
            </div>
            <div className={`flex flex-col gap-1`}>
              <label htmlFor={'address'} className="text-gray-600 text-sm">Address</label>
              <input type="text" required name={'address'} placeholder={'Enter Last Name'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
            </div>
            {/* <TextInput key={6274} name='member-id' label='Your Member ID' disabled={true} value={user?.id} minLength={3} required={"true"} containerClassName={'text-xs sm:col-span-2'} className='bg-slate-200 cursor-not-allowed' />
            <TextInput key={6275} name='firstname' label='First Name' value={user?.firstname} minLength={3} required={"true"} containerClassName={'text-xs'} />
            <TextInput key={6275} name='middlename' label='Middle Name' value={user?.middlename || ""} minLength={3} required={"false"} containerClassName={'text-xs'} />
            <TextInput key={6276} name='lastname' label='Last Name' value={user?.lastname} minLength={3} required={"true"} containerClassName={'text-xs'} />
            <TextInput key={6277} name='email' label='Email' value={user?.email} minLength={3} required={"true"} containerClassName={'text-xs'} />
            <TextInput key={6278} name='phone' label='Phone Number' value={user?.phone} minLength={11} required={"true"} containerClassName={'text-xs'} />
            <TextInput key={6279} name='address' label='Address' value={user?.address} minLength={3} required={"true"} containerClassName={'text-xs'} />
            <TextInput key={6267} name='password' label='Confirm Password' placeholder={'Enter Password to Confirm Changes'} minLength={3} required={"true"} containerClassName={'text-xs sm:col-span-2'} /> */}
            <div className={`flex flex-col gap-1`}>
              <label htmlFor={'confirm-password'} className="text-gray-600 text-sm">Confirm Password (to save change)</label>
              <input type="text" required name={'confirm-password'} placeholder={'Enter your Current Password'} className='hover:border-primary/90 outline-none placeholder-opacity-70 text-slate-500 text-sm sm:text-md bg-transparent border border-zinc-200 rounded-[.25rem] py-2 px-4' />
            </div>
            <button type='submit' className="cursor-pointer rounded-md text-thin text-xs text-white bg-primary hover:bg-primary/90 py-2 px-4 sm:py-3 sm:px-6 w-max select-none">Update Profile</button>
          </form>

        </div>
      </section>
    </main>
  )
}
