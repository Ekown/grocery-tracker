const {
    v4: uuidv4,
} = require('uuid');

module.exports = {
    /**
     * Generate mock array for seeding
     * 
     * @param {Number} intNumber Number of elements of the mock seed array
     * @param {String|null} strName Mock name for the seeds
     * @param {Function|null} objAdditionalProperties Function that returns an object of additional properties
     * 
     * @returns {Array} Generated mock seed array
     */
    generateMockSeedArrays: function (intNumber, strName = null, fnAdditionalProperties = () => {}) {
        return new Array(intNumber).fill({}).map((initialValue, intIndex) => {
            let t = new Date();

            // Add seconds to the date depending on the current index to simulate unique timestamps 
            t.setSeconds(t.getSeconds() + intIndex);

            let mockSeed = {
                ...initialValue,
                ...fnAdditionalProperties(intIndex), // We need to call the function to dump the additional properties
                id: uuidv4(),
                date_entered: t,
                date_modified: t,
            };

            // If there is a passed name in the argument, use it
            if (strName) {
                mockSeed.name = `${strName} ${(intIndex + 1)}`;
            }

            return mockSeed;
        });
    }
}