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
-- Table structure for table `competencia_processual`
--

DROP TABLE IF EXISTS `competencia_processual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competencia_processual` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `processo_tipo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competencia_processual`
--

LOCK TABLES `competencia_processual` WRITE;
/*!40000 ALTER TABLE `competencia_processual` DISABLE KEYS */;
INSERT INTO `competencia_processual` VALUES (1,'Acidentes do Trabalho'),(2,'Auditoria da JustiÃ§a Militar'),(3,'Criminal'),(4,'Criminal - 2Âª InstÃ¢ncia'),(5,'Criminal - JÃºri'),(6,'CÃ­vel'),(7,'CÃ­vel - 2Âª InstÃ¢ncia'),(8,'DÃ­vida Ativa Estadual'),(9,'DÃ­vida Ativa Federal'),(10,'DÃ­vida Ativa Municipal'),(11,'Empresarial'),(12,'FamÃ­lia'),(13,'Fazenda PÃºblica'),(14,'Idoso'),(15,'Inf. e Juventude - Infratores'),(16,'InfÃ¢ncia e Juventude'),(17,'Juizado Especial Criminal'),(18,'Juizado Especial CÃ­vel'),(19,'Juizado FazendÃ¡rio'),(20,'Outra nÃ£o especificada'),(21,'Registro Civil de Pessoas Naturais'),(22,'Registro PÃºblico'),(23,'ViolÃªncia Dom. e Fam. Contra a Mulher');
/*!40000 ALTER TABLE `competencia_processual` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-28 16:58:43
