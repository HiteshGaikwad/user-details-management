import React from 'react'

const UserDetailCard = ({studentData}) => {
  return (
    <>
          <p className="text-2xl font-semibold mb-4">
            <span className="w-72">Name: </span>
            <span className="font-normal">{studentData?.UserName}</span>
          </p>
          <p className="text-2xl font-semibold mb-4">
            Email: <span className="font-normal">{studentData?.Email}</span>
          </p>
          <p className="text-2xl font-semibold mb-4">
            Standard: <span className="font-normal">{studentData?.Standard}</span>
          </p>
          <p className="text-2xl font-semibold mb-4">
            Subjects: <span className="font-normal">{studentData?.Subjects.join(', ')}</span>
          </p>
          <p className="text-2xl font-semibold mb-4">
            Language: <span className="font-normal">{studentData?.Language}</span>
          </p>
          <p className="text-2xl font-semibold mb-10">
            Address: <span className="font-normal">{studentData?.Address}</span>
          </p>
        </>
  )
}

export default UserDetailCard