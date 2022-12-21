CREATE TABLE `bird_migration`
(
  `id`            INT(64) NOT NULL auto_increment ,
  `species`       VARCHAR(128) NOT NULL ,
  `appearances`   VARCHAR(64) NOT NULL ,
  `location`      VARCHAR(64) NOT NULL ,
  `latitude`      VARCHAR(64) NOT NULL ,
  `longitude`     VARCHAR(64) NOT NULL ,
  `date`          DATE NOT NULL ,
  `created_at`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at`    DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`)
)
engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;
