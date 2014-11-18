Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {
  var $detail = $('<div class="detail">');
 this.$pokeDetail.empty();
 var content = JST["pokemonDetail"]({pokemon: pokemon});
 this.$pokeDetail.append(content);
  
  // toys
  this.$pokeDetail.append(
    '<span style="font-weight: bold;">Toys:</span><br>'
  );
  var $toys = $('<ul class="toys"></ul>');
  this.$pokeDetail.append($toys);

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
