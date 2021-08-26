const express = require('express');
const UserToSeasonModel = require('../models/UserToSeasonModel.js');
const router = express.Router();

//http://localhost:3001/userscomment/
router.get('/', 
    (req, res) => {

        UserToSeasonModel
        .find()
        .then(
            (dbDocument)=>{
                res.send(dbDocument)
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )

    }
);

router.post('/create',
    (req, res) => {
        const formData = {            
            email: req.body.email,
            seasonDetail: req.body.seasonDetail,
            comment: req.body.comment
             }
            UserToSeasonModel
            .create(
                formData
            )
            .then(
                (dbDocument) => {
                    res.json(
                        {
                            dbDocument: dbDocument,
                            status: "successful"
                        }
                    );
                }
            )
            .catch(
                (error) => {
                    console.log(error);
                    res.json(
                        {
                            status: "unsuccessful",
                            exception:error
                        }
                    )
                }
            );
        }    
)

module.exports = router;