# Samsung Advanced Material Labs (samsung-aml)
## Progress tracker app (React, Python, Flask, Postgres, MongoDB)

_Unfortunately, docker is giving a couple of issues that still need some fixing. The project can be run locally by following these instructions:_

--- 

> ### _INSTRUCTIONS_

- Run Mongodb (default port: `27017`)
- Run Postgres (default port: `5432`)
- Clone this repo (`git clone <ssh.url.git>`)
  
**_Backend (Flask server):_**
- Create a virtual env (ideally Anaconda), activate it  <br/>
  `conda create --name <env_name>`  <br/>
  `conda activate <env_name>`
- `pip install -r requirements.txt`
- `<path/to/conda/venv> flask_server/server.py`

**_Frontend (React):_**
- `cd client/`
- `npm install`
- `npm start`
(in case of dependency issues, try `npm install --legacy-peers-deps`, happens for `@material-ui with React-18)

---
---

> ### _DOCKER_
- This needs some fixing.
- Managed to connect all 4 containers, run my app, but postgres was using the local server and not an image from docker (unlike mongodb)
- (Would like to demo this if possible)

> ### _CHANGES FOR RUNNING DOCKER (AND NOT LOCALLY):_
- change proxy in `package.json` <br/>
  (`http://localhost:5000` -> `http://<python_docker_container_name>:5000)`
- change flask server port  <br/>
  (`127.0.0.1` -> `0.0.0.0`)
- change mongodb uri  <br/>
  (`mongodb://localhost:27017/` -> `mongodb://<mongodb_docker_container_name>:27017/`)
- change postgres hostname  <br/>
  (`localhost` -> `host.docker.internal`)
- Check docker.yml & individual DockerFile(s)

> ### _DOCKER COMMANDS_
_Start docker:_  <br/>  
`docker-compose up -d`

_Run a container:_  <br/>  
`docker exec -it <container_name> bash`

_Build an image:_  <br/>  
`docker build -t <python_image> .`

_container from image:_  <br/>  
`docker run -dp 127.0.0.1:5000:5000 <image_name>`

_Stop docker:_  <br/>  
`docker-compose down
docker-compose stop`

_Restart after changes to yaml:_  <br/>  
`docker-compose down
docker-compose up -d`


---
---

> ### _PERSONAL NOTES DURING DEV_
---

### _DOCKER_
1. Install docker, dependency: >softwareupdate --install-rosetta
2. Create docker-compose.yml, define containers 
-- mounting remote folder --
3. (Install sshfs,) modify mongodb container in yml file to mount a remote folder into the container  <br/>
    volumes:  <br/>
      - /path/to/remote/folder:/path/to/mount/inside/container  <br/>
    (Restart docker if changes need to be reflected now)
-- pymatgen updates locally & reflects in container without restarting
4. Create a Dockerfile with commands to install pymatgen (& a script to run) -- This might not be required if we specify in the yaml
5. Modify Python container, provide path to local script if need be
-- linux commands
6. The official Python images typically come with a basic Linux environment.
7. ssh, scp come with python:3.9 image, install vim
8. Added these installations into the Docker-file just in case (for some reason vim doesn't work on macos; ssh, scp works)

---

### _MONGODB_
_Start service:_  <br/>  
`brew services start mongodb/brew/mongodb-community`
_Stop service:_  <br/>  
`brew services start mongodb/brew/mongodb-community`

---

### _POSTGRES_
Run through desktop app or terminal

---

### _REACT_
- Incase of dependency issues: `rm -rf package-lock.json node_modules | npm install | npm start`
- Mac runs Airplay on one of the ports (8000?). Make sure to shut Airplay receiver service (system settings)
