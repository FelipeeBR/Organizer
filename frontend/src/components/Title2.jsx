import React from 'react'

const Title2 = ({ text }) => {
  return (
    <div className="flex items-center justify-between">
        <div>
            <h4 className="text-2xl font-medium text-slate-800">
            {text ?? "Default Title"}
            </h4>
            <div className="h-[3px] mt-2 w-8 rounded-md bg-blue-500"></div>
        </div>
    </div>
  )
}

export default Title2;