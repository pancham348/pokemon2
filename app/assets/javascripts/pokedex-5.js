Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li" : "selectPokemonFromList"
  },

  initialize: function () {
    this.collection = new Pokedex.Collections.Pokemon();
    // this.$el = $();


  },

  addPokemonToList: function (pokemon) {
    var pokemonListItem = JST["pokemonListItem"]({pokemon: pokemon});
    this.$el.append(pokemonListItem);
  },

  refreshPokemon: function (options) {
    var that = this;
    this.collection.fetch({
      success: function(){
       that.render();
      }
    })
  },

  render: function () {
    this.$el.empty();
    var that = this;
    this.collection.each(function(mon) {
      that.addPokemonToList(mon);
    }.bind(this))
  },

  selectPokemonFromList: function (event) {
    event.preventDefault();

    var pokeid = $(event.currentTarget).data("id");
    this.pokemon = this.collection.get(pokeid)

    this.pokemonDetail = new Pokedex.Views.PokemonDetail({model: this.pokemon});
    $("#pokedex .pokemon-detail").append(this.pokemonDetail.$el);
    this.pokemonDetail.refreshPokemon();
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
    "click .toys li" : "selectToyFromList"
  },

  refreshPokemon: function (options) {
    var that = this;

    this.model.fetch({
      success: function () {
        that.render();
      }
    })
  },

  render: function () {
    var mon = this.model;
    var content = JST["pokemonDetail"]({pokemon: mon});
    $("#pokedex .pokemon-detail").empty();
    $("#pokedex .pokemon-detail").append(content);

    var toyContent;
    var that = this;
    this.model.toys().each(function(toy){
      toyContent = JST["toyListItem"]({toy: toy});
       $("#pokedex .pokemon-detail").append(toyContent);
    });
  },

  selectToyFromList: function (event) {
    // event.preventDefault();
    // this.toyDetail = new Pokedex.Views.ToyDetail();d
    // $("#pokedex .toy-detail").append(this.toyDetail);
    // this.toyDetail.render();

    var toyId = $(event.currentTarget).data("id");
    var toy = this.model.toys().get(toyId);
    var toyDetail = new Pokedex.Views.ToyDetail({ model: toy });
    $("#pokedex .toy-detail").html(toyDetail.$el);
    toyDetail.render();
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
    this.$el.html(JST["toyDetail"]({ toy: this.model, pokes: [] }));
    return this;
  }
});


$(function () {
  var pokemonIndex = new Pokedex.Views.PokemonIndex();
  pokemonIndex.refreshPokemon();
  $("#pokedex .pokemon-list").html(pokemonIndex.$el);


});

