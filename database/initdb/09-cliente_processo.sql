/*Tabela para ligar os clientes aos processos, possibilitando ter mais de um cliente por processo*/
DROP TABLE IF EXISTS `cliente_processo`;

CREATE TABLE cliente_processo (
    id INT(11) NOT NULL AUTO_INCREMENT,
    cliente_id INT(11) NOT NULL,
    processo_id INT(11) NOT NULL,
    CONSTRAINT fk_cliente_processo_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    CONSTRAINT fk_cliente_processo_processo FOREIGN KEY (processo_id) REFERENCES processos(id),
    PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

LOCK TABLES `cliente_processo` WRITE;
INSERT INTO `cliente_processo` 
(
`cliente_id`, 
`processo_id`
) VALUES
(
13150,
1
),
(
13150,    
2   
);
UNLOCK TABLES;
