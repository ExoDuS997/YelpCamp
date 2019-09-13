var express = require("express")
var router = express.Router()
var Campground = require("../models/campground")
var middleware = require("../middleware/index.js")
router.get("/campgrounds",function(req,res){
    Campground.find({},function(err, campgrounds){
        if(err){
            console.log(err)
        }else{
            res.render("campgrounds/index",{campgrounds:campgrounds}); 
        }
    })
});

router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
    var name = req.body.name;
    var price = req.body.price
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price:price, image: image, description:desc, author:author };
    
    Campground.create(newCampground,function(err,newlycamp){
        if(err){
            console.log(err)
        }else{
            res.redirect("/campgrounds");
        }
    })
    

});

router.get("/campgrounds/new",middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

router.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err)
        }else{
            res.render("campgrounds/shows", {campgrounds:foundCampground});
        }
    })
    });

router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground})
    })    
    
        
})

router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campgrounds,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds")
        }else{
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            req.flash("success", "Campground deleted")
            res.redirect("/campgrounds");
        }
    })
})





module.exports= router