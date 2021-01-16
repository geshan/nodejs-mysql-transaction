CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sku` char(6) COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL COMMENT 'in cents',
  `quantity` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `sku` (`sku` ASC) VISIBLE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `sales_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `items` text COLLATE utf8_unicode_ci NOT NULL,
  `total` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `product` (`id`, `name`, `sku`, `price`, `quantity`) VALUES
(1, 'Toilet paper 10 pack', 'TP0001', 750, 500),
(2, 'Rice 1 Kg', 'RI0002', 140, 500),
(3, 'Pasta 500 g', 'PA0003', 260, 500),
(4, 'Chicken Breast 1 Kg', 'CB0004', 1200, 500),
(5, 'Hand Sanitizer', 'HS0005', 300, 500);
