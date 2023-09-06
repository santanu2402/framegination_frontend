import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../../assets'
import { getRandomPrompt } from '../../components/Utils/Utils'
import FormField from '../FormField/FormField'
import Loader from '../Loader/Loader'


const CreatePost = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
    })

    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.prompt && form.photo) {
            setLoading(true);
            try {
                const token1 = localStorage.getItem('auth-token');
                const response = await fetch('https://framegination.onrender.com/api/v1/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token1
                    },
                    body: JSON.stringify({ ...form }),
                })
                await response.json();
                navigate('/');
                window.location.reload();
            }
            catch (error) {
                alert(error)
                console.log(error)
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please enter a sentence to generate an Image')
        }

    }

    const handleChange = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({ ...form, prompt: randomPrompt })

    }
    const generateImage = async () => {
        if (form.prompt) {
            try {
                const token5 = localStorage.getItem('auth-token');
                setGeneratingImg(true);
                const response = await fetch('https://framegination.onrender.com/api/v1/dalle', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token5
                    },
                    body: JSON.stringify({ prompt: form.prompt }),
                })
                const data = await response.json();
                if (!data.success) {
                    alert(data.message)
                    navigate('/');
                    window.location.reload();
                }
                else {
                    setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
                }


            } catch (e) {
                alert(e);
                console.log(e);
            }

            finally {
                setGeneratingImg(false);
            }
        } else {
            alert('Please enter Query to be searched for');
        }
    }

    return (


        <section className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:w-2/3 md:pr-10">
                    <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
                    <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">Create imaginative and visually stunning images through DALL-E AI and Add it to your Gallery</p>
                    <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5">
                            <FormField LabelName="Your Name" type="text" name="name" placeholder="John Doe" value={form.name} handleChange={handleChange} />
                            <FormField LabelName="Enter Details To Generate" type="text" name="prompt" placeholder="an armchair in the shape of an avocado" value={form.prompt} isSurpriseMe handleSurpriseMe={handleSurpriseMe} handleChange={handleChange} />
                            <div className="flex gap-5">
                                <button type="button" onClick={generateImage} className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                                    {generatingImg ? 'Generating..Please Wait....' : 'Generate'}
                                </button>
                                <button type="submit" className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">{loading ? "Adding.." : "Add To Gallery"}</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="md:w-1/3 md:mt-0 mt-5">
                    <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                        {form.photo ? (
                            <img src={form.photo} alt={form.photo} className="w-full h-full object-contain" />
                        ) : (
                            <img src={preview} alt="preview" className="w-full h-full object-contain opacity-40" />
                        )}
                        {generatingImg && (
                            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>

    )
}


export default CreatePost
