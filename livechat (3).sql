-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-06-2022 a las 01:03:41
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `livechat`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_messages`
--

CREATE TABLE `tb_messages` (
  `_id` int(11) NOT NULL,
  `mesa_text` text NOT NULL,
  `mesa_from` varchar(100) NOT NULL,
  `mesa_to` varchar(100) NOT NULL,
  `mesa_sendedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `mesa_checked` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tb_messages`
--

INSERT INTO `tb_messages` (`_id`, `mesa_text`, `mesa_from`, `mesa_to`, `mesa_sendedAt`, `mesa_checked`) VALUES
(168, 'Iniciar', '67ac4b06-855e-4db8-8df9-2827587c9abd', '6a9c4064-aed1-4807-b511-32004d1437da', '2022-04-29 11:15:42', 0),
(169, 'Hola Frank un asistente se unirá al chat en breve...', '6a9c4064-aed1-4807-b511-32004d1437da', '67ac4b06-855e-4db8-8df9-2827587c9abd', '2022-04-29 11:15:43', 0),
(170, 'Hola', '67ac4b06-855e-4db8-8df9-2827587c9abd', '6a9c4064-aed1-4807-b511-32004d1437da', '2022-04-29 11:57:16', 0),
(171, 'Hay alguien?', '67ac4b06-855e-4db8-8df9-2827587c9abd', '6a9c4064-aed1-4807-b511-32004d1437da', '2022-04-29 12:24:47', 0),
(172, 'Hola', '6a9c4064-aed1-4807-b511-32004d1437da', '67ac4b06-855e-4db8-8df9-2827587c9abd', '2022-04-29 12:25:05', 0),
(173, 'si', '6a9c4064-aed1-4807-b511-32004d1437da', '67ac4b06-855e-4db8-8df9-2827587c9abd', '2022-04-29 12:25:07', 0),
(174, '<div class=\"kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x c1et5uql ii04i59q\" style=\"overflow-wrap: break-word; white-space: pre-wrap; font-family: &quot;Segoe UI Historic&quot;, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif; color: rgb(5, 5, 5); font-size: 15px; background-color: rgb(255, 255, 255);\"><div dir=\"auto\" style=\"font-family: inherit;\"><span style=\"font-family: inherit;\"><a class=\"oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gpro0wi8 q66pz984 b1v8xokw\" href=\"https://www.facebook.com/hashtag/vacanteslimitadas?__eep__=6&amp;__cft__[0]=AZW94CFgYRL5454RXVCH-auvWP0Pd2SpdD_CLT1QzhILXMvPciZtpR3HXvp58DtDue9gHgXZUuI_4pPzRihqwESVfsEf0QhDX5nS4g69TB3R3GR8dPXC81FTQfVBZx68NQV7sBHEF6f8s0K6SqjthH09u1GUW7dSt-PuYdsgijYOStLOcB-2CYqaF4AzJsMfNT4&amp;__tn__=*NK-R\" role=\"link\" tabindex=\"0\" style=\"cursor: pointer; text-decoration-line: none; outline: none; list-style: none; border-width: 0px; border-style: initial; border-color: initial; touch-action: manipulation; background-color: transparent; text-align: inherit; display: inline; -webkit-tap-highlight-color: transparent; box-sizing: border-box; font-family: inherit;\">#Vacanteslimitadas</a></span></div><div dir=\"auto\" style=\"font-family: inherit;\">Conoce los beneficios de especializarte en “Modelado y Gestión de Proyectos con Metodología BIM” </div><div dir=\"auto\" style=\"font-family: inherit;\">Y obtén mayores oportunidades en tu vida laboral <span class=\"pq6dq46d tbxw36s4 knj5qynh kvgmc6g5 ditlmg2l oygrvhab nvdbi5me sf5mxxl7 gl3lb2sf hhz5lgdu\" style=\"margin-right: 1px; margin-left: 1px; height: 16px; width: 16px; display: inline-flex; vertical-align: middle; font-family: inherit;\"><img height=\"16\" width=\"16\" alt=\"????\" referrerpolicy=\"origin-when-cross-origin\" src=\"https://static.xx.fbcdn.net/images/emoji.php/v9/t6c/1/16/1f4aa.png\" style=\"border: 0px;\"></span><span class=\"pq6dq46d tbxw36s4 knj5qynh kvgmc6g5 ditlmg2l oygrvhab nvdbi5me sf5mxxl7 gl3lb2sf hhz5lgdu\" style=\"margin-right: 1px; margin-left: 1px; height: 16px; width: 16px; display: inline-flex; vertical-align: middle; font-family: inherit;\"><img height=\"16\" width=\"16\" alt=\"????\" referrerpolicy=\"origin-when-cross-origin\" src=\"https://static.xx.fbcdn.net/images/emoji.php/v9/t25/1/16/1f393.png\" style=\"border: 0px;\"></span></div></div><div class=\"cxmmr5t8 oygrvhab hcukyx3x c1et5uql o9v6fnle ii04i59q\" style=\"overflow-wrap: break-word; margin-top: 0.5em; white-space: pre-wrap; font-family: &quot;Segoe UI Historic&quot;, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif; color: rgb(5, 5, 5); font-size: 15px; background-color: rgb(255, 255, 255);\"><div dir=\"auto\" style=\"font-family: inherit;\">Inscríbete <span class=\"pq6dq46d tbxw36s4 knj5qynh kvgmc6g5 ditlmg2l oygrvhab nvdbi5me sf5mxxl7 gl3lb2sf hhz5lgdu\" style=\"margin-right: 1px; margin-left: 1px; height: 16px; width: 16px; display: inline-flex; vertical-align: middle; font-family: inherit;\"><img height=\"16\" width=\"16\" alt=\"➡\" referrerpolicy=\"origin-when-cross-origin\" src=\"https://static.xx.fbcdn.net/images/emoji.php/v9/t9e/1/16/27a1.png\" style=\"border: 0px;\"></span> <span style=\"font-family: inherit;\"><a class=\"oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gpro0wi8 py34i1dx\" href=\"https://bit.ly/Form-MYGP-BIM\" rel=\"nofollow\" role=\"link\" tabindex=\"0\" target=\"_blank\" style=\"cursor: pointer; text-decoration-line: none; outline: none; list-style: none; border-width: 0px; border-style: initial; border-color: initial; touch-action: manipulation; background-color: transparent; text-align: inherit; display: inline; -webkit-tap-highlight-color: transparent; box-sizing: border-box; font-family: inherit;\">https://bit.ly/Form-MYGP-BIM</a></span>   </div><div dir=\"auto\" style=\"font-family: inherit;\">Visita la web <span class=\"pq6dq46d tbxw36s4 knj5qynh kvgmc6g5 ditlmg2l oygrvhab nvdbi5me sf5mxxl7 gl3lb2sf hhz5lgdu\" style=\"margin-right: 1px; margin-left: 1px; height: 16px; width: 16px; display: inline-flex; vertical-align: middle; font-family: inherit;\"><img height=\"16\" width=\"16\" alt=\"➡\" referrerpolicy=\"origin-when-cross-origin\" src=\"https://static.xx.fbcdn.net/images/emoji.php/v9/t9e/1/16/27a1.png\" style=\"border: 0px;\"></span> <span style=\"font-family: inherit;\"><a class=\"oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gpro0wi8 py34i1dx\" href=\"https://bit.ly/EP_MGBIM\" rel=\"nofollow\" role=\"link\" tabindex=\"0\" target=\"_blank\" style=\"cursor: pointer; text-decoration-line: none; outline: none; list-style: none; border-width: 0px; border-style: initial; border-color: initial; touch-action: manipulation; background-color: transparent; text-align: inherit; display: inline; -webkit-tap-highlight-color: transparent; box-sizing: border-box; font-family: inherit;\">https://bit.ly/EP_MGBIM</a></span> </div><div dir=\"auto\" style=\"font-family: inherit;\">Resolvemos todas tus dudas por WhatsApp <span class=\"pq6dq46d tbxw36s4 knj5qynh kvgmc6g5 ditlmg2l oygrvhab nvdbi5me sf5mxxl7 gl3lb2sf hhz5lgdu\" style=\"margin-right: 1px; margin-left: 1px; height: 16px; width: 16px; display: inline-flex; vertical-align: middle; font-family: inherit;\"><img height=\"16\" width=\"16\" alt=\"➡\" referrerpolicy=\"origin-when-cross-origin\" src=\"https://static.xx.fbcdn.net/images/emoji.php/v9/t9e/1/16/27a1.png\" style=\"border: 0px;\"></span> <span style=\"font-family: inherit;\"><a class=\"oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gpro0wi8 py34i1dx\" href=\"https://l.facebook.com/l.php?u=http%3A%2F%2Fccipperu.com%2Fw%2FEP-MyGP-BIM&amp;h=AT2OWZaL7tD_s05dt7-N-CKVJZgSn-TYbYDb9saPyzcFevpdq2frSbfWEsIyOgvus6nwKxzbVznVtj0Gp_j9a6WcyNie2KLjKYROkMdynxoitcoOYIfdjEvoj3aY-6BvhGi-ZduTaq2iFbuHCJig&amp;__tn__=-UK-R&amp;c[0]=AT1nv48t0MTmJi6cYkRUzj70KdELIEysvWXafcYoTLe3bLTtVGo8QTKSpd15beYhyspHherPF9KayBzbqKkLNSydYsgSzVv8nOULwJXT1aKDu1dAROxHJcsLFVVvVH7NeZM_8A4no2zqdMlGc_JuMcRMJwlII6wELz2cBIAPRQzTj-Tph61LReNaSVfjJRZSNlVOt_rh\" rel=\"nofollow\" role=\"link\" tabindex=\"0\" target=\"_blank\" style=\"cursor: pointer; text-decoration-line: none; outline: none; list-style: none; border-width: 0px; border-style: initial; border-color: initial; touch-action: manipulation; background-color: transparent; text-align: inherit; display: inline; -webkit-tap-highlight-color: transparent; box-sizing: border-box; font-family: inherit;\">ccipperu.com/w/EP-MyGP-BIM</a></span></div></div>', '6a9c4064-aed1-4807-b511-32004d1437da', '67ac4b06-855e-4db8-8df9-2827587c9abd', '2022-04-29 12:25:12', 0),
(175, 'Iniciar', '6e0164dd-7d4c-435b-96ac-6afabc1e6994', '6a9c4064-aed1-4807-b511-32004d1437da', '2022-06-15 17:32:12', 0),
(176, 'Hola Frank un asistente se unirá al chat en breve...', '6a9c4064-aed1-4807-b511-32004d1437da', '6e0164dd-7d4c-435b-96ac-6afabc1e6994', '2022-06-15 17:32:13', 0),
(177, 'Gracias, estaré a la espera', '6e0164dd-7d4c-435b-96ac-6afabc1e6994', '6a9c4064-aed1-4807-b511-32004d1437da', '2022-06-15 17:32:41', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_resprapid`
--

