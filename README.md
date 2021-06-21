# Indian Vaccine Slot Finder

[Website Link](https://hkjain14.github.io/)

This website would give you the following details about Covid-19 Indian vaccination slot availability for the next **7 days**:

1. Date of availability
2. Available Center
3. Pincode
4. District   
5. No. of preferred slots available at the center
6. Vaccine Provided at center
7. Cost of vaccine


### Input parameters

This website can be used to filter out slots on basis of :

1. Age
2. Pincode
3. Vaccine Preference (Optional)
4. Option to fetch only free vaccination slots
5. Specifying dose number

### Note :

If no vaccine is specified, both the vaccines' results would be displayed.


### References
This script uses the API provided by the Government of India [here](https://apisetu.gov.in/public/marketplace/api/cowin).

### Disclaimer
The exposed API sometimes give stale data. Please confirm actual availability on [Cowin](https://www.cowin.gov.in).

I have personally observed that the same center shows different number of available slots when searched via pincode as compared to when searched via district.
