import React from 'react';
import DOMPurify from 'dompurify';

const Description = ({description}) => {


    return (
        <div className="flex items-center justify-center">
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }} className="w-full h-100 overflow-y-auto p-4 text-left rounded border border-gray-300">
            </div>
        </div>
    );
};

export default Description;
