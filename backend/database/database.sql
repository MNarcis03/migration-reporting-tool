CREATE TABLE `bird_tweets`
(
  `id`            INT(11) NOT NULL auto_increment ,
  `tweet_id`      INT NOT NULL,
  `caption`       VARCHAR(255) NULL ,
  `image_url`     VARCHAR(127) NULL ,
  `location`      VARCHAR(64) NULL ,
  `time_and_date` DATETIME NULL ,
  `bird_species`  VARCHAR(32) NOT NULL,
  `created_at`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at`    DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`),
  CONSTRAINT unique_tweet_id UNIQUE (`tweet_id`)
)
engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;
