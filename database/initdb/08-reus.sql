 DROP TABLE IF EXISTS `reus`;

CREATE TABLE reus(
    id int(11) NOT NULL AUTO_INCREMENT,
    nome_reu TEXT NULL,
    tp_reu TEXT NULL,
    cpf_reu TEXT NULL,
    cnpj_reu TEXT NULL,
    nome_representante_reu TEXT NULL,
    estado_civil_reu  TEXT NULL,
    rg_reu TEXT NULL,
    email_reu TEXT NULL,
    numero_reu TEXT NULL,
    cep_reu TEXT NULL,
    endereco_reu TEXT NULL,
    endereco_numero_reu TEXT NULL,
    endereco_complemento_reu TEXT NULL,
    sexo_reu TEXT NULL,
    profissao_reu TEXT NULL,
    cnh_reu TEXT NULL,
    processo_id int(11) DEFAULT NULL,
    CONSTRAINT fk_reus FOREIGN KEY (processo_id) REFERENCES processos(id),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

LOCK TABLES `reus` WRITE;
INSERT INTO `reus` (`nome_reu`,`processo_id`) VALUES ('gab',1);
 UNLOCK TABLES;