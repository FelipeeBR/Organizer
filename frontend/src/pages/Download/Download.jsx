import React from 'react';
import { BsAndroid2 } from "react-icons/bs";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import image1 from '../../images/1.png';
import image2 from '../../images/2.png';
import image3 from '../../images/3.png';
import image4 from '../../images/4.png';
import image5 from '../../images/5.png';

const images = [
    {
        original: image1,
    },
    {
        original: image2,
    },
    {
        original: image3,
    },
    {
        original: image4,
    },
    {
        original: image5,
    },
];

const Download = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-gray-600 flex flex-col justify-center items-center text-white mb-3">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Baixar Aplicativo OrganizerApp</h1>
                <p className="text-xl mb-8">Organização e controle de tarefas</p>
                
                <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md md:mx-auto m-3">
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Disponível para:</h2>
                        <BsAndroid2 color='#3DDC84' size={50}/>
                        <p className="text-gray-600 mt-2">Android</p>
                    </div>
        
                    <div className="flex justify-center space-x-4">
                        <a 
                            href="https://api.promosemanal.online/public/organizer-app.apk" 
                            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
                        >
                            BAIXAR
                        </a>
                    </div>
                </div>

                <div className="mt-12">
                    <p className="text-lg mb-4">Imagens:</p>
                    <ImageGallery items={images} />
                </div>
            </div>
        </div>
    );
}

export default Download;