## Usage

Clone rep and go to created dir

```shell
git clone git@github.com:plusbpm/trpd-rest-starter.git
cd trpd-rest-starter
```

Install  packages
```shell
npm install
```

Run development:

```shell
npm run dev
```

Run production:

```shell
npm run start
```

docker-compose control:

```shell
npm run docker_build
npm run docker_up
npm run docker_stop
npm run docker_down
```

## Application environment
	.env.example - default and needed variables
	.env - current variables
	docker/.env.example - environment for docker-compose containers
	heroku/.env.example - environment for heroku deployment

## License

Licensed under [MIT](./LICENSE).