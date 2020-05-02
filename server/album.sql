# Host: localhost  (Version: 5.7.26)
# Date: 2020-05-02 12:38:23
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "album_class"
#

DROP TABLE IF EXISTS `album_class`;
CREATE TABLE `album_class` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `sort` int(11) DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

#
# Data for table "album_class"
#

/*!40000 ALTER TABLE `album_class` DISABLE KEYS */;
INSERT INTO `album_class` VALUES (1,'会员系统',0),(2,'客户必读',1),(3,'get毒工厂',3),(4,'哈哈',5),(5,'asda',11),(10,'沙阿斯顿',8),(11,'阿达',9),(12,'傻傻的',4),(13,'啊啊啊',10),(14,'hello',6),(17,'撒飒飒',7),(18,'哈哈哈',12),(19,'非常好啊',19),(20,'AJ鞋子',2);
/*!40000 ALTER TABLE `album_class` ENABLE KEYS */;

#
# Structure for table "album_pic"
#

DROP TABLE IF EXISTS `album_pic`;
CREATE TABLE `album_pic` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `img` text,
  `type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

#
# Data for table "album_pic"
#

/*!40000 ALTER TABLE `album_pic` DISABLE KEYS */;
INSERT INTO `album_pic` VALUES (1,'https://img12.360buyimg.com/mobilecms/s500x500_jfs/t1/114976/35/1946/114668/5e9d4db6E16698242/1d9b23be18922e93.jpg',1),(2,'https://img10.360buyimg.com/mobilecms/s500x500_jfs/t1/86876/38/19797/99885/5ea10410Ed1034404/fa3cc8f984920c40.jpg',1),(3,'https://img14.360buyimg.com/mobilecms/s500x500_jfs/t1/100196/5/19740/139346/5e9fe8e0E134109ce/bf60d100720416f6.jpg',1),(6,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.lbeuSV27e7f9832cc797fad6a429b8d36b74a5b29df8.jpg',1),(7,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.Ou9UOLyH8Rd0cc27cfcdb610f85110649aab44dbeda7.png',1),(8,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.agUA1eNHxKO4f2bbeaec5344c28ccda171f81bb58cef.jpg',1),(9,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.IGxbtCrwzqXw5e241dbf9ca9cd83049fe51185b541b7.jpg',1),(10,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.fqPpdP5Fbx3Dc9c0afa99ee21f4eb73a44081d8117f0.jpg',1),(12,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.3FZxgG9UDf9Ud0a983c1389bed2c77830ae1fede5145.jpg',4),(13,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.2TeKNYWXKhI364ed9b8522149af3c219f628c47d5c47.png',4),(14,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.7dRK8JEaXKcYb2f4b524be9b6a3863c14699dafb4cc6.jpg',4),(15,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.D4hpPxDfsEZmb6f976532033f94c364dfe4a9f27d835.jpg',3),(16,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.L2nbP0ZSrSpRbcb8c0affced3ee013b0842520f05e89.jpg',3),(17,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.Q4icaROyHYR6501f13c890c466ab263dc30a3842cdd8.jpg',22),(18,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.7ZD7AWUO8AFT03196f4e03965c7153c3c526c8791b20.png',24),(19,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.9hVAAyTSbtZ4f0f494771acadcdc638349155030ff65.png',23),(20,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.VR3ASqNn7s4Pa1b45874d6f00d9d00bcadef9b0e8fb7.png',25),(21,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.8KqiH4HmKs3x0abf93296fe09565b4457e233bec4501.png',26),(22,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.YkNT9XjRmKEB3298acf7b7000e7e3920890fd2fb43f7.jpg',22),(23,'http://love.q05.cc/image/tmp_d811d1623b4f10a007d2aa140afc3348.jpg',27),(24,'http://love.q05.cc/image/tmp_1ae6b7fe770afcde2bb4df9762afa424.jpg',27);
/*!40000 ALTER TABLE `album_pic` ENABLE KEYS */;

#
# Structure for table "album_type"
#

DROP TABLE IF EXISTS `album_type`;
CREATE TABLE `album_type` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `img` varchar(255) DEFAULT 'http://qzonestyle.gtimg.cn/aoi/img/photo/logic/pic-none.png?rf=albumlist&t=5',
  `title` varchar(100) DEFAULT NULL,
  `info` text,
  `class_id` int(11) DEFAULT NULL,
  `sort` int(11) DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

#
# Data for table "album_type"
#

/*!40000 ALTER TABLE `album_type` DISABLE KEYS */;
INSERT INTO `album_type` VALUES (1,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.agUA1eNHxKO4f2bbeaec5344c28ccda171f81bb58cef.jpg','郗婧妍自有品牌丽氏同芳【疯抢钜惠 升级款40片装】【限量买3免1】','商品名称：华为荣耀8X\n商品编号：8735304\n商品毛重：175.00g\n商品产地：中国大陆CPU型号：其他运行内存：4GB机身存储：64GB存储卡：支持MicroSD(TF)',1,2),(2,'https://img10.360buyimg.com/mobilecms/s500x500_jfs/t1/96975/34/19295/148129/5e9e6492Eb5ad083f/df47b4ffd71e67fb.jpg','南极人+品牌/100%纯棉/买一送三','商品名称：华为荣耀8X\\n商品编号：8735304\\n商品毛重：175.00g\\n商品产地：中国大陆CPU型号：其他运行内存：4GB机身存储：64GB存储卡：支持MicroSD(TF)',1,13),(3,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.D4hpPxDfsEZmb6f976532033f94c364dfe4a9f27d835.jpg','【必抢好货】帅气飞织透气男鞋','商品名称：华为荣耀8X\\n商品编号：8735304\\n商品毛重：175.00g\\n商品产地：中国大陆CPU型号：其他运行内存：4GB机身存储：64GB存储卡：支持MicroSD(TF)',1,12),(4,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.3FZxgG9UDf9Ud0a983c1389bed2c77830ae1fede5145.jpg','9-12mm碧玺手链女款情人节礼物','商品名称：华为荣耀8X\n商品编号：8735304\n商品毛重：175.00g\n产地：中国大陆CPU型号：其他运行内存：4GB机身存储：64GB存储卡：支持MicroSD(TF)',1,3),(5,'https://img12.360buyimg.com/mobilecms/s500x500_jfs/t1/114976/35/1946/114668/5e9d4db6E16698242/1d9b23be18922e93.jpg','宝捷防蓝光老花镜男高清进口镜片','商品名称：华为荣耀8X\\n商品编号：8735304\\n商品毛重：175.00g\\n商品产地：中国大陆CPU型号：其他运行内存：4GB机身存储：64GB存储卡：支持MicroSD(TF)',2,4),(6,'https://img13.360buyimg.com/mobilecms/s200x200_jfs/t1/91360/32/16956/154562/5e82e7efEa01c5660/0a16d456e01f5562.jpg!cc_200x200.webp','自带线2W充电宝超薄小巧快充','一线三头可上飞机',2,5),(7,'https://img13.360buyimg.com/mobilecms/s200x200_jfs/t1/91360/32/16956/154562/5e82e7efEa01c5660/0a16d456e01f5562.jpg!cc_200x200.webp','自带线2W充电宝超薄小巧快充','一线三头可上飞机',2,6),(8,'https://img13.360buyimg.com/mobilecms/s200x200_jfs/t1/91360/32/16956/154562/5e82e7efEa01c5660/0a16d456e01f5562.jpg!cc_200x200.webp','自带线2W充电宝超薄小巧快充','一线三头可上飞机',2,7),(9,'https://img13.360buyimg.com/mobilecms/s200x200_jfs/t1/91360/32/16956/154562/5e82e7efEa01c5660/0a16d456e01f5562.jpg!cc_200x200.webp','自带线2W充电宝超薄小巧快充','一线三头可上飞机',3,8),(10,'https://img13.360buyimg.com/mobilecms/s200x200_jfs/t1/91360/32/16956/154562/5e82e7efEa01c5660/0a16d456e01f5562.jpg!cc_200x200.webp','自带线2W充电宝超薄小巧快充','一线三头可上飞机',3,9),(11,'https://img13.360buyimg.com/mobilecms/s200x200_jfs/t1/91360/32/16956/154562/5e82e7efEa01c5660/0a16d456e01f5562.jpg!cc_200x200.webp','自带线2W充电宝超薄小巧快充','一线三头可上飞机',3,10),(12,'https://img13.360buyimg.com/mobilecms/s200x200_jfs/t1/91360/32/16956/154562/5e82e7efEa01c5660/0a16d456e01f5562.jpg!cc_200x200.webp','自带线2W充电宝超薄小巧快充','一线三头可上飞机',3,11),(13,'https://img30.360buyimg.com/mobilecms/s200x200_jfs/t1/107756/33/13578/144592/5ea23929E16c5d348/a687eac2e4e1ea64.jpg!cc_200x200.webp','超能女士内衣专用皂101克*4块','一线三头可上飞机',1,14),(22,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.Q4icaROyHYR6501f13c890c466ab263dc30a3842cdd8.jpg','Jordan官方AIR JORDAN 1 MID AJ1男子运动鞋554724','产品参数：\n品牌: JORDAN\n鞋码: 40 40.5 41 42 42.5 43 44 44.5 45 46 47.5\n颜色分类: 300佛得角芦荟绿/庭紫/白色 058',20,21),(23,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.9hVAAyTSbtZ4f0f494771acadcdc638349155030ff65.png','Jordan 官方 AIR JORDAN XXXIV PF AJ34男子篮球鞋 BQ3381','',20,22),(24,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.7ZD7AWUO8AFT03196f4e03965c7153c3c526c8791b20.png','Jordan 官方 AIR JORDAN XXXIV PF AJ34男子篮球鞋 BQ3381','啊啊撒',20,23),(25,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.VR3ASqNn7s4Pa1b45874d6f00d9d00bcadef9b0e8fb7.png','Jordan官方 AIR JORDAN 1 MID AJ1男子运动鞋 554724','',20,24),(26,'http://love.q05.cc/image/wx06a1ffd8b0e3a4bc.o6zAJs30g5F7hjZbpPW0uUV9_Hbs.8KqiH4HmKs3x0abf93296fe09565b4457e233bec4501.png','Jordan官方 AIR JORDAN 1 MID AJ1男子运动鞋 554724','啊啊啊啊',20,25),(27,'http://love.q05.cc/image/tmp_d811d1623b4f10a007d2aa140afc3348.jpg','爆款aj鞋子','爆款aj鞋子',20,26);
/*!40000 ALTER TABLE `album_type` ENABLE KEYS */;

#
# Structure for table "album_user"
#

DROP TABLE IF EXISTS `album_user`;
CREATE TABLE `album_user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `session` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

#
# Data for table "album_user"
#

/*!40000 ALTER TABLE `album_user` DISABLE KEYS */;
INSERT INTO `album_user` VALUES (1,'admin','e10adc3949ba59abbe56e057f20f883e','b38fe24c9bb9abfd1d1f9467fb18937c'),(2,'hello','e10adc3949ba59abbe56e057f20f883e','f7bc234da68b47460420a913cb2a48af'),(3,'yiqi','e10adc3949ba59abbe56e057f20f883e','c6fcad240be198a8ecd9ee7e48b85566');
/*!40000 ALTER TABLE `album_user` ENABLE KEYS */;
