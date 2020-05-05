# Host: localhost  (Version: 5.7.26)
# Date: 2020-05-05 12:28:11
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "album_banner"
#

DROP TABLE IF EXISTS `album_banner`;
CREATE TABLE `album_banner` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Data for table "album_banner"
#

/*!40000 ALTER TABLE `album_banner` DISABLE KEYS */;
INSERT INTO `album_banner` VALUES (1,'https://ae01.alicdn.com/kf/Hd92ada69ffcd43b5b5fc6ca16272c9e1b.jpg'),(2,'https://ae01.alicdn.com/kf/Hd92ada69ffcd43b5b5fc6ca16272c9e1b.jpg');
/*!40000 ALTER TABLE `album_banner` ENABLE KEYS */;
