Meteor.methods({
  addFeed: function(amount){
    /*
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }
    */
    Feeds.insert({
      amount: amount,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });


  },
  addPoop: function() {

    Poopies.insert({
      createdAt: new Date(),
      owner: Meteor.userId()
    });
  }
});
