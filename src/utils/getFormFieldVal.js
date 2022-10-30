/**
 * @param {Object} evt - The event triggered by the OnChange event of the react bootstrap form
 * @returns {Object} - The object with the key and value of the target
 */
export default function getFormFieldVal (evt) {
    const key = evt.target.name;
    const { value } = evt.target;
    const obj = {};
    obj[key] = value;
    return obj;
}
