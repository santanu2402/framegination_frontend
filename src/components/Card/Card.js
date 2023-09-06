import React from 'react'
import { download } from '../../assets'
import { downloadImage } from '../Utils/Utils'
const Card = ({ _id, name, prompt, photo }) => {
    return (


        <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
            <img
                className="w-full h-auto object-cover rounded-xl"
                src={photo}
                alt={prompt}
            />

            <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] bg-opacity-80 m-2 p-2 rounded-md">
                <div className="mb-2">
                    <button
                        type="button"
                        onClick={() => downloadImage(_id, photo)}
                        className="outline-none bg-transparent border-none"
                    >
                        <img
                            src={download}
                            alt="download"
                            className="w-6 h-6 object-contain invert"
                        />
                    </button>
                    <p className="text-white text-sm ml-2">{name}</p>
                </div>
                <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>
            </div>
        </div>
    )
}

export default Card
