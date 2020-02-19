docker run -p 3307:3306 --rm --name events_mysql \
-e MYSQL_ROOT_PASSWORD=topsecret \
-e MYSQL_DATABASE=crud_test_task \
-e MYSQL_USER=crud_test_task \
-e MYSQL_PASSWORD=crud_test_task \
-d mysql:8
