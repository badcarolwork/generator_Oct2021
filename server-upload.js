const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;
const fs = require('fs');
const replace = require('replace-in-file');


const app = express();

let newPath;
let newImgPath;

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
exports.imageFilter = imageFilter;

app.use(express.static('public'))

app.post('/upload', (req, res) => {

    const path = "./file/" + uuid();

    // create new folder
    fs.mkdir(path, (err) => {
        if (err) {
            console.log(err)

        } else {
            newPath = path;

            if (newPath != '' && fs.existsSync(newPath)) {
                // create img path and store img

                fs.mkdir(newPath + '/img', (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        newImgPath = newPath + '/img';

                        if (fs.existsSync(newImgPath)) {
                            const storage = multer.diskStorage({
                                destination: (req, file, cb) => {
                                    cb(null, newImgPath);
                                },
                                filename: (req, file, cb) => {
                                    let bkImg;
                                    const { originalname } = file;
                                    bkImg = file;
                                    cb(null, originalname)
                                }
                            })

                            const upload = multer({ storage }).fields([{ name: "bgImg" }, { name: "bannerImg" }])

                            upload(req, res, (err) => {
                                // console.log(req.body)
                                if (req.fileValidationError) {
                                    return res.send(req.fileValidationError);
                                }
                                else if (!req.files) {
                                    return res.send('Please select an image to upload');
                                }
                                else if (err instanceof multer.MulterError) {
                                    return res.send(err);
                                }
                                else if (err) {
                                    return res.send(err);
                                } else {
                                    // get img file names
                                    let bgImgName, bannerImgName, imgname = [];
                                    Object.values(req.files).map(i => {
                                        i.forEach((v) => {
                                            imgname.push(v.originalname)
                                        })
                                    });
                                    bgImgName = imgname[0];
                                    bannerImgName = imgname[1];

                                    // copy file from sample folder to newPath
                                    const vib300250 = ['index.html', 'basicTracking.js', 'basicVideo.js', '300250.css', 'video_300250_contain-up.css'];
                                    fs.copyFile('./file/vib/' + ele, newPath + '/' + ele, (err) => {
                                        if (err) {
                                            throw err;
                                        } else {
                                            // get input val from form
                                            // let lpUrl = req.body.lpUrl;
                                            // let basicUrl = req.body.basicUrl;
                                            let vidSrc = req.body.vidSrc;
                                            let fldSrc = req.body.fldSrc;
                                            let fldType = req.body.fldType;
                                            let fldCat = req.body.fldCat;
                                            let fldU3 = req.body.fldU3;
                                            let fldU4 = req.body.fldU4;

                                            // rewrite the elements in basicTracking JS
                                            const index = {
                                                files: newPath + '/index.html',
                                                from: ['_exitImgPath', '_bgImgPath'],
                                                to: [bgImgName, bannerImgName],
                                            };
                                            // const vidTrack = {
                                            //     files: newPath + '/basicVideo.js',
                                            //     from: ['_basicUrlPath', '_vidFilePath', '_fldSrc', '_fldType', '_fldCat', '_fldU3', '_fldU4'],
                                            //     to: [basicUrl, vidSrc, fldSrc, fldType, fldCat, fldU3, fldU4],
                                            // };

                                            const bsTrack = {
                                                files: newPath + '/basicTracking.js',
                                                from: [ '_fldSrc', '_fldType', '_fldCat', '_fldU3', '_fldU4','_vidFilePath'],
                                                to: [ fldSrc, fldType, fldCat, fldU3, fldU4,vidSrc ],
                                            };

                                            replace(bsTrack)
                                                .then(results => {
                                                    console.log('Replacement results:', results);
                                                })
                                                .catch(error => {
                                                    console.error('Error occurred:', error);
                                                });
                                        }
                                    });
                                }

                            })
                        }
                    }
                })
            }


        }

    })
});

app.listen(3001, () => console.log("app listening"));