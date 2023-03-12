-- MySQL Script generated by MySQL Workbench
-- Sun Mar  5 21:22:07 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema shop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema shop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `shop` DEFAULT CHARACTER SET utf8 ;
USE `shop` ;

-- -----------------------------------------------------
-- Table `shop`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `shop`.`products` ;

CREATE TABLE IF NOT EXISTS `shop`.`products` (
  `id` VARCHAR(100) NOT NULL,
  `title` VARCHAR(200) NULL DEFAULT NULL,
  `description` VARCHAR(250) NULL DEFAULT NULL,
  `price` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `shop`.`stocks`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `shop`.`stocks` ;

CREATE TABLE IF NOT EXISTS `shop`.`stocks` (
  `count` INT NULL,
  `productId` VARCHAR(100) NOT NULL,
  INDEX `fk_stocks_products_idx` (`productId` ASC) VISIBLE,
  CONSTRAINT `fk_stocks_products`
    FOREIGN KEY (`productId`)
    REFERENCES `shop`.`products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
