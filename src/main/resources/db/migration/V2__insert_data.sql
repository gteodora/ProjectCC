INSERT INTO `book`(`id`, `name`, `author`) VALUES(NULL, 'Šala', 'Milan Kundera');
INSERT INTO `book`(`id`, `name`, `author`) VALUES(NULL, 'Smrt Ivana Iljiča', 'Lav Nikolajevič Tolstoj');
INSERT INTO `book`(`id`, `name`, `author`) VALUES(NULL, 'Braća Karamazovi', 'Dostojevski');

INSERT INTO `mydb`.`user`(`id`, `username`, `password`, `email`, `name`, `surname`, `create_date`, `salt`)
VALUES(NULL, 'admin', 'admin', 'admin@proba', NULL, NULL, NULL, NULL);
INSERT INTO `mydb`.`user`(`id`, `username`, `password`, `email`, `name`, `surname`, `create_date`, `salt`)
VALUES (NULL, 'username1', 'username1', 'username1@proba', NULL, NULL, NULL, NULL);
INSERT INTO `mydb`.`user`(`id`, `username`, `password`, `email`, `name`, `surname`, `create_date`, `salt`)
VALUES (NULL, 'username2', 'username2', 'username2@proba', NULL, NULL, NULL, NULL);

INSERT INTO `mydb`.`user_read_book`(`user_id`, `book_id`)VALUES(2,1);
INSERT INTO `mydb`.`user_read_book`(`user_id`, `book_id`)VALUES(2,2);
INSERT INTO `mydb`.`user_read_book`(`user_id`, `book_id`)VALUES(2,3);
INSERT INTO `mydb`.`user_read_book`(`user_id`, `book_id`)VALUES(2,4);
INSERT INTO `mydb`.`user_read_book`(`user_id`, `book_id`)VALUES(3,3);
INSERT INTO `mydb`.`user_read_book`(`user_id`, `book_id`)VALUES(3,4);
INSERT INTO `mydb`.`user_read_book`(`user_id`, `book_id`)VALUES(3,5);
INSERT INTO `mydb`.`user_read_book`(`user_id`, `book_id`)VALUES(3,6);