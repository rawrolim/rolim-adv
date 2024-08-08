DROP TABLE IF EXISTS `acessos`;

CREATE TABLE acessos(
    id INT(11) NOT NULL AUTO_INCREMENT,
    tipo_usuario_id INT(11) NOT NULL,
    rota TEXT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_acessos_tipo_usuario FOREIGN KEY (tipo_usuario_id) REFERENCES tipo_usuario(id),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;