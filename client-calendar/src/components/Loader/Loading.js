import React from 'react'
import people from "../../assets/people.png"

export default function Loading() {
    return (
        <>
            <div className="flex p-4 max-w-sm h-full w-full mx-auto justify-center items-center">
                <div className="animate-pulse">
                    <div className="space-y-6 py-1 font-bold text-4xl">
                        <div className='space-x-3'>
                            <img src={people} className="w-14 inline" />
                            <span>Loading</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
