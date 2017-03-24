










// 创建数据库
CREATE DATABASE zero;
CREATE DATABASE zero_setting;
CREATE DATABASE zero_bookmark;







// zero下创建数据表
// 

CREATE TABLE `zero`.`db_project` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `name` VARCHAR( 20 ) NOT NULL ,
  `value` VARCHAR( 20 ) NOT NULL 
);

CREATE TABLE `zero`.`db_account` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `name` VARCHAR( 20 ) NOT NULL ,
  `pass` VARCHAR( 50 ) NOT NULL ,
  `tid` VARCHAR( 50 ) 
);







