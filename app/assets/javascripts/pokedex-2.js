Pokedex.RootView.prototype.addToyToList = function (pokeToy) {

  var toyContent = JST["toyListItem"]({toy: pokeToy});
  this.$pokeDetail.append(toyContent);

};

Pokedex.RootView.prototype.renderToyDetail = function (pokeToy) { // III
 this.$toyDetail.empty();
 var toyContent = JST["toyDetail"]({toy: pokeToy, pokemon: this.pokes});
 this.$toyDetail.html(toyContent);
};

Pokedex.RootView.prototype.selectToyFromList = function (event) {
  var $target = $(event.target);

  var toyId = $target.data('id');
  var pokemonId = $target.data('pokemon-id');

  var pokemon = this.pokes.get(pokemonId);
  var toy = pokemon.toys().get(toyId);

  this.renderToyDetail(toy);
};
