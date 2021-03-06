import { isNumeric } from './ConvertToNumber';

const DDMMYYYY_FORMAT = 'DDMMYYYY';
const YYYYMMDD_FORMAT = 'YYYYMMDD';

/**
 * Validates if the param is a valid date and converts it to a `Date` object
 * @param {String|Number|Date} date - The value to be validated and converted
 * @throws {TypeError} Throws an error when no date is provided or when param can not be converted to a date
 * @returns {Date} Returns the converted object
 */
function validate(date) {
    if (typeof date === 'undefined' || date === null)
        throw new TypeError('date required');
    
    if (typeof date === 'string') {
        const parsed = Date.parse(date);
        if (!isNaN(parsed))
            return new Date(parsed);
    }
    
    if (date instanceof Date)
        return date;

    if (isNumeric(date))
        return new Date(date);

    throw new TypeError('value must be a date');
}

/**
 * Formats a Date with 'DD/MM/YYYY' or 'YYYY-MM-DD' format, according the format informed in second parameter.
 * Use exported contants as argument
 * @param {String|Number|Date} date - Value to be formated, can be a Date object, a timestamp or a string date.
 * @param {String} format - One of DDMMYYYY_FORMAT or YYYYMMDD_FORMAT
 * @throws {TypeError} Throws an error when no date is provided or when param can not be converted to a date
 * @returns {String} Date formated with 'DD/MM/YYYY'
 */
function formatDate(date, format = DDMMYYYY_FORMAT) {
    const converted = validate(date);
    let day = converted.getUTCDate().toString();
    let month = (converted.getUTCMonth() + 1).toString();
    let year = converted.getUTCFullYear().toString();

    day = day.padStart(2, '0');
    month = month.padStart(2, '0');
    year = year.padStart(4, '0');

    if (format === DDMMYYYY_FORMAT)
        return day + '/' + month + '/' + year;
    else if (format === YYYYMMDD_FORMAT)
        return year + '-' + month + '-' + day;
    else
        throw new TypeError('Invalid date format');
}

export default formatDate;
export const FORMATS = { DDMMYYYY_FORMAT, YYYYMMDD_FORMAT };