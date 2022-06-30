CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    game_id BIGINT NOT NULL REFERENCES games(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(
        rating >= 1
        and rating <= 5
    )
);
select *
from games
    left join(
        select game_id,
            count(*),
            TRUNC(AVG(rating, 1)) as average_rating
        from reviews
        group by game_id
    ) reviews on games.id = reviews.game_id;

CREATE TABLE games (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    developer VARCHAR(50) NOT NULL, 
    price_range INT NOT NULL check(price_range >=0 and price_range <=150)
    );