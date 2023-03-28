const { connectToDatabase } = require('../../lib/mongodb');

export default async (req, res) => {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the posts
        let services = await db
            .collection('services')
            .find({})
            .sort({ published: -1 })
            .toArray();
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(services)),
            success: true,
        });
    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
};