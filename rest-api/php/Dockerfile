
FROM php:8.1-fpm-alpine

# Set Environment Variables
ENV DEBIAN_FRONTEND noninteractive
ENV COMPOSER_ALLOW_SUPERUSER 1

# Set working directory
WORKDIR /var/www

# Copy project to workin directory
COPY . /var/www

# Update and download tools and packages
RUN apk update && apk --no-cache add \
    build-base \
    curl \
    zip \
    libzip-dev \
    libpq-dev \
    unzip

# Install the packages to mysql for available environment
RUN  docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable pdo_mysql

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Set user root
USER root

# Set grant permissions
RUN chmod 777 -R /var/www

# Expose port to connect outside
EXPOSE 9000

# Run scripts to install dependencies and up run serve by laravel
ENTRYPOINT [ "sh", "entrypoint.sh" ]