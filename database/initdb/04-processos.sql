DROP TABLE IF EXISTS `processos`;

CREATE TABLE processos(
    id int(11) NOT NULL AUTO_INCREMENT,
    advogado int(11) NOT NULL,
    numero_processo TEXT NULL,
    primeira_rescisao REAL NULL,
    segunda_rescisao REAL NULL,
    terceira_rescisao REAL NULL,
    percent_final_processo REAL NULL,
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
    entrada REAL NULL,
    inicio_prestacao DATE NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fp_processo_usuarios FOREIGN KEY (advogado) REFERENCES usuarios(id),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

LOCK TABLES `processos` WRITE;
INSERT INTO `processos`
(`advogado`,
`numero_processo`,
`primeira_rescisao`,
`segunda_rescisao`,
`terceira_rescisao`,
`percent_final_processo`,
`instancia`,
`tribunal`,
`numero_orgao`,
`natureza`,
`motivo`,
`comarca`,
`valor_causa`,
`data_distribuicao`,
`valor_contrato`,
`parcelas`,
`entrada`,
`inicio_prestacao`
) 
VALUES(
    13,
    '0001',
    3213,
    321312,
    3213,
    30,
    'mato',
    'arvore',
    '321',
    'dsa',
    'dsasdadsad',
    'dsadsadasd',
    3124,
    '2024-06-23',
    222,3,133.32,
    '2024-02-15');

UNLOCK TABLES;