-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: mnradv76_mnr
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!50503 SET NAMES utf8 */
;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;

/*!40103 SET TIME_ZONE='+00:00' */
;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `clientes`
--
DROP TABLE IF EXISTS `clientes`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `razao_social` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nome_socio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cpf` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cnpj` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `numero` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `endereco` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `endereco_num` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `endereco_complemento` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cep` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `rg` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nome_mae` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nome_pai` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `estado_civil` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sexo` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `data_registro` datetime(6) DEFAULT NULL,
  `orgao` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `profissao` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'A',
  `cnh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 13150 DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `clientes`
--
LOCK TABLES `clientes` WRITE;

/*!40000 ALTER TABLE `clientes` DISABLE KEYS */
;

INSERT INTO
  `clientes` (
    nome,
    cpf,
    estado_civil,
    sexo,
    data_registro
  )
VALUES
  (
    'CARMELITA FERNANDES DA SILVA',
    '898.253.307-91',
    'Casada',
    'Feminino',
    '2020-02-18'
  ),
(
    'Alex Sandro Grijó Ribeiro',
    '123.654.789-44',
    'Casado',
    'Masculino',
    '2020-10-27'
  );

/*!40000 ALTER TABLE `clientes` ENABLE KEYS */
;

UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2024-05-28 16:59:07