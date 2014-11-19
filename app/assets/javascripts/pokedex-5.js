Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
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
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
  },

  refreshPokemon: function (options) {
  },

  render: function () {
  },

  selectToyFromList: function (event) {
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
  }
});


$(function () {
  var pokemonIndex = new Pokedex.Views.PokemonIndex();
  pokemonIndex.refreshPokemon();
  $("#pokedex .pokemon-list").html(pokemonIndex.$el);
});

