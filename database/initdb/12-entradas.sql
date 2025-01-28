DROP TABLE IF EXISTS `entradas`;
CREATE TABLE `entradas`(
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `processo_id` INT(11) NOT NULL,
    `data_entrada` DATE NULL,
    `valor` REAL NULL,
    CONSTRAINT fk_entrada FOREIGN KEY (processo_id) REFERENCES processos(id),
    PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

LOCK TABLES `entradas` WRITE;
INSERT INTO `entradas` VALUES
(1,1,'2024-10-22',333.33);
UNLOCK TABLES;