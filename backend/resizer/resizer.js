const AWS = require('aws-sdk');
const S3 = new AWS.S3({ signatureVersion: 'v4' });
const DynamoDBDocClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
const uuidv4 = require('uuid/v4');
const Sharp = require('sharp');

// const DYNAMODB_PHOTOS_TABLE_NAME = process.env.DYNAMODB_PHOTOS_TABLE_ARN.split('/')[1] || 'Photo-yfg5aavdwzh57ogmwlk2cstrla'
// const THUMBNAIL_WIDTH = parseInt(process.env.THUMBNAIL_WIDTH, 10) || 80
// const THUMBNAIL_HEIGHT = parseInt(process.env.THUMBNAIL_HEIGHT, 10) || 80
const DYNAMODB_PHOTOS_TABLE_NAME = 'Photo-yfg5aavdwzh57ogmwlk2cstrla'
const THUMBNAIL_WIDTH = 80
const THUMBNAIL_HEIGHT = 80

function thumbnailKey(filename) {
    return `public/resized/${filename}`;
}
function fullsizeKey(filename) {
    return `public/${filename}`;
}
function makeThumbnail(photo) {
    return Sharp(photo).resize(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT).toBuffer();
}
async function resize(bucketName, filename) {
    const key = `raw/${filename}`
    const originalPhoto = (await S3.getObject({ Bucket: bucketName, Key: key }).promise()).Body
    const originalPhotoDimensions = await Sharp(originalPhoto).metadata();
    const thumbnail = await makeThumbnail(originalPhoto);
    await Promise.all([
        S3.putObject({
            Body: thumbnail,
            Bucket: bucketName,
            Key: thumbnailKey(filename),
        }).promise(),
        S3.copyObject({
            Bucket: bucketName,
            CopySource: bucketName + '/' + key,
            Key: fullsizeKey(filename),
        }).promise(),
    ]);
    // await S3.deleteObject({
    //     Bucket: bucketName,
    //     Key: key
    // }).promise();
    return {
        photoId: filename,

        thumbnail: {
            key: thumbnailKey(filename),
            width: THUMBNAIL_WIDTH,
            height: THUMBNAIL_HEIGHT
        },
        fullsize: {
            key: fullsizeKey(filename),
            width: originalPhotoDimensions.width,
            height: originalPhotoDimensions.height
        }
    };
};

async function processRecord(bucketName, filename, albumId) {
    const sizes = await resize(bucketName, filename);
    const id = uuidv4();
    const item = {
        id: id,
        owner: 'hardcoded', // use cognito
        photoAlbumId: albumId,
        bucket: bucketName,
        thumbnail: sizes.thumbnail,
        fullsize: sizes.fullsize,
        createdAt: new Date().getTime()
    }
    await storePhotoInfo(item);
    return item
}

function storePhotoInfo(item) {
    const params = {
        Item: item,
        TableName: DYNAMODB_PHOTOS_TABLE_NAME
    };
    return DynamoDBDocClient.put(params).promise();
}

module.exports.main = async (event, context) => {
    return processRecord('sls-resizer', event.key, event.albumId)
};
