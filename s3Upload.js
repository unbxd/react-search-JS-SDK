const { exec } = require('child_process');

const processArgs = process.argv.slice(2);

const [tagValue = 'temp'] = processArgs;

const uploadJs = `aws s3 cp public/dist/js/reactSearch.min.js s3://unbxd/react-search-sdk/${tagValue}/reactSearch.min.js --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --cache-control 'public,max-age=2592000' --content-encoding 'gzip'`;
const uploadCss = `aws s3 cp public/dist/css/reactSearch.min.css s3://unbxd/react-search-sdk/${tagValue}/reactSearch.min.css --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --cache-control 'public,max-age=2592000' --content-encoding 'gzip'`;
const uploadThemeCss = `aws s3 cp public/dist/css/theme.min.css s3://unbxd/react-search-sdk/${tagValue}/theme.min.css --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --cache-control 'public,max-age=2592000' --content-encoding 'gzip'`;

exec(uploadCss, (err, stdout, stderr) => {
    if (err) {
        //some err occurred
        console.error(err);
    } else {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    }
});

exec(uploadThemeCss, (err, stdout, stderr) => {
    if (err) {
        //some err occurred
        console.error(err);
    } else {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    }
});

exec(uploadJs, (err, stdout, stderr) => {
    if (err) {
        //some err occurred
        console.error(err);
    } else {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    }
});
