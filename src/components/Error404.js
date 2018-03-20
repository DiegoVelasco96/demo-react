import React from 'react';
import { Link } from 'react-router-dom';

function Error404(){
    return(
        <div>
            Error 404.
            <br />
            Vamos a <Link to="/">Home</Link>
        </div>
    );
}

export default Error404;