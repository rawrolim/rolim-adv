DROP TABLE IF EXISTS `processos`;

CREATE TABLE processos(
    id int(11) NOT NULL AUTO_INCREMENT,
    advogado int(11) NOT NULL,
    cliente_id int(11) NOT NULL,
    numero_processo TEXT NULL,
    instancia TEXT NULL,
    tribunal TEXT NULL,
    numero_orgao TEXT NULL,
    natureza TEXT NULL,
    motivo TEXT NULL,
    comarca TEXT NULL,
    valor_causa REAL NULL,
    data_distribuicao DATE NULL,
    valor_contrato REAL NULL,
    parcelas INT NULL,
    entrada INT NULL,
    inicio_prestacao DATE NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_processo_clientes FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    CONSTRAINT fp_processo_usuarios FOREIGN KEY (advogado) REFERENCES usuarios(id),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;