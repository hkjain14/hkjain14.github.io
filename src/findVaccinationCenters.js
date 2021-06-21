import axios from 'axios';
import playSound from 'play-sound';

const player = playSound({});

const validVaccines = ['COVISHIELD', 'COVAXIN', 'SPUTNIK V'];

async function getRequest(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        throw e;
    }
}

function generateCurrentDate() {
    const currentDateTime = new Date();
    const istDateTime = currentDateTime.toLocaleString('en-GB', {timeZone: 'Asia/Calcutta'})
    const splitDateTime = istDateTime.split('/');
    const date = splitDateTime[0];
    const month = splitDateTime[1];
    const year = splitDateTime[2].split(',')[0];
    return `${date}-${month}-${year}`;
}

function generateConfigs(age, vaccinePreference) {
    const ageToCheck = age >= 18 && age <= 44 ? 18 : 45;
    let upperCaseVaccinePreference = vaccinePreference && vaccinePreference.toUpperCase();
    if ((upperCaseVaccinePreference && !validVaccines.includes(upperCaseVaccinePreference)) || !upperCaseVaccinePreference) {
        upperCaseVaccinePreference = '';
    }
    const availableVaccines = ['', ...validVaccines];
    const matchVaccineArray = upperCaseVaccinePreference !== '' ? [vaccinePreference.toUpperCase()] : availableVaccines;
    return {ageToCheck, matchVaccineArray};
}

async function generateCentersUrl(pinCode) {
    return [`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pinCode}&date=${generateCurrentDate()}`];
}

async function findVaccinationCenters(age, vaccine, pin, isFreeVaccineOnly, dose) {
    let numberOfOptionsFound = 0;
    if (age < 18 || age >= 140) {
        const errorEvent = new CustomEvent("errorEvent", {
                detail: {
                    errorMessage: 'Invalid age entered. Please enter a valid age.',
                },
            },
        );
        window.dispatchEvent(errorEvent);
        return true;
    }
    let isCenterFound = false;
    try {
        const {ageToCheck, matchVaccineArray} = generateConfigs(age, vaccine);
        const centersUrlArray = await generateCentersUrl(pin);
        await Promise.all(centersUrlArray.map(async (centersUrl) => {
            const {centers} = await getRequest(centersUrl);
            centers && centers.map((center) => {
                center.sessions && center.sessions.map((session) => {
                    if (session.min_age_limit === ageToCheck && session.available_capacity !== 0 && matchVaccineArray.includes(session.vaccine.toUpperCase())) {
                        const vaccinationLogString = session.vaccine !== '' ? session.vaccine.toUpperCase() : 'Unknown';
                        const feeType = center.fee_type;
                        let cost;
                        if (feeType === 'Free') {
                            cost = feeType;
                        } else if (feeType === 'Paid') {
                            const vaccine = center.vaccine_fees && center.vaccine_fees.find((vacc) => vacc.vaccine === session.vaccine);
                            cost = vaccine ? `Rs. ${vaccine.fee}` : 'Paid';
                        }
                        if(!isFreeVaccineOnly || feeType === 'Free') {
                            numberOfOptionsFound++;
                            isCenterFound = true;
                            const doseObj = dose === '1' ? {dose1Cap: session.available_capacity_dose1} : {dose2Cap: session.available_capacity_dose2};
                            const outputEvent = new CustomEvent("outputEvent", {
                                    detail: {
                                        numberOfOptionsFound,
                                        dose,
                                        ...doseObj,
                                        centerName: center.name,
                                        pin: center.pincode,
                                        district: center.district_name,
                                        date: session.date,
                                        vaccine: vaccinationLogString,
                                        cost,
                                    },
                                },
                            );
                            window.dispatchEvent(outputEvent);
                        }
                    }
                });
            });
        }));
        if (!isCenterFound) {
            const errorEvent = new CustomEvent("errorEvent", {
                    detail: {
                        errorMessage: 'No available centers found in pincode/area for age specified for the next 7 days. Try choosing a nearby pincode/area.',
                    },
                },
            );
            window.dispatchEvent(errorEvent);
        } else {
            player.play('./media/notification.mp3', function (err) {});
        }
        return isCenterFound;
    } catch (e) {
        const errorEvent = new CustomEvent("errorEvent", {
                detail: {
                    errorMessage: `Error occurred: ${e.response.data.error}`,
                },
            },
        );
        window.dispatchEvent(errorEvent);
        return isCenterFound;
    }
}

export default findVaccinationCenters;