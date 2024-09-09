DROP TABLE IF EXISTS `processos`;

CREATE TABLE processos(
    id int(11) NOT NULL AUTO_INCREMENT,
    advogado int(11) NOT NULL,
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

LOCK TABLES `processos` WRITE;
INSERT INTO `processos`(`advogado`,`numero_processo`,`instancia`,`tribunal`,`numero_orgao`,`natureza`,`motivo`,`comarca`,`valor_causa`,`data_distribuicao`,`valor_contrato`,`parcelas`,`entrada`,`inicio_prestacao`) 
VALUES(
    13,
    '0001',
    'mato',
    'arvore',
    '321',
    'dsa',
    'dsasdadsad',
    'dsadsadasd',
    3124,
    '2024-06-23',
    222,31,133,
    '2024-02-15'),(
    13,
    13150,
    '0002',
    'concreto',
    'Casa',
    '321',
    'dsa',
    'dsasda',
    'dsadsa',
    312445,
    '2024-08-22',
    222,
    313,
    13321,
    '2024-08-14'
    );

UNLOCK TABLES;