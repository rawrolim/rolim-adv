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
-- Table structure for table `uploads`
--

DROP TABLE IF EXISTS `uploads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uploads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) DEFAULT NULL,
  `nome_arquivo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cliente_tipo` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=192 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uploads`
--

LOCK TABLES `uploads` WRITE;
/*!40000 ALTER TABLE `uploads` DISABLE KEYS */;
INSERT INTO `uploads` VALUES (1,311,'codigo_etica.pdf',NULL),(2,455,'Procuração- Ana flávia.pdf','P'),(3,455,'HIPO- Ana Flavia.pdf','P'),(4,455,'RG_e_CPF.pdf','P'),(5,455,'RECEITUÁRIO.pdf','P'),(6,455,'protocolo inss.pdf','P'),(7,455,'Contrato - Ana Flávia.pdf','P'),(8,455,'CTPS.pdf','P'),(9,455,'GPS.pdf','P'),(10,197,'procuração.pdf','P'),(11,197,'hipo.pdf','P'),(12,197,'CERTIDÃO DE CASAMENTO.pdf','P'),(13,197,'ACORDO EXTRAJUDICIAL.pdf','P'),(14,423,'certida de nascimento.pdf','P'),(15,423,'comprovante de residencia.pdf','P'),(16,423,'cpf alexandre.pdf','P'),(17,423,'cpf aprigio.pdf','P'),(18,423,'cpf vania.pdf','P'),(19,423,'documento filho.pdf','P'),(20,423,'documento filhoo.pdf','P'),(21,423,'foto aprigio identidade.pdf','P'),(22,423,'foto vania identidade.pdf','P'),(23,423,'laudo médico.pdf','P'),(24,423,'rg vania.pdf','P'),(25,423,'rpg aprigio.pdf','P'),(26,195,'CERTIDÃO DE CASAMENTO05042019.pdf','P'),(27,195,'CERTIDÃO DE ÓBITO05042019.pdf','P'),(28,195,'COMPROVANTE DE RENDIMENTO09042019.pdf','P'),(29,195,'COMPROVANTE DE RESIDENCIA05042019.pdf','P'),(30,195,'DOCUMENTO YPIRANGA05042019.pdf','P'),(31,195,'HIPO09042019.pdf','P'),(32,195,'IDENTIDADE E CPF09042019.pdf','P'),(33,195,'PROCURAÇÃO09042019.pdf','P'),(34,402,'ATA DE AUD..pdf','P'),(35,402,'cnh.pdf','P'),(36,402,'Comprovante residencia06082021.pdf','P'),(37,402,'Comprovante residencia18082021.pdf','P'),(38,402,'DESPACHO.pdf','P'),(39,402,'HIPO06082021.pdf','P'),(40,402,'petição de desarquivamento.pdf','P'),(41,402,'procuração e hipo25082021.pdf','P'),(42,402,'procuração06082021.pdf','P'),(43,111,'acerta.pdf','P'),(44,111,'conta de luz.pdf','P'),(45,111,'hipo.pdf','P'),(46,111,'PROCURAÇÃO E HIPO_000150.pdf','P'),(47,111,'procuração.pdf','P'),(48,111,'relatorio de pagamentos do plano de saude.pdf','P'),(49,406,'BRADESCO CARTÃO09072021.pdf','P'),(50,406,'hipo.pdf','P'),(51,406,'Procuração.pdf','P'),(52,406,'Requerimento Comp. Rend..pdf','P'),(53,406,'RFB MARCUS.pdf','P'),(54,406,'RG09072021.pdf','P'),(55,193,'comprovante de residencia 1.pdf','P'),(56,193,'comprovante de residencia.pdf','P'),(57,193,'Hipo e procuração assinados.pdf','P'),(58,193,'RG03052021.pdf','P'),(59,193,'Scan.pdf','P'),(60,49,'2-RG E CPF.pdf','P'),(61,49,'HIPO ASSINADA.pdf','P'),(62,49,'INICIAL_assinado.pdf','P'),(63,49,'PROCURAÇÃO ASSINADA.pdf','P'),(64,202,'carteira de trabalho copia.pdf','P'),(65,202,'CNH_000117.pdf','P'),(66,202,'CNIS.pdf','P'),(67,1,'MANIFESTAÇÃO SOBRE MANDADO DE CITAÇÃO.pdf','P'),(68,1,'MANIFESTAÇÃO SOBRE MANDADO DE CITAÇÃO.pdf','P'),(69,496,'HIPO03022022.pdf','P'),(70,496,'PROCURAÇÃO03022022.pdf','P'),(71,496,'RG E CPF03022022.pdf','P'),(72,205,'PROCURAÇÃO_000005.pdf','P'),(73,205,'RG E CPF_000002.pdf','P'),(74,205,'PEDIDO AUXILIO EMERGENCIAL.pdf','P'),(75,571,'hipo.pdf','P'),(76,571,'procuraçaõ.pdf','P'),(77,571,'identidade.pdf','P'),(78,571,'carteiradetrabalho.pdf','P'),(79,571,'FGTS.pdf','P'),(80,571,'pagamentos.pdf','P'),(81,208,'CNH Digital.pdf','P'),(82,208,'CNH Digital.pdf','P'),(83,208,'hipo.pdf','P'),(84,208,'procuração.pdf','P'),(85,210,'PROCURAÇÃO30082018.pdf','P'),(86,210,'CNH30082018.pdf','P'),(87,274,'2-CNH.pdf','P'),(88,274,'1-Inicial Newton Completa - Assinado.pdf','P'),(89,274,'3-Comprovante de Residência.pdf','P'),(90,274,'4-Procuração.pdf','P'),(91,274,'5-Declaração de Hipossuficiência.pdf','P'),(92,274,'Protocolo de Distribuição.pdf','P'),(93,274,'PETIÇÃO INICIAL.pdf','P'),(94,312,'cnh.pdf','P'),(95,312,'comprovante de residencia.pdf','P'),(96,312,'Declaração de Hipo.pdf','P'),(97,312,'PETIÇÃO MANIFESTAÇÃO.pdf','P'),(98,312,'PROCURAÇAO ASSINADA.pdf','P'),(99,70,'hipo.pdf','P'),(100,70,'procuração.pdf','P'),(101,70,'identidade.pdf','P'),(102,581,'CNH.pdf','P'),(103,581,'hipo.pdf','P'),(104,581,'procuração  .pdf','P'),(105,581,'processo criminal.pdf','P'),(106,157,'CPF FLAVIA.pdf','P'),(107,157,'CNH PAULO CESAR16052019.pdf','P'),(108,157,'CERTIDAO DE CASAMENTO.pdf','P'),(109,157,'CONTRATO DE COMPRA E VENDA.pdf','P'),(110,157,'DECLARAÇÃO DE RESIDÊNCIA10062019.pdf','P'),(111,227,'SENTENÇA.pdf','P'),(112,227,'PROCURAÇÃO22092020.pdf','P'),(113,227,'HIPO ASSINADA.pdf','P'),(114,227,'DECISÃO ACÓRDÃO.pdf','P'),(115,227,'identidade.pdf','P'),(116,227,'identidade.pdf','P'),(117,432,'cnh.jpeg','P'),(118,432,'cnh.jpeg','P'),(119,432,'conta de luz.jpeg','P'),(120,432,'BOLSICITA_255355_1.pdf','P'),(121,81,'procuração de HELEN DOS SANTOS PEREIRA.pdf','P'),(122,81,'protocolo cumprimento de sentença.pdf','P'),(123,81,'INICIAL HELEN DOS SANTOS PEREIRA.pdf','P'),(124,81,'CNH - HELEN DOS SANTOS PEREIRA - Assinado.pdf','P'),(125,81,'PETIÇÃO DE QUITAÇÃO.pdf','P'),(126,232,'PROCURAÇÃO14092018.pdf','P'),(127,232,'CNH14092018.pdf','P'),(128,232,'CNH14092018.pdf','P'),(129,232,'HIPO14092018.pdf','P'),(130,232,'PETIÇÃO INICIAL.pdf','P'),(131,541,'CNH.pdf','P'),(132,541,'Hipo ASSINADA13012022.pdf','P'),(133,541,'Procuração13012022.pdf','P'),(134,541,'certidao de casasamentoo.jpeg','P'),(135,541,'comprovante de residenciaa.jpeg','P'),(136,541,'restituição 2021.pdf','P'),(137,233,'COMPROVANTE DE RESIDENCIA_000183.pdf','P'),(138,233,'CNH_000182.pdf','P'),(139,212,'COMPROVANTE DE RESIDÊNCIA03052021.pdf','P'),(140,212,'Hipo e procuração assinados.pdf','P'),(141,212,'RG03052021.pdf','P'),(142,284,'hipo.pdf','P'),(143,284,'procu.pdf','P'),(144,284,'cnh.pdf','P'),(145,234,'DECLARAÇÃO DE HIPO.pdf','P'),(146,234,'PROCURAÇÃO.pdf','P'),(147,234,'PROTOCOLO PETIÇÃO DE INFORMAÇÃO.pdf','P'),(148,234,'ACORDO25102019.pdf','P'),(149,234,'ACORDO25102019.pdf','P'),(150,507,'IDENTIDADE HAROLDO.pdf','P'),(151,507,'CPF HAROLDO.pdf','P'),(152,507,'SENTENÇA.pdf','P'),(153,507,'PETIÇÃO DE INFORMAÇÃO.pdf','P'),(154,507,'PROCURAÇÃO.pdf','P'),(155,356,'certidão de crédito.pdf','P'),(156,356,'COMPROVANTE DE RESIDÊNCIA28052021.pdf','P'),(157,519,'alvara.pdf','P'),(158,519,'certidao de casamento.pdf','P'),(159,519,'hipo.pdf','P'),(160,519,'identidade.pdf','P'),(161,519,'procuração.pdf','P'),(162,519,'termo de consciliaçao.pdf','P'),(163,519,'translado.pdf','P'),(164,223,'PROTOCOLO DISTRIBUIÇÃO.pdf','P'),(165,223,'PROCURACAO.pdf','P'),(166,223,'PETIÇÃO DE JUNTADA.pdf','P'),(167,223,'PETIÇÃO DE JUNTADA - Assinado.pdf','P'),(168,613,'Ato praticado.pdf','P'),(169,613,'Cartorio procuração.pdf','P'),(170,613,'cpf neuda.pdf','P'),(171,613,'Numero de beneficio.pdf','P'),(172,613,'protocolo pensãpo por morte.pdf','P'),(173,613,'uniao estavel18052022.pdf','P'),(174,613,'identidade camilo.pdf','P'),(175,613,'Fotos comprovando união estável (3).jpg','P'),(176,613,'Foto_2022-07-14_122841 (2).jpg','P'),(177,613,'Foto_2022-07-14_122752.jpg','P'),(178,613,'certidao de obito.pdf','P'),(179,613,'certidao de nascimento neuma18052022.pdf','P'),(180,613,'certidao de obito.pdf','P'),(181,394,'Video da peça.mp4','P'),(182,394,'Audio Entregando o carro hoje.ogg','P'),(183,394,'WhatsApp Image 2021-07-05 at 11.30.28 (1).jpeg','P'),(184,394,'compre e venda carro.Digitalizado.pdf','P'),(185,394,'pendencias do gás.pdf','P'),(186,394,'Contrato.pdf','P'),(187,394,'Video da peça.mp4','P'),(188,394,'hipo assinada FABIO VALDOMIRO.pdf','P'),(189,394,'Recibo.pdf','P'),(190,394,'Declaração de insenção de imposto de renda.pdf','P'),(191,394,'hipo assinado.pdf','P');
/*!40000 ALTER TABLE `uploads` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-28 16:58:46
