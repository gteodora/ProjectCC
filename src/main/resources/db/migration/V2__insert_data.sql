INSERT INTO `book`(`id`, `name`, `author`) VALUES(NULL, 'Tako je govorio Zaratustra', 'Fridrih Niče');
INSERT INTO `book`(`id`, `name`, `author`) VALUES(NULL, 'Hazarski rečnik', 'Milorad Pavić');
INSERT INTO `book`(`id`, `name`, `author`) VALUES(NULL, 'Besnilo', 'Borislav Pavić');
INSERT INTO `book`(`id`, `name`, `author`) VALUES(NULL, 'Šala', 'Milan Kundera');
INSERT INTO `book`(`id`, `name`, `author`) VALUES(NULL, 'Smrt Ivana Iljiča', 'Lav Nikolajevič Tolstoj');
INSERT INTO `book`(`id`, `name`, `author`) VALUES(NULL, 'Braća Karamazovi', 'Dostojevski');

INSERT INTO `mydb`.`user`(`id`, `username`, `password`, `email`, `name`, `surname`, `create_date`)
VALUES(NULL, 'admin', '$2y$10$msNbs0VNL3DxDd3tDdi/NO81DZ8KmoYIXGr1oB9WvhqxmxThD0a2C', 'admin@proba', 'name', 'surname ', NULL);
INSERT INTO `mydb`.`user`(`id`, `username`, `password`, `email`, `name`, `surname`, `create_date`)
VALUES (NULL, 'username1', '$2y$10$d5XCE6Tx46M9OZjWbF6hv.jACgjdbd1QIHKKnyQpvX0r5Yt1kOIPa', 'username1@proba', 'name1', 'surname1', NULL);
INSERT INTO `mydb`.`user`(`id`, `username`, `password`, `email`, `name`, `surname`, `create_date`)
VALUES (NULL, 'username2', '$2y$10$uK8myZaQjuhI5y4KWiG48.foDNI55vj7e6tiGxM2CW1GNWEW131Cq', 'username2@proba', 'name', 'surname', NULL);

INSERT INTO `mydb`.`user_read_book`(`user_id`, `book_id`)VALUES(2,1);
INSERT INTO `mydb`.`user_read_book`(`user_id`, `book_id`)VALUES(2,2);
INSERT INTO `mydb`.`user_read_book`(`user_id`, `book_id`)VALUES(2,3);
INSERT INTO `mydb`.`user_read_book`(`user_id`, `book_id`)VALUES(2,4);
INSERT INTO `mydb`.`user_read_book`(`user_id`, `book_id`)VALUES(3,3);
INSERT INTO `mydb`.`user_read_book`(`user_id`, `book_id`)VALUES(3,4);
INSERT INTO `mydb`.`user_read_book`(`user_id`, `book_id`)VALUES(3,5);
INSERT INTO `mydb`.`user_read_book`(`user_id`, `book_id`)VALUES(3,6);

INSERT INTO `role`(`id`, `name`) VALUES(NULL, 'ADMIN');
INSERT INTO `role`(`id`, `name`) VALUES(NULL, 'USER');

INSERT INTO `mydb`.`user_has_role`(`user_id`, `role_id`)VALUES(1,1);
INSERT INTO `mydb`.`user_has_role`(`user_id`, `role_id`)VALUES(2,2);
INSERT INTO `mydb`.`user_has_role`(`user_id`, `role_id`)VALUES(3,2);
