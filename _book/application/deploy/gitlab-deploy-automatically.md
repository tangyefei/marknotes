# Use gitlab pi/pc to deploy web applicatin

Assuming our source code hosted on gitlab and we wanna to deploy it on a seperate server, and once you push code to gitlab the server can easily deploy the code's new version. Below is the guide about this: 



## 1. prepare server envs

this include install node, git, nginx on server. You can refer to step1-4 in [how to deplay self's blog](https://github.com/tangyefei/marknotes/blob/master/blog/1.%20how%20to%20deploy%20self's%20blog%20.md)

## 2.[install](https://docs.gitlab.com/runner/install/linux-manually.html) and [registry](https://docs.gitlab.com/runner/register/index.html) gitlab-runner 

note in the registry：

(1) token should been get at below link's "Set up a specific Runner manually" part in 

[https://gitlab.com/${GROUP/PROJECT}/settings/ci_cd#js-runners-settings](https://gitlab.com/${GROUP/PROJECT}/settings/ci_cd#js-runners-settings)

(2) as we set tag `heybuild` in our project's `.gitlab-ci.yml`, we should fill it in the registry step

## 3. install npm and hey, redirect ngninx root


`.gitlab-deploy.sh` would execute `npm install` and `hey dev`, install them ahead: 

```
yum install npm
npm install -g hey-cli
```




Open `/etc/nginx/nginx.conf` and redict root to your build destination

```
root: /srv/marketing/dist; 
```


## 4.commit & deploy manually


You can visit it at [https://gitlab.com/${GROUP/PROJECT}/pipelines](https://gitlab.com/${GROUP/PROJECT}/pipelines)

## 5. other references may help

- [error: RPC failed; result=18, HTTP code = 200](https://stackoverflow.com/questions/17683295/git-bash-error-rpc-failed-result-18-htp-code-200b-1kib-s)
