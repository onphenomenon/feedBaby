Meteor.publish("feeds",function(){
  if(typeof this.userId != undefined)
    return Feeds.find({owner: this.userId});
});
