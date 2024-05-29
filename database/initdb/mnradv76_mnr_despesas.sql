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
-- Table structure for table `despesas`
--

DROP TABLE IF EXISTS `despesas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `despesas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome_despesa` varchar(254) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `despesas`
--

LOCK TABLES `despesas` WRITE;
/*!40000 ALTER TABLE `despesas` DISABLE KEYS */;
INSERT INTO `despesas` VALUES (18,'Faxina','1'),(19,'NET','1'),(20,'Salario Pedro GuimarÃ£es',NULL),(21,'Luz','1'),(22,'OAB Christino',NULL),(23,'OAB Christino atrasada',NULL),(24,'OAB Rawlinson','1'),(25,'Inicial',NULL),(26,'AlmoÃ§o','1'),(27,'Aluguel escritÃ³rio','1'),(28,'Diversos','1'),(29,'Filtro',NULL),(30,'JusBrasil','1'),(31,'SalÃ¡rio Hadrya',NULL),(32,'Toner Impressora',NULL),(33,'Mercado',NULL),(34,'Monitor',NULL),(35,'Saida Cordeiro',NULL),(36,'Site',NULL),(37,'Computador',NULL),(38,'Cilindro',NULL),(39,'Cross Dreams',NULL),(40,'InscriÃ§Ã£o escritÃ³rio',NULL),(41,'Mesa e Prateleira',NULL),(42,'HONORÃRIOS PERITO RAFAEL',NULL),(43,'13Âº Pedro GuimarÃ£es',NULL),(44,'Cesta de natal seu zÃ©',NULL),(45,'HONORÃRIOS PEDRO GUIMARÃƒES',NULL),(46,'HONORARIOS GUSTAVO ALVARENGA',NULL),(47,'PLACAS',NULL),(48,'SEGURO SALA NOVA',NULL),(49,'PetiÃ§Ã£o Online','1'),(50,'Google ADs','1'),(51,'AJUDA DE CUSTO ELTON','0'),(52,'SALÃRIO MATHEUS','1'),(53,'HONORÃRIOS ELTON','0'),(54,'HONORÃRIOS GRIJO','1'),(55,'HONORÃRIOS LUCAS','1'),(56,'HONORÃRIOS LETÃCIA','1'),(57,'AR CONDICIONADO COMPRA','0'),(58,'CERTIDÃO CESEC DENISE BRASIL INVENTÁRIO','0'),(59,'HONORÁRIOS LEONARDO VIRGÍNIO','1'),(60,'HONORÁRIOS ANDRÉ COSTA','1'),(61,'SALÁRIO MARIA LUIZA','1'),(62,'SALÁRIO MARIA LUIZA','1');
/*!40000 ALTER TABLE `despesas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-28 16:58:50
