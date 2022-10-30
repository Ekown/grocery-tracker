const {
    v4: uuidv4,
} = require('uuid');

module.exports = {
    /**
     * Generate mock array for seeding
     * 
     * @param {Number} intNumber 
     * @param {String} strName 
     * @param {Function} objAdditionalProperties 
     * @returns {Array}
     */
    generateMockSeedArrays: function (intNumber, strName, fnAdditionalProperties = () => {}) {
        return new Array(intNumber).fill({}).map((initialValue, intIndex) => {
            let t = new Date();

            // Add seconds to the date depending on the current index to simulate unique timestamps 
            t.setSeconds(t.getSeconds() + intIndex);

            return {
                ...initialValue,
                ...fnAdditionalProperties(intIndex), // We need to call the function to dump the additional properties
                id: uuidv4(),
                name:`${strName} ${(intIndex + 1)}`,
                date_entered: t,
                date_modified: t,
            };
        });
    }
}