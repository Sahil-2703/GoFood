const mongoose = require("mongoose");
const mongoURI = "mongodb://0.0.0.0:27017/GoFood";

mongoose.set("strictQuery", true);


const mongoDB = async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true }, (err, result) => {
    if (!err) {
      console.log("connected");
      const fetchedData = mongoose.connection.db.collection("FoodList");

      fetchedData.find({}).toArray(async function (err, data) {
        const foodCategory = await mongoose.connection.db.collection("Category");
        foodCategory.find({}).toArray(function (err, catData){
          if(err) console.log(err);
          else global.Category = catData;
        })
        try{
          global.FoodList = data;
          // console.log(global.FoodList)
        }
        catch{
            console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
};

module.exports = mongoDB;