var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [
    {
        name: "Rohtang", 
        image:"https://pixabay.com/get/5fe8d1434852b108f5d084609620367d1c3ed9e04e50744f742872d1954ecc_340.jpg",
        description:"blah blah blah"
    },
    {
        name: "Manali", 
        image:"https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732e7cdd924fc651_340.jpg",
        description:"Manali is a high-altitude Himalayan resort town in India’s northern Himachal Pradesh state. It has a reputation as a backpacking center and honeymoon destination. Set on the Beas River, it’s a gateway for skiing in the Solang Valley and trekking in Parvati Valley. It's also a jumping-off point for paragliding, rafting and mountaineering in the Pir Panjal mountains, home to 4,000m-high Rohtang Pass."
    },
    {
        name: "Kullu", 
        image:"https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c732e7cdd924fc651_340.jpg",
        description:"blah blah blah"
    }
]

function seedDB(){
    
            data.forEach(function(seed){
                Campground.create(seed,function(err,campground){
                    if(err){
                        console.log(err)
                    }else{
                        console.log("added a campground")
                        Comment.create({
                            text: "This is a great place, but i wish there was internet",
                            author: "Pikun"
                        },function(err, comment){
                            if(err){
                                console.log(err)
                            }else{
                            campground.comments.push(comment)
                            campground.save();
                            console.log("Created new comment")
                            }
                        });
                        }
                    })
                })
        }
        
    
    
    //adding comments


module.exports = seedDB;
