DROP TABLE IF EXISTS `anexos_cliente`;

CREATE TABLE anexos_cliente(
    id INT(11) NOT NULL AUTO_INCREMENT,
    cliente_id INT(11) NULL,
    nome_arquivo TEXT NULL,
    arquivo LONGTEXT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_anexos_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;