CREATE TABLE `tb_resprapid` (
  `_id` int(11) NOT NULL,
  `rera_short` varchar(50) NOT NULL,
  `rera_text` text NOT NULL,
  `rera_createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tb_resprapid`
--

INSERT INTO `tb_resprapid` (`_id`, `rera_short`, `rera_text`, `rera_createdAt`) VALUES
(1, '/bienvenido', 'Hola {chat_name}, bienvenido al chat de CCIP, ¿como podemos ayudarte?', '2022-04-12 09:47:20'),
(14, '/bim', '<div class=\"kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x c1et5uql ii04i59q\" style=\"overflow-wrap: break-word; white-space: pre-wrap; font-family: &quot;Segoe UI Historic&quot;, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif; color: rgb(5, 5, 5); font-size: 15px; background-color: rgb(255, 255, 255);\"><div dir=\"auto\" style=\"font-family: inherit;\"><span style=\"font-family: inherit;\"><a class=\"oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gpro0wi8 q66pz984 b1v8xokw\" href=\"https://www.facebook.com/hashtag/vacanteslimitadas?__eep__=6&amp;__cft__[0]=AZW94CFgYRL5454RXVCH-auvWP0Pd2SpdD_CLT1QzhILXMvPciZtpR3HXvp58DtDue9gHgXZUuI_4pPzRihqwESVfsEf0QhDX5nS4g69TB3R3GR8dPXC81FTQfVBZx68NQV7sBHEF6f8s0K6SqjthH09u1GUW7dSt-PuYdsgijYOStLOcB-2CYqaF4AzJsMfNT4&amp;__tn__=*NK-R\" role=\"link\" tabindex=\"0\" style=\"cursor: pointer; text-decoration-line: none; outline: none; list-style: none; border-width: 0px; border-style: initial; border-color: initial; touch-action: manipulation; background-color: transparent; text-align: inherit; display: inline; -webkit-tap-highlight-color: transparent; box-sizing: border-box; font-family: inherit;\">#Vacanteslimitadas</a></span></div><div dir=\"auto\" style=\"font-family: inherit;\">Conoce los beneficios de especializarte en “Modelado y Gestión de Proyectos con Metodología BIM” </div><div dir=\"auto\" style=\"font-family: inherit;\">Y obtén mayores oportunidades en tu vida laboral <span class=\"pq6dq46d tbxw36s4 knj5qynh kvgmc6g5 ditlmg2l oygrvhab nvdbi5me sf5mxxl7 gl3lb2sf hhz5lgdu\" style=\"margin-right: 1px; margin-left: 1px; height: 16px; width: 16px; display: inline-flex; vertical-align: middle; font-family: inherit;\"><img height=\"16\" width=\"16\" alt=\"????\" referrerpolicy=\"origin-when-cross-origin\" src=\"https://static.xx.fbcdn.net/images/emoji.php/v9/t6c/1/16/1f4aa.png\" style=\"border: 0px;\"></span><span class=\"pq6dq46d tbxw36s4 knj5qynh kvgmc6g5 ditlmg2l oygrvhab nvdbi5me sf5mxxl7 gl3lb2sf hhz5lgdu\" style=\"margin-right: 1px; margin-left: 1px; height: 16px; width: 16px; display: inline-flex; vertical-align: middle; font-family: inherit;\"><img height=\"16\" width=\"16\" alt=\"????\" referrerpolicy=\"origin-when-cross-origin\" src=\"https://static.xx.fbcdn.net/images/emoji.php/v9/t25/1/16/1f393.png\" style=\"border: 0px;\"></span></div></div><div class=\"cxmmr5t8 oygrvhab hcukyx3x c1et5uql o9v6fnle ii04i59q\" style=\"overflow-wrap: break-word; margin-top: 0.5em; white-space: pre-wrap; font-family: &quot;Segoe UI Historic&quot;, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif; color: rgb(5, 5, 5); font-size: 15px; background-color: rgb(255, 255, 255);\"><div dir=\"auto\" style=\"font-family: inherit;\">Inscríbete <span class=\"pq6dq46d tbxw36s4 knj5qynh kvgmc6g5 ditlmg2l oygrvhab nvdbi5me sf5mxxl7 gl3lb2sf hhz5lgdu\" style=\"margin-right: 1px; margin-left: 1px; height: 16px; width: 16px; display: inline-flex; vertical-align: middle; font-family: inherit;\"><img height=\"16\" width=\"16\" alt=\"➡\" referrerpolicy=\"origin-when-cross-origin\" src=\"https://static.xx.fbcdn.net/images/emoji.php/v9/t9e/1/16/27a1.png\" style=\"border: 0px;\"></span> <span style=\"font-family: inherit;\"><a class=\"oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gpro0wi8 py34i1dx\" href=\"https://bit.ly/Form-MYGP-BIM\" rel=\"nofollow\" role=\"link\" tabindex=\"0\" target=\"_blank\" style=\"cursor: pointer; text-decoration-line: none; outline: none; list-style: none; border-width: 0px; border-style: initial; border-color: initial; touch-action: manipulation; background-color: transparent; text-align: inherit; display: inline; -webkit-tap-highlight-color: transparent; box-sizing: border-box; font-family: inherit;\">https://bit.ly/Form-MYGP-BIM</a></span>   </div><div dir=\"auto\" style=\"font-family: inherit;\">Visita la web <span class=\"pq6dq46d tbxw36s4 knj5qynh kvgmc6g5 ditlmg2l oygrvhab nvdbi5me sf5mxxl7 gl3lb2sf hhz5lgdu\" style=\"margin-right: 1px; margin-left: 1px; height: 16px; width: 16px; display: inline-flex; vertical-align: middle; font-family: inherit;\"><img height=\"16\" width=\"16\" alt=\"➡\" referrerpolicy=\"origin-when-cross-origin\" src=\"https://static.xx.fbcdn.net/images/emoji.php/v9/t9e/1/16/27a1.png\" style=\"border: 0px;\"></span> <span style=\"font-family: inherit;\"><a class=\"oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gpro0wi8 py34i1dx\" href=\"https://bit.ly/EP_MGBIM\" rel=\"nofollow\" role=\"link\" tabindex=\"0\" target=\"_blank\" style=\"cursor: pointer; text-decoration-line: none; outline: none; list-style: none; border-width: 0px; border-style: initial; border-color: initial; touch-action: manipulation; background-color: transparent; text-align: inherit; display: inline; -webkit-tap-highlight-color: transparent; box-sizing: border-box; font-family: inherit;\">https://bit.ly/EP_MGBIM</a></span> </div><div dir=\"auto\" style=\"font-family: inherit;\">Resolvemos todas tus dudas por WhatsApp <span class=\"pq6dq46d tbxw36s4 knj5qynh kvgmc6g5 ditlmg2l oygrvhab nvdbi5me sf5mxxl7 gl3lb2sf hhz5lgdu\" style=\"margin-right: 1px; margin-left: 1px; height: 16px; width: 16px; display: inline-flex; vertical-align: middle; font-family: inherit;\"><img height=\"16\" width=\"16\" alt=\"➡\" referrerpolicy=\"origin-when-cross-origin\" src=\"https://static.xx.fbcdn.net/images/emoji.php/v9/t9e/1/16/27a1.png\" style=\"border: 0px;\"></span> <span style=\"font-family: inherit;\"><a class=\"oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gpro0wi8 py34i1dx\" href=\"https://l.facebook.com/l.php?u=http%3A%2F%2Fccipperu.com%2Fw%2FEP-MyGP-BIM&amp;h=AT2OWZaL7tD_s05dt7-N-CKVJZgSn-TYbYDb9saPyzcFevpdq2frSbfWEsIyOgvus6nwKxzbVznVtj0Gp_j9a6WcyNie2KLjKYROkMdynxoitcoOYIfdjEvoj3aY-6BvhGi-ZduTaq2iFbuHCJig&amp;__tn__=-UK-R&amp;c[0]=AT1nv48t0MTmJi6cYkRUzj70KdELIEysvWXafcYoTLe3bLTtVGo8QTKSpd15beYhyspHherPF9KayBzbqKkLNSydYsgSzVv8nOULwJXT1aKDu1dAROxHJcsLFVVvVH7NeZM_8A4no2zqdMlGc_JuMcRMJwlII6wELz2cBIAPRQzTj-Tph61LReNaSVfjJRZSNlVOt_rh\" rel=\"nofollow\" role=\"link\" tabindex=\"0\" target=\"_blank\" style=\"cursor: pointer; text-decoration-line: none; outline: none; list-style: none; border-width: 0px; border-style: initial; border-color: initial; touch-action: manipulation; background-color: transparent; text-align: inherit; display: inline; -webkit-tap-highlight-color: transparent; box-sizing: border-box; font-family: inherit;\">ccipperu.com/w/EP-MyGP-BIM</a></span></div></div>', '2022-04-28 15:18:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_schedule`
--

CREATE TABLE `tb_schedule` (
  `_id` int(11) NOT NULL,
  `sche_day` varchar(15) NOT NULL,
  `sche_open` time NOT NULL,
  `sche_close` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tb_schedule`
--

INSERT INTO `tb_schedule` (`_id`, `sche_day`, `sche_open`, `sche_close`) VALUES
(1, 'Lunes', '09:00:00', '22:00:00'),
(2, 'Martes', '10:00:00', '22:00:00'),
(3, 'Miércoles', '10:00:00', '22:00:00'),
(4, 'Jueves', '10:00:00', '22:00:00'),
(5, 'Viernes', '10:00:00', '22:00:00'),
(6, 'Sábado', '10:00:00', '16:00:00'),
(7, 'Domingo', '10:00:00', '13:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_users`
--

CREATE TABLE `tb_users` (
  `_id` varchar(100) NOT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `user_country` varchar(100) DEFAULT '--',
  `user_city` varchar(100) DEFAULT '--',
  `user_phone` varchar(20) DEFAULT '--',
  `user_password` varchar(100) DEFAULT NULL,
  `user_cryptPassword` varchar(100) DEFAULT NULL,
  `user_online` tinyint(1) NOT NULL DEFAULT 1,
  `user_account` tinyint(1) NOT NULL DEFAULT 0,
  `user_createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tb_users`
--

INSERT INTO `tb_users` (`_id`, `user_email`, `user_name`, `user_country`, `user_city`, `user_phone`, `user_password`, `user_cryptPassword`, `user_online`, `user_account`, `user_createdAt`) VALUES
('67ac4b06-855e-4db8-8df9-2827587c9abd', 'fkuribe@gmail.com', 'Frank', '--', '--', '--', NULL, NULL, 0, 0, '2022-04-29 11:15:40'),
('6a9c4064-aed1-4807-b511-32004d1437da', 'admin@gmail.com', 'Admin', '--', '--', '--', '1234', '$2b$10$YAOVIazcUCwe12AplJjD0uMe0fjQQf9u/3/USgF4GtM1RGoEyU/4y', 0, 1, '2022-04-28 14:19:34'),
('6e0164dd-7d4c-435b-96ac-6afabc1e6994', 'fkuribe@gmail.com', 'Frank', '--', '--', '--', NULL, NULL, 0, 0, '2022-06-15 17:32:10');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_messages`
--
ALTER TABLE `tb_messages`
  ADD PRIMARY KEY (`_id`);

--
-- Indices de la tabla `tb_resprapid`
--
ALTER TABLE `tb_resprapid`
  ADD PRIMARY KEY (`_id`);

--
-- Indices de la tabla `tb_schedule`
--
ALTER TABLE `tb_schedule`
  ADD PRIMARY KEY (`_id`);

--
-- Indices de la tabla `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_messages`
--
ALTER TABLE `tb_messages`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;

--
-- AUTO_INCREMENT de la tabla `tb_resprapid`
--
ALTER TABLE `tb_resprapid`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `tb_schedule`
--
ALTER TABLE `tb_schedule`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
