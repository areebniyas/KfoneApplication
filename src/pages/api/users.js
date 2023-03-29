const { connectToDatabase } = require('../../lib/mongodb');

export default async (req, res) => {
    try {
        let userId  = req.query.userId
        
        // connect to the database
        let { db } = await connectToDatabase();

        switch(req.method){
            case "POST":
                let bodyObject = JSON.parse(req.body);
                let myPost = await db.collection("users").insertOne(bodyObject);
                res.json(myPost.ops[0]);
                break;
            case "GET":
                 // fetch the posts
                 let services = await db
                    .collection('users')
                    .find({ id: parseInt(userId) })
                    .sort({ published: -1 })
                    .toArray();
                // return the posts
                res.json({
                    message: JSON.parse(JSON.stringify(services)),
                    success: true,
                });
                break;
        }

       return res.json;

    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
};