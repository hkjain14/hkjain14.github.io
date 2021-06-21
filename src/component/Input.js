import React, { useState } from 'react';
import run from "../findVaccinationCenters";

function Input() {
    const [age, setAge] = useState(45);
    const [pin, setPin] = useState();
    const [vaccine, setVaccine] = useState();
    const [isFreeVaccineOnly, setIsFreeVaccineOnly] = useState(false);
    const [dose, setDose] = useState('1');

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };
    const handlePinChange = (event) => {
        setPin(event.target.value);
    };
    const handleVaccineChange = (event) => {
        setVaccine(event.target.value);
    };
    const handleCheckboxChange = () => {
        setIsFreeVaccineOnly((prev) => !prev);
    };
    const changeDose = (event) => {
        setDose(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const clearOutputEvent = new CustomEvent("clearOutputEvent");
        window.dispatchEvent(clearOutputEvent);
        run(age,vaccine,pin, isFreeVaccineOnly, dose);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className="input-text">
                    Age:
                    <input type="text" value={age} onChange={handleAgeChange} className="input-age-value"/>
                </label>
                <br/>
                <label className="input-text">
                    Pincode:
                    <input type="text" value={pin} onChange={handlePinChange} className="input-pin-value" />
                </label>
                <br/>
                <label className="input-text">
                    Vaccine Preference:
                    <input type="text" value={vaccine} onChange={handleVaccineChange} className="input-vaccine-value" />
                </label>
                <br/>
                <label className="input-text">
                    Free Vaccines Only:
                    <input name="isGoing" type="checkbox" checked={isFreeVaccineOnly} onChange={handleCheckboxChange} className="input-checkbox-value" />
                </label>
                <br/>
                <label className="input-text">
                    Dose :
                    <select
                        value={dose}
                        onChange={changeDose}
                        className="input-dose-value"
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </label>
                <br/>
                <br/>
                <br/>
                <input type="submit" value="Submit" className="input-submit "/>
            </form>

        </div>
    );
}

export default Input;