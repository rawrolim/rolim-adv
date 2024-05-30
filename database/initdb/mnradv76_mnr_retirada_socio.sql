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
-- Table structure for table `retirada_socio`
--

DROP TABLE IF EXISTS `retirada_socio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `retirada_socio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `advogado_retirou` int(11) DEFAULT NULL,
  `advogado_movimentou` int(11) DEFAULT NULL,
  `data_retirada` date DEFAULT NULL,
  `data_movimentacao` datetime(6) DEFAULT NULL,
  `valor` float(6,2) DEFAULT NULL,
  `justificativa` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `retirada_socio`
--

LOCK TABLES `retirada_socio` WRITE;
/*!40000 ALTER TABLE `retirada_socio` DISABLE KEYS */;
INSERT INTO `retirada_socio` VALUES (1,15,12,'2020-12-11','2020-12-11 11:33:30.000000',1000.00,'Retirada Christino'),(2,15,12,'2020-12-17','2020-12-17 17:09:17.000000',6462.75,'Retirada processos Davi Jacob, Juliana'),(3,13,12,'2020-12-17','2020-12-17 17:11:58.000000',8655.05,'Igualar retiradas de christino'),(4,15,12,'2020-12-17','2020-12-17 17:36:56.000000',700.00,'DivÃ³rcio CartÃ³rio'),(5,13,12,'2020-12-17','2020-12-17 17:39:08.000000',700.00,'Igualar retiradas christino sobre o divÃ³rcio cartÃ³rio'),(6,13,12,'2020-12-17','2020-12-17 17:44:02.000000',9228.45,'Retirada Final do ano'),(7,15,12,'2020-12-17','2020-12-17 17:44:23.000000',9228.45,'Retirada Final do ano'),(8,13,13,'2020-12-22','2020-12-22 12:59:17.000000',350.00,'PROCESSO CLAUDIA TRABALHISTA, FOI Acordado com a mesma o percentual de 0,20, porÃ©m foi cobrado0,30, sendo pÃ¡go a diferenÃ§a de 0,10, no vcalor de 700,00, divididi entre os sÃ³cios.'),(9,15,13,'2020-12-22','2020-12-22 13:01:03.000000',350.00,'devoluÃ§Ã£o a Claudia processo trabalhista'),(10,15,13,'2021-02-22','2021-02-26 16:47:16.000000',400.00,'50% METALCALD'),(11,15,13,'2021-02-22','2021-03-03 16:37:14.000000',100.00,'RETIRADA PROCESSO JOÃƒO TRABALHISTA');
/*!40000 ALTER TABLE `retirada_socio` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-28 16:59:10
