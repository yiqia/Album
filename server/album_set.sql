# Host: localhost  (Version: 5.7.26)
# Date: 2020-05-05 12:28:03
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "album_set"
#

DROP TABLE IF EXISTS `album_set`;
CREATE TABLE `album_set` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `img` varchar(255) DEFAULT NULL,
  `info` varchar(100) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `wx` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Data for table "album_set"
#

/*!40000 ALTER TABLE `album_set` DISABLE KEYS */;
INSERT INTO `album_set` VALUES (1,'http://q2.qlogo.cn/headimg_dl?dst_uin=330729121&spec=4','拿着最少的工资，做着最多的事情。','Hello','ai330729121','');
/*!40000 ALTER TABLE `album_set` ENABLE KEYS */;
