const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete credentials.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'tmp/credentials.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), batchGetTranslations);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return callback(err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
        spreadsheetId: '1xSB30WJubOatn1AERzhFR2u3QrkjRYswe7SZX67BxXE',
        range: 'A1:E2',
        // fields: 'properties.title,sheets(sheetProperties,data.rowData.values(effectiveValue,effectiveFormat)'
        fields: 'sheets.properties'
    }, (err, response) => {
        if (err) return console.log('The API returned an error: ' + err);
        console.log('res', response);
        console.log('data', response.data);
        const data = response.data;
        const rows = data.values;
        if (rows.length) {
            // console.log('Name, Major:');
            // Print columns A and E, which correspond to indices 0 and 4.
            // rows.map((row) => {
            //   console.log(`${row[0]}, ${row[4]}`);
            // });
        } else {
            console.log('No data found.');
        }
    });
}

function batchGetTranslations(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.batchGet({
        spreadsheetId: '1xSB30WJubOatn1AERzhFR2u3QrkjRYswe7SZX67BxXE',
        ranges: ['Home', 'Exchange', 'Auth', 'SupportCoupon', 'DepositCrypto', 'MyTrade', 'MyPage', 'DepositFiat', 'translation'],
        majorDimension: 'ROWS'
        // majorDimension: 'COLUMNS'
    }).then(response => {
        console.log('data', response.data);
        const { valueRanges } = response.data;
        const en = {}, ko = {}, id = {};
        valueRanges.forEach(sheetData => {
            const namespace = sheetData.range.split('!')[0];
            const rows = sheetData.values;
            if (rows.length) {
                const codeIndex = rows[0].indexOf('CODE');
                const enIndex = rows[0].indexOf('English');
                const krIndex = rows[0].indexOf('Korean');
                const idIndex = rows[0].indexOf('Bahasa Indonesia');
                let enTranslations = {}, krTranslations = {}, idTranslations = {};
                rows.splice(1).forEach(row => {
                    enTranslations[row[codeIndex]] = row[enIndex];
                    krTranslations[row[codeIndex]] = row[krIndex];
                    idTranslations[row[codeIndex]] = row[idIndex];
                    // enTranslations[row[codeIndex]+'_dev'] = `{t('${row[codeIndex]}', { defaultValue: '${row[enIndex]}' })}`;
                    // krTranslations[row[codeIndex]+'-dev'] = `{t('${row[codeIndex]}', { defaultValue: '${row[krIndex]}' })}`;
                    // idTranslations[row[codeIndex]+'-dev'] = `{t('${row[codeIndex]}', { defaultValue: '${row[idIndex]}' })}`;
                })
                //fs.writeFile(`src/client/locales/en/${namespace}.js`, `export default ${JSON.stringify(enTranslations, undefined, 4)}`, err => err && console.log(err))
                //fs.writeFile(`src/client/locales/ko/${namespace}.js`, `export default ${JSON.stringify(krTranslations, undefined, 4)}`, err => err && console.log(err))
                //fs.writeFile(`src/client/locales/id/${namespace}.js`, `export default ${JSON.stringify(idTranslations, undefined, 4)}`, err => err && console.log(err))
                fs.writeFile(`src/locales/en/${namespace}.json`, JSON.stringify(enTranslations, undefined, '\t'), err => err && console.log(err))
                fs.writeFile(`src/locales/ko/${namespace}.json`, JSON.stringify(krTranslations, undefined, '\t'), err => err && console.log(err))
                fs.writeFile(`src/locales/id/${namespace}.json`, JSON.stringify(idTranslations, undefined, '\t'), err => err && console.log(err))
                //en[namespace] = enTranslations;
                //ko[namespace] = krTranslations;
                //id[namespace] = idTranslations;
            } else {
                console.log('No data found in', sheetData.range);
            }
        })
        // console.log('en', en);
        // console.log('ko', ko);
        // console.log('id', id);
        //fs.writeFile('src/client/locales/en.json', JSON.stringify(en, undefined, 4), 'utf8');
        //fs.writeFile('src/client/locales/ko.json', JSON.stringify(ko, undefined, 4), 'utf8');
        //fs.writeFile('src/client/locales/id.json', JSON.stringify(id, undefined, 4), 'utf8');
    }, err => {
        console.log('The API returned an error: ' + err)
        process.exitCode = 1
        //process.exit(1)
    })
        .catch(err => {
            console.log('The Parser returned an error: ' + err)
            process.exitCode(1)
		})
}
