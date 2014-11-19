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
Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {
  var $detail = $('<div class="detail">');
 this.$pokeDetail.empty();
 var content = JST["pokemonDetail"]({pokemon: pokemon});
 this.$pokeDetail.append(content);
  
  // toys
 
 this.$pokeDetail.append(
   '<span style="font-weight: bold;">Toys:</span><br>'
 );
 
  pokemon.fetch({
   success: (function() {
     this.renderToysList(pokemon.toys());
   }).bind(this)
 });


};

Pokedex.RootView.prototype.selectPokemonFromList = function (event) {
  // Phase II
  this.$toyDetail.empty();

  // Phase IB
  var $target = $(event.target);

  var pokeId = $target.data('id');
  var pokemon = this.pokes.get(pokeId);

  this.renderPokemonDetail(pokemon);
};
