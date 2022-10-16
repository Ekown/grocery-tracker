/**
 * CONFIGURATION file to deploy the correct variables for each environment
 * new environment can be added to the scripts to the package.json file
 * for example:
 *   'start': 'REACT_APP_STAGE=local npm-run-all -p watch-css start-js',
 *   'build': 'npm run build-css && react-scripts build',
 *   'build-dev': 'REACT_APP_STAGE=dev react-scripts build',
 *   'build-prod': 'REACT_APP_STAGE=prod react-scripts build',
 *   'build-qa': 'REACT_APP_STAGE=qa react-scripts build',
 *
 * The common constant will have the common variables between the environments
 */

/**
 * The variables to use in ENV environment when is run locally
 */
 const local = {
    // API_URL: 'http://localhost:3001',
    API_URL: 'https://grocery-tracker-app.onrender.com',
};

/**
 * The variables to use in PROD environment
 */
const prod = {
    API_URL: 'https://grocery-tracker-app.onrender.com',
};

/**
 * The common variables to use in any environment
 */
const common = {
    
};

const config = () => {
    if (process.env.REACT_APP_STAGE === 'production') {
        return prod;
    }

    return local;
};

export default {
    ...common,
    ...config()
};