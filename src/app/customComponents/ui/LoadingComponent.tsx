import React from "react";

const LoadingComponent: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin inline-block w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingComponent;
