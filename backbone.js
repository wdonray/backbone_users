const User = Backbone.Model.extend({
  defaults: {
    name: "",
    email: "",
    website: "",
  },
});

const Users = Backbone.Collection.extend({
  url: "https://jsonplaceholder.typicode.com/users",
});

const users = new Users();

const UserView = Backbone.View.extend({
  model: new User(),
  tagName: "tr",
  initialize: function () {
    this.template = _.template($("#user-list-template").html());
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});

const UserList = Backbone.View.extend({
  model: users,
  el: $(".user-list"),
  render: function () {
    const self = this;
    this.$el.html(this.template);
    users.fetch({
      success: function (users) {
        _.each(users.models, function (user) {
          self.$el.append(new UserView({ model: user }).render().$el);
        });
      },
    });
    return this;
  },
});

const Router = Backbone.Router.extend({
  routes: {
    "": "home",
    'new': 'editUser'
  },
});

const EditUser = Backbone.View.extend({

});

const userList = new UserList();

const router = new Router();
router.on("route:home", function () {
  userList.render();
});

router.on("route:editUser", function () {
  console.log('show user form')
});

Backbone.history.start();