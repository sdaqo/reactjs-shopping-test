# ReactJS Web-Shop

This is a little web shop written with React. This is mostly a Project to learn ReactJS and web dev

# Setup

This app uses a Rest Api which communicates with a Redis Database that has the RedisJson module loaded. To set up a Redis database look at [this tutorial](https://www.ubuntupit.com/how-to-install-and-configure-redis-on-linux-system/) and to load the Json Module look at this [github repo](https://github.com/RedisJSON/RedisJSON).

After that is done go in api/config.json and specify the redis host and port.

Now to start the Api go in the api directory and type `npm install` followed by `node --experimental-json-modules .`.

Finally to start the actual app go in the root directory and type `npm install --legacy-peer-deps` followed by `npm start`
