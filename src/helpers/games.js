export const updateFilters = (filterArg, filterState) => {
  let filterObj = {};
  let direction;

  if (filterState[filterArg] === 'neutral') {
    Object.keys(filterState).forEach(filterKey => {
      if (filterKey !== filterArg) {
        filterObj[filterKey] = 'neutral';
      } else {
        filterObj[filterArg] = 'desc';
        // this.games = sortGamesByProperty(filterArg, 'desc', this.games);
      }
    });

    direction = 'desc';
  } else {
    filterObj = filterState;
    const currentState = filterState[filterArg];

    let oppositeDir = {
      asc: 'desc',
      desc: 'asc'
    };

    let newDirection = oppositeDir[currentState];

    // this.games = sortGamesByProperty(filterArg, newDirection, this.games);
    filterObj[filterArg] = direction = newDirection;
  }

  return {
    filters: filterObj,
    direction
  };
};

export const sortGamesByProperty = (filterKey, direction, games) => {
  let filteredGames;

  switch (filterKey) {
    // DATE
    case 'date':
      filteredGames = games.sort((a, b) => {
        let dateComparison = direction === 'desc' ? a.created_at > b.created_at : a.created_at < b.created_at;

        return dateComparison ? -1 : !dateComparison ? 1 : 0;
      });

      break;
    // DIFFICULTY
    case 'difficulty':
      const difficultyDir = {
        easy: 1,
        medium: 2,
        hard: 3
      };

      filteredGames = games.sort((a, b) => {
        let difficultyComparison =
          direction === 'desc'
            ? difficultyDir[a.difficulty] > difficultyDir[b.difficulty]
            : difficultyDir[a.difficulty] < difficultyDir[b.difficulty];

        return difficultyComparison ? 1 : !difficultyComparison ? -1 : 0;
      });

      break;
    case 'score':
      const getGameScore = gameState => gameState.filter(gameStateEl => gameStateEl.evaluation).length;

      filteredGames = games.sort((a, b) => {
        let scoreComparison =
          direction === 'desc'
            ? getGameScore(a.state) > getGameScore(b.state)
            : getGameScore(a.state) < getGameScore(b.state);

        return scoreComparison ? 1 : !scoreComparison ? -1 : 0;
      });
  }

  return filteredGames;
};
