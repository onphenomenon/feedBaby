//Sleeps = new Mongo.Collection("sleeps");


Meteor.startup(function(){
  /*
  Template.feed.rendered = function() {
    $("div .feed").append('<div class="inc button">+</div><div class="dec button">-</div>');
  }
  */
});




if(Meteor.isClient){
  Meteor.subscribe("feeds");

  Template.body.rendered = function(){

    if(!$('#feed_amount').data('uiSlider')){
      $("#feed_amount").slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: 60,
        slide: function( event, ui ) {
          $( "#amount" ).val( ui.value );
        }
      });
    }
  },

  Template.barChart.rendered = function(){
    console.log('rendered');
      var dataset = Feeds.find({}, {fields: {amount: 1}}).fetch();

      if(typeof dataset != "undefined" && dataset)
      {
        //console.log(dataset);
        //dataset = dataset.fetch();
        if(dataset && dataset.length > 0){
          console.log(dataset)
          //console.log(dataset);
          var amounts = dataset.map(function(d){
              return d.amount
          });
          console.log(amounts);
            //put all amounts into array.

        //define constants, height/width
            var w = 500;
            var h = 100;
            //var barPadding = 1;
            //define scales and axes
            //define key function to bind elements to documents
            var svg = d3.select("#barChart")
                      .append("svg")
                      .attr("width", w)
                      .attr("height", h);
            //define the svg element by selecting the SVG via its id attribute
            svg.selectAll("rect")
              .data(amounts)
              .enter()
              .append("rect")
              .attr("x", function(d,i){
                console.log(d);
                return i * 21;
              })
              .attr("y", function(d){
                return h-(d*4);
              })
              .attr("width", 20)
              .attr("height", function(d){
                return d*4;
              })
              .attr("fill", "pink");

            svg.selectAll("text")
              .data(amounts)
              .enter()
              .append("text")
              .text(function(d){
                return d;
              })
              .attr("x", function(d,i){
                return i * (w/amounts.length)+5;
              })
              .attr("y", function(d){
                return h-(d*4)+10;
              })
              .attr("font-family", "sans-serif")
              .attr("font-size", "11px");
              //.attr("fill", "white");
            }
        }

  },
    /*
      //perform a reactive query on the collection to get an array


      //update scale domains and axises
      //select elements that correspond to documents/data
      var bars = svg.selectAll("rect")
        .data(dataset, key); //bind dataset to objects using key function

      //handle new documents via enter()
      bars.enter()
        .append("rect")

      //handle updates to documents via transition()
      bars.transition()

      //handle removed documents via exit()
      bars.exit()

          .remove();

    });
    */

  /*
   Template.feed.rendered = function () {
    // our d3 code goes here
  }

  Template.feed.helpers({
      feeds: function(){
        return Feeds.find({});
        find the last feed
      }
    });
  */
  Template.body.events({
    'click .milk-amount': function(event){
      //console.log(event);
      var amount = $( "#feed_amount" ).slider("value" );
      console.log(amount);
      Meteor.call("addFeed", amount);

      console.log(Feeds.find({ },{sort: {createdAt: -1}}));
      //console.log(this);
      return false;

    }
  });

  Template.body.helpers({
    getFeeds: function() {

      return Feeds.find({ },{sort: {createdAt: -1}});

    }
  });


    Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
    });

}









