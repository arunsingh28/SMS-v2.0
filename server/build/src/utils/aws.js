"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var envConfig_1 = __importDefault(require("../../config/envConfig"));
var multer_1 = __importDefault(require("multer"));
var multer_s3_1 = __importDefault(require("multer-s3"));
aws_sdk_1.default.config.update({
    accessKeyId: envConfig_1.default.AWS_ACCESS_ID,
    secretAccessKey: envConfig_1.default.AWS_SECRET_KEY,
    region: 'ap-south-1',
    signatureVersion: 'v4',
});
var s3 = new aws_sdk_1.default.S3();
var upload = multer_1.default({
    storage: multer_s3_1.default({
        s3: s3,
        bucket: envConfig_1.default.AWS_BUCKET_NAME,
        acl: "public-read",
        metadata: function (req, file, next) {
            next(null, { fielName: file.fieldname });
        },
        key: function (req, file, next) {
            // file name in aws
            next(null, Date.now().toString() + "-" + file.originalname);
        },
    }),
});
var deleteObject = function (key) {
    s3.deleteObject({
        Bucket: envConfig_1.default.AWS_BUCKET_NAME,
        Key: key,
    }, function (err, data) {
        if (err) {
            console.log(err);
            // reject(err)
        }
        else {
            console.log(data);
            // resolve(data)
        }
    });
};
exports.default = { deleteObject: deleteObject, upload: upload };
