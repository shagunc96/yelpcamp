var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments new
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

//Comments create
router.post("/", middleware.isLoggedIn, function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
                //add username and id 
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                //save comment
                comment.save();
                campground.comments.push(comment);
                campground.save();
                req.flash("success", "Successfully created comment!");
                res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});

//Edit Comments
router.get("/:cid/edit", middleware.ownsComment, function(req, res){
    Comment.findById(req.params.cid, function(err, foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

router.put("/:cid", middleware.ownsComment, function(req, res){
    Comment.findByIdAndUpdate(req.params.cid, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(req.body);
            res.redirect("back");
        }
        res.redirect("/campgrounds/" + req.params.id);
    });
});

router.delete("/:cid", middleware.ownsComment, function(req, res){
    Comment.findByIdAndRemove(req.params.cid, function(err){
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("success", "Comment deleted");
            res.redirect("back");
        }
    });
});


module.exports = router;
