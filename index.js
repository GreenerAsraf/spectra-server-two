const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT||5000;

const app = express();



app.use(cors());
app.use(express.json());







const uri = "mongodb+srv://dbuser:JbWGu4f4ZAZ1T4Xl@cluster0.ryc7o3n.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    // const userCollection = client.db("spectra").collection("users");
    const commentCollection = client.db("spectra").collection("comments");
    // create a document to insert
    // const user = {
    //   title: "Record of a Shriveled Datum",
    //   content: "No bytes, no problem. Just insert a document, in MongoDB",
    // }

    // const result = await userCollection.insertOne(user);
    // console.log(`A document was inserted with the _id: ${result}`);

    app.get('/create', async (req, res) =>{
      const query = {};
      const comments = await commentCollection.find(query).toArray();
      res.send(comments)

    })


    app.post('/comments',async (req,res)=>{
      const comment = req.body;
      console.log(comment);
      const result = await commentCollection.insertOne(comment);

    })
  }
   finally {
    
  }
}
run().catch(err => console.log(err) );

app.get('/', (req, res) => {
  res.send('Spectra server is running on the root route')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// user: dbuser 
// pass: JbWGu4f4ZAZ1T4Xl

