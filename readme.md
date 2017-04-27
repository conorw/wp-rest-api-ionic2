# A very simple Ionic 2/3 sample to show how to post to a WP Rest API enabled wordpress site.

## The sample requires a Rest API enabled WP site to be created, running, and have the WP JWT plugin activated (https://en-gb.wordpress.org/plugins/jwt-authentication-for-wp-rest-api/).

Make sure and set your auth key in the wp-config file after activating the plugin, e.g.
```
define('JWT_AUTH_SECRET_KEY', 'your-top-secrect-key')
```

On some servers you will need to enable http auth in your .htaccess file
```
RewriteEngine on

RewriteCond %{HTTP:Authorization} ^(.*)

RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
```

!Remember to change the proxy address in the ionic.config.json file to point towards your own WP site!

For step by step instructions please refer to https://productiveprogrammer.io/wordpress-rest-api-mobile-apps/ 