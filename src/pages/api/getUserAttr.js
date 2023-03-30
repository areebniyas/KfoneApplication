const { connectToDatabase } = require('../../lib/mongodb');

export default async (req, res) => {
    try {
        
        // connect to the database
        let { db } = await connectToDatabase();

        switch(req.method){
            case "GET":
                let sub1 = req.query.sub;
                let field1 = req.query.field;
        
                // find the user document with the specified sub
                let user = await db
                  .collection('users')
                  .findOne({ sub: sub1 });
        
                if (!user) {
                  return res.status(404).json({
                    message: 'User not found',
                    success: false,
                  });
                }
        
                // get the value of the specified field in the user document
                let value1 = user[field1];
        
                return res.json({
                  message: value1,
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
