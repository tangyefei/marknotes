# Git Useful Command Guide


## commit forgotten file

```
$ git commit -m 'initial commit'
$ git add forgotten_file
$ git commit --amend
```
## revert comit and add to another branch

Imagine you commit file on wrong branch(staging) but not push yet

```
$ git log --oneline; // find the commit hash is LAST_COMMIT_HASH
$ git checkout dev
$ git cherry branch LAST_COMMIT_HASH
$ git push
$ git checkout staging
$ git revert LAST_COMMIT_HASH
$ git push // the LAST_COMMIT_HASH would be replaced by a newer has
```

## delete local and remote branch

```
$ git branch -d staging-backup // local
Deleted branch staging-backup (was c1aabf0).

$ git push --delete origin import // remote
To code.aliyun.com:tsp-fe/tsp-web-fe.git
 - [deleted]         import
```



