const express = require('express');
const fileUpload = require("express-fileupload");
const mongoose = require('mongoose');
const app = express();
const stream = require('stream');
const { port, dbPath, authUrl } = require('./config');

const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const {books} = require('googleapis/build/src/apis/books');
const { FileType } = require('./models')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// app.use(fileUpload({
//     limits: { fileSize: 50 * 1024 * 1024 },
// }));

app.use(fileUpload({
    createParentPath: true,
}));

// ===
// const CREDENTIALS_PATH = path.join(__dirname + 'credentials.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];


// подготовка объекта данных для авторизации
const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: SCOPES
})

// сохранение файла на гугл диске
const uploadFile = async (file) => {
    if (!file) {
        throw new Error('файл отсутствует');
    }

    // создаем объект стрима
    const bufferStream = new stream.PassThrough();
    // стримим буфер файла в поток
    bufferStream.end(file.data);

    // запускаем авторизацию пользователя
    const { data } = await google.drive({
        version: 'v3',
        auth: auth
    }).files.create({ // создаем файл
        media: {
            mimeType: file.mimeType, // указываем его мим тайп
            body: bufferStream // бинарный вид отправляем
        },
        requestBody: {
            name: file.name, //  имя файла
            parents: ['1058cufh8HrBgfwwIel9AkY1OqVbRkbzK'] // идентификатор папки на гугл диске
        },
        fields: 'id,name'
    });

    return data;
}

const getPhotoAboutMe = async () => {
    let result = null;
    try {
        result = await FileType
            .find({ app: 'my-page', category: 'about-my' }).exec();

        if (!result.length) {
            return null
        }
    } catch (e) {
        console.log('file find error: ', e)
    }

    const service = google.drive({version: 'v3', auth});

    const fileId = result[0].fileId;
    const name = result[0].name;

    try {
        const file = await service.files.get({
            fileId: fileId,
            // alt: 'media',
            fields: 'webViewLink'
        });
        // console.log(file);
        return {
            url: file.data.webViewLink,
            name: name,
            fileId: fileId,
        };
    } catch (err) {
        // TODO(developer) - Handle error
        console.log('error await service.files.get: ', e)
        // throw err;
    }
}



// // работа с гугл диском
// // If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = path.join(process.cwd(), 'token.json');
// const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
//
// /**
//  * Reads previously authorized credentials from the save file.
//  *
//  * @return {Promise<OAuth2Client|null>}
//  */
// async function loadSavedCredentialsIfExist() {
//     try {
//         const content = await fs.readFile(TOKEN_PATH);
//         const credentials = JSON.parse(content);
//         return google.auth.fromJSON(credentials);
//     } catch (err) {
//         return null;
//     }
// }
//
// /**
//  * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
//  *
//  * @param {OAuth2Client} client
//  * @return {Promise<void>}
//  */
// async function saveCredentials(client) {
//     const content = await fs.readFile(CREDENTIALS_PATH);
//     const keys = JSON.parse(content);
//     const key = keys.installed || keys.web;
//     const payload = JSON.stringify({
//         type: 'authorized_user',
//         client_id: key.client_id,
//         client_secret: key.client_secret,
//         refresh_token: client.credentials.refresh_token,
//     });
//     await fs.writeFile(TOKEN_PATH, payload);
// }
//
// /**
//  * Load or request or authorization to call APIs.
//  *
//  */
// async function authorize() {
//     let client = await loadSavedCredentialsIfExist();
//
//     console.log('client1: ', client);
//
//     if (client) {
//         return client;
//     }
//
//     console.log('SCOPES: ', SCOPES)
//     console.log('CREDENTIALS_PATH', CREDENTIALS_PATH)
//
//     client = await authenticate({
//         scopes: SCOPES,
//         keyfilePath: CREDENTIALS_PATH,
//         // keyfile: path.join(__dirname, 'credentials.json'),
//     });
//
//     console.log('clientxxx: ', client);
//
//     if (client.credentials) {
//         await saveCredentials(client);
//     }
//     return client;
// }
//
// /**
//  * Lists the names and IDs of up to 10 files.
//  * @param {OAuth2Client} authClient An authorized OAuth2 client.
//  */
// async function listFiles(authClient) {
//     console.log('run listFiles')
//     const drive = google.drive({version: 'v3', auth: authClient});
//     const res = await drive.files.list({
//         pageSize: 10,
//         fields: 'nextPageToken, files(id, name)',
//     });
//     const files = res.data.files;
//     if (files.length === 0) {
//         console.log('No files found.');
//         return;
//     }
//
//     console.log('Files:');
//     files.map((file) => {
//         console.log(`${file.name} (${file.id})`);
//     });
// }


// рабочие роуты
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/upload', async function(req, res) {
    if (!req.files) {
        return res.status(400).send('файл для загрузки не предоставлен');
    }

    if (!req.body.app) {
        return res.status(400).send('поле app пустое');
    }

    if (!req.body.category) {
        return res.status(400).send('поле category пустое');
    }

    const file = req.files.file;
    // узнаем расширение файла если не подходит то выдаем ошибку
    const extName = path.extname(file.name);
    const extList = ['.png','.jpg','.jpeg'];

    if(!extList.includes(extName)) {
        return res.status(422).send('формат файла не подходит');
    }

    let data;

    try {
        // сохранение на гугл диске
        data = await uploadFile(file);
    } catch (e) {
        console.log('error uploadFile', e)
    }

    const { app, category } = req.body;
    const { id } = data;

    try {
        // создание модели в БД
        const fileType = await FileType.create({
            fileId: id,
            name: file.name,
            mimeType: String(file.mimetype),
            app: app,
            category: category,
            storage: 'google-drive',
            url: 'test',
        });

        await fileType.save();

    } catch (e) {
        console.log('FileType.create error: ', e);
        return false;
    }

    return res.status(200).json({
        status: true
    });
});

app.get('/getAboutMePhoto', async (req, res) => {
    console.log('get Photo')
    const result = await getPhotoAboutMe();

    if (!result) {
        return res.status(200).json({
            message: 'загруженная картинка отсутствует'
        });
    }

    return res.status(200).json({
        result
    });
})

app.delete('/delete', async (req, res) => {
    const { fileId } = req.body;

    console.log('fileId: ', fileId);

    // last code delete file from google drive


    res.status(200).json({
        xxx: 'xxx'
    })
})

// старт базы данных
const startMongo = async (dbPath) => {
    if (!dbPath) {
        throw new Error(`Ошибка упсс === [${dbPath}] путь к монге вы не отправили`);
    }
    await mongoose.connect(dbPath);
    console.log('запущен БД работы с файлами')
}


// старт сервера
const startServer = (port) => {
    return new Promise((resolve) => {
        app.listen(port, () => {
            console.log(`Запущен сервер для работы с файлами ${port}`);
            resolve();
        })
    })
}

// в начале старт бд а потом сервера
startMongo(dbPath) // стартуем бд
    .then(() => startServer(port))// стартуем сервер
    .catch(err => console.log(err.message));

