echo "Waiting for database..."
echo DB_NAME: ${DB_DATABASE}
echo DB_HOST: ${DB_HOST}
echo DB_PORT: ${DB_PORT}
while ! nc -z ${DB_HOST} ${DB_PORT}; do sleep 1; done
echo "Connected to database."
composer install && 
php artisan key:generate &&
php artisan migrate &&
php artisan passport:install &&
php artisan db:seed &&
php artisan serve --host=0.0.0.0 --port=9000