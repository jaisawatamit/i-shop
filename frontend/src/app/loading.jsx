'use client'

export default function LoadingPage (){
    return (
        <div className="fixed z-50 w-full h-full top-0 left-0 flex justify-center items-center bg-gray-800">
            <div className="text-center">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-[128px] w-[128px] sm:h-32 sm:w-32 mb-4"></div>
                <p className="text-3xl sm:text-5xl text-white">Loading...</p>
            </div>
            <style jsx>{`
                .loader {
                    border-top-color: #3498db;
                    animation: spin 1s infinite linear;
                border-right-color: #f39c12;
                border-bottom-color: #e74c3c;
                border-left-color: #2ecc71;
                }
                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

 