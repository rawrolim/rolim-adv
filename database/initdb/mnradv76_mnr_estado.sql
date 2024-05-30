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
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CodigoUf` int(11) NOT NULL,
  `Nome` varchar(50) NOT NULL,
  `Uf` char(2) NOT NULL,
  `Regiao` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,12,'Acre','AC',1),(2,27,'Alagoas','AL',2),(3,16,'AmapÃ¡','AP',1),(4,13,'Amazonas','AM',1),(5,29,'Bahia','BA',2),(6,23,'CearÃ¡','CE',2),(7,53,'Distrito Federal','DF',5),(8,32,'EspÃ­rito Santo','ES',3),(9,52,'GoiÃ¡s','GO',5),(10,21,'MaranhÃ£o','MA',2),(11,51,'Mato Grosso','MT',5),(12,50,'Mato Grosso do Sul','MS',5),(13,31,'Minas Gerais','MG',3),(14,15,'ParÃ¡','PA',1),(15,25,'ParaÃ­ba','PB',2),(16,41,'ParanÃ¡','PR',4),(17,26,'Pernambuco','PE',2),(18,22,'PiauÃ­','PI',2),(19,33,'Rio de Janeiro','RJ',3),(20,24,'Rio Grande do Norte','RN',2),(21,43,'Rio Grande do Sul','RS',4),(22,11,'RondÃ´nia','RO',1),(23,14,'Roraima','RR',1),(24,42,'Santa Catarina','SC',4),(25,35,'SÃ£o Paulo','SP',3),(26,28,'Sergipe','SE',2),(27,17,'Tocantins','TO',1);
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-28 16:58:37
