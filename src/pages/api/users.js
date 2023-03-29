const { connectToDatabase } = require('../../lib/mongodb');

export default async (req, res) => {
    try {
        
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
                    .find({  })
                    .sort({ published: -1 })
                    .toArray();
                // return the posts
                res.json({
                    message: JSON.parse(JSON.stringify(services)),
                    success: true,
                });
                break;
            case "PUT":
                let sub = req.query.sub;
                let field = req.query.field;
                let value = req.body;
                var obj = {};
                obj[field] = value;

                const result = await db 
                    .collection('users')
                    .updateOne({ sub: sub },{ $set:  obj  });
                
                  res.status(200).json({ message: 'Update successful' });
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