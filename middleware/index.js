var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");

// All the middleware
var middlewareObj = {};

middlewareObj.ownsCampground = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("/campgrounds");
            }
            else{
                //check if user id is creator id
                if(foundCampground.author.id.equals(req.user._id))
                {
                    next();
                }
                else{
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that!")
        res.redirect("back");
    }
}

middlewareObj.ownsComment = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.cid, function(err, foundComment){
            if(err){
                res.redirect("back");
            }
            else{
                //check if user id is creator id
                if(foundComment.author.id.equals(req.user._id))
                {
                    next();
                }
                else{
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}


module.exports = middlewareObj;