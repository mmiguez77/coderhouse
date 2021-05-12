--
-- Creacion base de datos: `prueba`
--
CREATE DATABASE IF NOT EXISTS `prueba` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `prueba`;

----------------------------------------------------------

--
-- Estructura de tabla `items`
--

DROP TABLE IF EXISTS `items`;
CREATE TABLE IF NOT EXISTS `items` (
  `nombre` varchar(50) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `stock` int unsigned,
  `id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY
);

--
-- Ingreso de datos para la tabla `items`
--

INSERT INTO `items` (`nombre`, `categoria`, `stock`) VALUES
('Fideos', 'Harina', 20),
('Leche', 'Lácteos', 30),
('Crema', 'Lácteos', 15);

SHOW TABLES;
SELECT * FROM `items`;
----------------------------------------------------------

--
-- Eliminar ID 1 para la tabla `items`
--
DELETE FROM items WHERE id=1;

--
-- Modificar Stock ID 2 para la tabla `items`
--

UPDATE `items`   
    SET stock='45'   
    WHERE id=2;
----------------------------------------------------------
SELECT * FROM `items`;


