import React, {useEffect, useState} from 'react';

function ErrorBanner() {
    const [errorMessage, setErrorMessage] = useState(undefined);

    const updateErrorMessage = (event) => {
        setErrorMessage(event.detail.errorMessage);
    };

    const clearErrorMessage = () => {
        setErrorMessage(undefined);
    }

    useEffect(() => {
        window.addEventListener(
            "errorEvent",
            updateErrorMessage,
            false
        );
        window.addEventListener(
            "outputEvent",
            clearErrorMessage,
            false
        );
    }, []);

    return (
        <div className="error-message">
            {errorMessage}
        </div>
    );
}

export default ErrorBanner;