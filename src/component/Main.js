import React from 'react';
import OutputTable from "./OutputTable";
import Input from "./Input";
import ErrorBanner from "./ErrorBanner";
import '../css/Main.css';

function Main() {
    return(
        <div className="main">
            <Input/>
            <br/>
            <br/>
            <ErrorBanner/>
            <OutputTable/>
        </div>

    )
}

export default Main;