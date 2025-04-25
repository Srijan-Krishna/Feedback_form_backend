const express=require("express");
const app=express();
const cors=require("cors");
const {db}=require("./firebase");
require('dotenv').config();

app.use(cors());
app.use(express.json());


app.post("/post-feedback",async(req,res)=>{
    try{
    const {name,email,message}=req.body;
    await db.collection("feedbacks").add({ name, email, message , timestamp: new Date() });
    res.status(200).send("Feedback submitted successfully!");
    }
    catch(err){
        console.error("Error saving feedback:", err);
        res.status(500).send("Error saving feedback.");
    }
});

app.get("/get-feedback", async (req, res) => {
  try {
    const data = await db
      .collection("feedbacks")
      .orderBy("timestamp", "desc") 
      .get();

    const feedbacks = data.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).send("Error fetching feedbacks.");
  }
});


app.listen(process.env.PORT,()=>{
    console.log(`app is listening on port ${process.env.PORT}`);
});