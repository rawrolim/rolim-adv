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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tipo_usuario` int(11) DEFAULT NULL,
  `senha` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `usuario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `primeiro_acesso` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `token` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (12,'Rawlinson Filho',4,'21232f297a57a5a743894a0e4a801fc3','rawlinson.filho','N','A','rawlinson.filho@rawlinsonrolimadv.com',''),(13,'Rawlinson Wagner Moraes Rolim',3,'a7062d8328ec35990de0e87e568b3b02','rawlinson','N','A','rawlinson.rolim@rawlinsonrolimadv.com',''),(14,'Pedro GuimarÃ£es',1,'d41d8cd98f00b204e9800998ecf8427e','pedro.guimaraes','S','I','-',''),(15,'Christino Moreira Neto',3,'2d788c42ef0e77e8e86c22943a8bb504','christino.moreira','S','I','-',''),(16,'Gustavo Alvarenga',1,'93aa21a1d7658204b94d9b4c9099fc05','gustavo','S','I','-',''),(17,'Matheus Rolim',5,'3ef26184cfc0656d1547a1075431c53d','matheus.rolim','N','A','-',''),(18,'Alex Sandro Grijó',1,'e10adc3949ba59abbe56e057f20f883e','alex.grijo','S','A','alexsandro.grijo@rawlinsonrolimadv.com',''),(19,'Elton Angelo Carvalho de Moraes',1,'3106f4f7687fbb1b852e3cf0ca0c451e','elton.moraes','S','I','elton.moraes@rawlinsonrolimadv.com',''),(20,'Raissa Rolim',1,'8718e0d8cd6727b89119c14ea781329e','raissa.rolim','S','I','raissa.rolim@rawlinsonrolimadv.com',''),(21,'Lucas Hosken Balzana Ramos',1,'dd95b1ca8dca61e3ab7ca3f18bbdef78','Lucas.Hosken','S','I','lucas.hosken@rawlinsonrolimadv.com',''),(22,'Leticia Barreto Antunes dos Santos Lima',1,'e10adc3949ba59abbe56e057f20f883e','Leticia.Barreto','S','I','leticia.barreto@rawlinsonrolimadv.com',''),(23,'admin', 4, '21232f297a57a5a743894a0e4a801fc3', 'admin','N','A','admin@admin','');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-28 16:58:41
