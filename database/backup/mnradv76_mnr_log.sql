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
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) DEFAULT NULL,
  `json` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `pagina` varchar(255) DEFAULT NULL,
  `data` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23348 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log`
--

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
INSERT INTO `log` VALUES (1,NULL,'{\"usuario\":\"rawlinson.filho\",\"senha\":\"admin\",\"btn\":\"logar\"}','POST','Index','2021-08-12 22:41:49'),(2,12,'{\"login\":\"true\"}','GET','Home','2021-08-12 22:41:49'),(3,12,'{\"WS\":\"despesas\"}','GET','Home','2021-08-12 22:41:50'),(4,12,'{\"WS\":\"entradas\"}','GET','Home','2021-08-12 22:41:50'),(5,12,'{\"WS\":\"saidas\"}','GET','Home','2021-08-12 22:41:50'),(6,12,'{\"WS\":\"processos-clientes\"}','GET','Home','2021-08-12 22:41:50'),(7,12,'{\"WS\":\"processos\"}','GET','Home','2021-08-12 22:41:50'),(8,12,'{\"page\":\"1\"}','GET','ListagemProcessos','2021-08-12 22:42:27'),(9,12,'{\"page\":\"2\"}','GET','ListagemProcessos','2021-08-12 22:43:05'),(10,12,'{\"btn\":\"WS_busca_processo\",\"cliente_id\":\"313-P\"}','POST','FinanceiroEntrada','2021-08-12 22:48:02'),(11,12,'{\"filtro_cliente\":\"313\",\"data_filtro\":\"\",\"tipo_pessoa_filtro\":\"\",\"btn\":\"filtrar\"}','POST','FinanceiroEntrada','2021-08-12 22:48:38'),(12,12,'{\"filtro_cliente\":\"311\",\"data_filtro\":\"\",\"tipo_pessoa_filtro\":\"\",\"btn\":\"filtrar\"}','POST','FinanceiroEntrada','2021-08-12 22:48:41'),(13,12,'{\"cliente\":\"311\",\"status\":\"\",\"tipo\":\"\",\"btn\":\"filtrar\"}','GET','ListagemProcessos','2021-08-12 22:49:06'),(14,12,'{\"id\":\"94\",\"cliente\":\"311-P\",\"data\":\"2021-07-05\",\"valor\":\"604.85\",\"processo_id\":\"55\",\"btn\":\"alterar\"}','POST','FinanceiroEntrada','2021-08-12 22:49:25'),(15,12,'{\"filtro_cliente\":\"311\",\"data_filtro\":\"\",\"tipo_pessoa_filtro\":\"\",\"btn\":\"filtrar\"}','POST','FinanceiroEntrada','2021-08-12 22:49:34'),(16,12,'{\"cliente\":\"311\",\"status\":\"\",\"tipo\":\"\",\"btn\":\"filtrar\"}','GET','ListagemProcessos','2021-08-12 22:49:38'),(17,12,'{\"page\":\"1\"}','GET','ListagemProcessos','2021-08-12 22:50:01'),(18,12,'{\"cliente\":\"311\",\"status\":\"\",\"tipo\":\"\",\"btn\":\"filtrar\"}','GET','ListagemProcessos','2021-08-12 22:50:39'),(19,12,'{\"cliente\":\"311\",\"status\":\"\",\"tipo\":\"\",\"btn\":\"filtrar\",\"page\":\"2\"}','GET','ListagemProcessos','2021-08-12 22:50:55'),(20,12,'{\"cliente\":\"311\",\"status\":\"\",\"tipo\":\"\",\"btn\":\"filtrar\",\"page\":\"1\"}','GET','ListagemProcessos','2021-08-12 22:51:02'),(21,12,'{\"page\":\"0\"}','GET','ListagemProcessos','2021-08-12 22:51:07'),(22,12,'{\"cliente\":\"311\",\"status\":\"\",\"tipo\":\"\",\"btn\":\"filtrar\"}','GET','ListagemProcessos','2021-08-12 22:51:15'),(23,12,'{\"id\":\"94\",\"cliente\":\"311-P\",\"data\":\"2021-07-05\",\"valor\":\"604.85\",\"processo_id\":\"\",\"btn\":\"alterar\"}','POST','FinanceiroEntrada','2021-08-12 22:52:06'),(24,12,'{\"cliente\":\"311\",\"status\":\"\",\"tipo\":\"\",\"btn\":\"filtrar\"}','GET','ListagemProcessos','2021-08-12 22:59:10'),(25,12,'{\"page\":\"1\"}','GET','ListagemProcessos','2021-08-12 22:59:19'),(26,12,'{\"cliente\":\"313\",\"status\":\"\",\"tipo\":\"\",\"btn\":\"filtrar\"}','GET','ListagemProcessos','2021-08-12 22:59:23'),(27,12,'{\"btn\":\"WS_busca_processo\",\"cliente_id\":\"313-P\"}','POST','FinanceiroEntrada','2021-08-12 22:59:32'),(28,12,'{\"cliente\":\"313-P\",\"data\":\"2021-08-12\",\"valor\":\"1202.32\",\"processo_id\":\"100\",\"btn\":\"cadastrar\"}','POST','FinanceiroEntrada','2021-08-12 22:59:45'),(29,12,'{\"cliente\":\"313\",\"status\":\"\",\"tipo\":\"\",\"btn\":\"filtrar\"}','GET','ListagemProcessos','2021-08-12 22:59:57'),(30,12,'{\"cliente\":\"313\",\"status\":\"\",\"tipo\":\"\",\"btn\":\"filtrar\"}','GET','ListagemProcessos','2021-08-12 23:02:34'),(31,12,'{\"btn\":\"excluir\",\"id\":\"119\"}','GET','FinanceiroEntrada','2021-08-12 23:02:49'),(32,12,'{\"btn\":\"sair\"}','GET','FinanceiroEntrada','2021-08-12 23:03:58'),(33,NULL,'{\"login\":\"sair\"}','GET','Index','2021-08-12 23:03:59'),(34,NULL,'{\"usuario\":\"matheus.rolim\",\"senha\":\"matheus0211\",\"btn\":\"logar\"}','POST','Index','2021-08-13 10:15:36'),(35,17,'{\"login\":\"true\"}','GET','Home','2021-08-13 10:15:36'),(36,17,'{\"WS\":\"entradas\"}','GET','Home','2021-08-13 10:15:37'),(37,17,'{\"WS\":\"despesas\"}','GET','Home','2021-08-13 10:15:38'),(38,17,'{\"WS\":\"saidas\"}','GET','Home','2021-08-13 10:15:38'),(39,17,'{\"WS\":\"processos-clientes\"}','GET','Home','2021-08-13 10:15:38'),(40,17,'{\"WS\":\"processos\"}','GET','Home','2021-08-13 10:15:38'),(41,17,'{\"nome_filtro\":\"Christiano\",\"rg_filtro\":\"\",\"cpf_filtro\":\"\",\"btn\":\"filtrar\"}','POST','Clientes','2021-08-13 10:16:02'),(42,17,'{\"id\":\"415\"}','GET','procuracao','2021-08-13 10:16:09'),(43,17,'{\"id\":\"415\"}','GET','hipo','2021-08-13 10:16:24'),(44,NULL,'{\"usuario\":\"rawlinson.filho\",\"senha\":\"admin\",\"btn\":\"logar\"}','POST','Index','2021-08-13 10:24:49'),(45,12,'{\"login\":\"true\"}','GET','Home','2021-08-13 10:24:52'),(46,12,'{\"WS\":\"despesas\"}','GET','Home','2021-08-13 10:24:54'),(47,12,'{\"WS\":\"saidas\"}','GET','Home','2021-08-13 10:24:54'),(48,12,'{\"WS\":\"processos-clientes\"}','GET','Home','2021-08-13 10:24:54'),(49,12,'{\"WS\":\"processos\"}','GET','Home','2021-08-13 10:24:54'),(50,12,'{\"WS\":\"entradas\"}','GET','Home','2021-08-13 10:24:55'),(51,12,'{\"id\":\"313\"}','GET','procuracao','2021-08-13 10:25:23'),(52,17,'{\"nome_filtro\":\"Christiano\",\"rg_filtro\":\"\",\"cpf_filtro\":\"\",\"btn\":\"filtrar\"}','POST','Clientes','2021-08-13 10:54:23'),(53,17,'{\"id\":\"415\"}','GET','procuracao','2021-08-13 10:54:26'),(54,17,'{\"id\":\"415\"}','GET','procuracao','2021-08-13 11:45:41'),(55,17,'{\"WS\":\"despesas\"}','GET','Home','2021-08-13 15:30:06'),(56,17,'{\"WS\":\"saidas\"}','GET','Home','2021-08-13 15:30:06'),(57,17,'{\"WS\":\"entradas\"}','GET','Home','2021-08-13 15:30:06'),(58,17,'{\"WS\":\"processos-clientes\"}','GET','Home','2021-08-13 15:30:06'),(59,17,'{\"WS\":\"processos\"}','GET','Home','2021-08-13 15:30:06'),(60,17,'{\"cliente\":\"313\",\"status\":\"\",\"tipo\":\"\",\"btn\":\"filtrar\"}','GET','ListagemProcessos','2021-08-13 15:43:03');
/*!40000 ALTER TABLE `log` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-28 16:59:12
