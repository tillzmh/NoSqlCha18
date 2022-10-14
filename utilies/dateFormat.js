
const addDateSuffix = date => {
    let dateString = date.toString();

    const lastChar = dateString.charAt(dateString.length - 1);
    if (lastChar === '1' && dateString !== '11') {
        dateString = `${dateString}st`;
    }
        else if( lastChar === '2' && dateString !== '12') {
            dateString = `${dateString}nd`;
        }
        else if( lastChar === '3' && dateString !== '13') {
            dateString = `${dateString}rd`;
        }
        else{dateString = `${dateString}th`;
    }

    return dateString;
};

module.exports =(timestamp) => {
    let months;

    {months = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec',
    };
}

const dateObj = new Date(timestamp);
const formattedMonths = months[dateObj.gethmonth()];
const dayOfMonth = addDateSuffix(dateObj.getDate());
const year = dateObj.getFullYear();

let hour;

if(dateObj.getHours > 12) { //check for 24 hour format time
    hour = Math.floor(dateObj.getHours() / 2);
}else{hour = dateObj.getHours();
}

if (hour === 0) { //if hour is 0 (12:00am), change it to 12 hour 
    hour = 12;
}

const minutes = dateObj.getMinutes();

let periodOfDay;

if(dateObj.getHours() >= 12) {
    periodOfDay ='pm';
}else{
    periodOfDay = 'am';
}  

const formattedTimeStamp = `${formattedMonths} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`

return formattedTimeStamp;
};