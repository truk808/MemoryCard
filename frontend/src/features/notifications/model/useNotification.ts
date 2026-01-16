import React from 'react';

const useNotification = () => {
    const onClick = ()=> {
        console.log('Clicked on a notification');
    }

    return {
        onClick
    }
};

export default useNotification;