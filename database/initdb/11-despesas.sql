DROP TABLE IF EXISTS `despesas`;
CREATE TABLE `despesas`(
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `tipo_despesa` INT(11) NOT NULL,
    `data_pagamento` DATE NULL,
    `valor` REAL NULL,
    CONSTRAINT fk_despesa FOREIGN KEY (tipo_despesa) REFERENCES tipo_despesa(id),
    PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

LOCK TABLES `despesas` WRITE;
INSERT INTO `despesas` VALUES
(1,1,'2024-10-22',333.33),(2,2,'2024-12-22',444.44);
UNLOCK TABLES;