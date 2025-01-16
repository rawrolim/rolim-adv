DROP TABLE IF EXISTS `tipo_despesa`;

CREATE TABLE `tipo_despesa`(
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `nome` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

LOCK TABLES `tipo_despesa` WRITE;
INSERT INTO `tipo_despesa` VALUES
(1,'Escritorio','A'),(2,'Apartamento','A');
UNLOCK TABLES;
