var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
    {
        name:"Rocky Mountain",
        image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        name:"Starry Skies",
        image: "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        name:"Woody Woods",
        image: "https://images.pexels.com/photos/6714/light-forest-trees-morning.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        name:"Beach Heaven",
        image: "https://images.pexels.com/photos/176381/pexels-photo-176381.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campground");
        //Add new campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err,campground){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log("Added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "Good review",
                            author: "Cutlass"
                        },function(err, comment)
                        {
                            if(err)
                            {
                                console.log(err);
                            }
                            else
                            {
                                campground.comments.push(comment);
                                campground.save();
                                // function(err, dataa){
                                //     if(err)
                                //     {
                                //         console.log(err);
                                //     }
                                //     else{
                                //         console.log(dataa);
                                //     }
                                // }
                                console.log("Created comment");
                            }
                        }
                    );
                }
            });
        });
    });
}

module.exports = seedDB;
