import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const RedirectTO404 = () => {
    const navigate = useNavigate();

  useEffect(() => {
      navigate('/404');
  } );

    return (
        <div>
            
        </div>
    );
};

export default RedirectTO404;