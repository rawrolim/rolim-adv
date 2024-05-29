-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: mnradv76_mnr
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `migration`
--

DROP TABLE IF EXISTS `migration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome_arquivo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `data_rodou` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migration`
--

LOCK TABLES `migration` WRITE;
/*!40000 ALTER TABLE `migration` DISABLE KEYS */;
INSERT INTO `migration` VALUES (1,'..','1','2020-10-25'),(2,'001modelo.brM','1','2020-10-25'),(3,'.','1','2020-10-25'),(4,'2020-01-01 RF clientes.sql','1','2020-10-25'),(5,'2020-01-01 RF estados.sql','1','2020-10-25'),(6,'2020-01-01 RF migration.sql','1','2020-10-25'),(7,'2020-01-01 RF entrada_cliente.sql','1','2020-10-25'),(8,'2020-01-01 RF processos.sql','1','2020-10-25'),(9,'2020-01-01 RF insert_estados.sql','1','2020-10-25'),(10,'2020-01-01 RF despesas.sql','1','2020-10-25'),(11,'2020-01-01 RF retirada_socio.sql','1','2020-10-25'),(12,'2020-01-01 RF municipios.sql','1','2020-10-25'),(13,'2020-09-10 RF justificativa da retirada.sql','1','2020-10-25'),(14,'2020-01-01 RF empresas.sql','1','2020-10-25'),(15,'2020-01-01 RF Usuarios.sql','1','2020-10-25'),(16,'2020-04-19 RF 02 update em todos os usuarios para status A.sql','1','2020-10-25'),(17,'2020-04-19 RF 04 update para todos os clientes para o status A.sql','1','2020-10-25'),(18,'2020-04-30 RF 02 INSERT INTO tipos de processo.sql','1','2020-10-25'),(19,'2020-04-30 RF 01 CREATE TABLE competencia_processual.sql','1','2020-10-25'),(20,'2020-01-01 RF horarios.sql','1','2020-10-25'),(21,'2020-01-01 RF lancamento_nf.sql','1','2020-10-25'),(22,'2020-01-01 RF uploads.sql','1','2020-10-25'),(23,'2020-04-19 RF 01 Adicionar coluna status em usuarios.sql','1','2020-10-25'),(24,'2020-05-01 RF 01 Create Table status_processual.sql','1','2020-10-25'),(25,'2020-04-24 RF 01 Alter table para adequar tamanho do cpf.sql','1','2020-10-25'),(26,'2020-05-01 RF 02 Insert na tabela status_processual.sql','1','2020-10-25'),(27,'2020-04-19 RF 03 Adicionar coluna status na tabela clientes.sql','1','2020-10-25'),(28,'2020-04-30 RF 03 Deletar tabela de processos.sql','1','2020-10-25'),(29,'2020-04-30 RF 04 Adicionar nova tabela de processos.sql','1','2020-10-25'),(30,'2020-01-01 RF insert_municipios.sql','1','2020-10-25'),(31,'2020-12-08 RF alterar despesas com status.sql','1','2020-12-08');
/*!40000 ALTER TABLE `migration` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-28 16:58:35
