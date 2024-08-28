DROP TABLE IF EXISTS `anexos_processo`;

CREATE TABLE anexos_processo(
    id INT(11) NOT NULL AUTO_INCREMENT,
    processo_id INT(11) NULL,
    nome_arquivo TEXT NULL,
    arquivo LONGTEXT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_anexos_processo FOREIGN KEY (processo_id) REFERENCES processos(id),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;