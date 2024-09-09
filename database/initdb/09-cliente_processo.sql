/*Tabela para ligar os clientes aos processos, possibilitando ter mais de um cliente por processo*/
CREATE TABLE cliente_processo{
    id INT(11) NOT NULL AUTO_INCREMENT,
    cliente_id INT(11) NULL,
    processo_id INT(11) NULL,
    CONSTRAINT fk_cliente_processo_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    CONSTRAINT fk_cliente_processo_processo FOREIGN KEY (processo_id) REFERENCES processos(id),
};

LOCK TABLES `cliente_processo` WRITE;
INSERT INTO cliente_processo(cliente_id, processo_id) VALUES(13150,1);
UNLOCK TABLES;
