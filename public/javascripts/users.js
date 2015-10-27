//jQuery when DOM loads run this
$(function(){
  
  //Backbone Model

  window.User = Backbone.Model.extend({
    url: function() {
      return this.id ? '/users/' + this.id : '/users'; 
    },
  
    initialize: function(){
      //Can be used to initialize Model attributes
    }
  });

  //Collection

  window.UserCollection = Backbone.Collection.extend({
    model: User,
    url: '/users'
  });

  window.Users = new UserCollection;

  //View

  window.UserView = Backbone.View.extend({
    tagName: "tr",
  
    events: { 
      //Can be used for handling events on the template 
    },
  
    initialize: function(){
      //this.render();
    },
  
    render: function(){
      var user = this.model.toJSON();
      //Template stuff goes here
      $(this.el).html(ich.dart_template(user));
      return this;
    }
  });

  //Application View

  window.AppView = Backbone.View.extend({
  
    el: $("#darts_app"),
  
    events: {
      "submit form#new_user": "createUser"
    },
  
    initialize: function(){
      _.bindAll(this, 'addOne', 'addAll');
      
      Users.bind('add', this.addOne);
      Users.bind('refresh', this.addAll);
      Users.bind('all', this.render);
      
      Users.fetch({success: function(mod, response) {
        console.log("Success: " + JSON.stringify(mod));
      }}); //This Gets the Model from the Server
    },
    
    addOne: function(user) {
      var view = new UserView({model: user});
      this.$("#darts_table").append(view.render().el);
    },
    
    addAll: function(){
      Users.each(this.addOne);
    },
    
    newAttributes: function(event) {
      var new_user_form = $(event.currentTarget).serializeObject();
      //alert (JSON.stringify(new_user_form));
      return { user: {
          name: new_user_form["user[name]"],
          score: new_user_form["user[score]"]
        }}
    },
    
    createUser: function(e) {
      e.preventDefault(); //This prevents the form from submitting normally
      
      var params = this.newAttributes(e);
      
      Users.create(params);
      
    }
  
  });

  //START THE DART RANKING APP
  window.App = new AppView;

});