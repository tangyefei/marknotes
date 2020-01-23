# Django Use Guides


## install and start a project

- 先安装最新版的python，安装好以后执行 python3 来确认安装成功 https://www.python.org/downloads/
- 安装pip https://pip.pypa.io/en/latest/installing/#installing-with-get-pip-py
- 使用pip安装virtualenv 
    - $ pip install virtualenv
- 进入到项目目录，使用virtualenv激活和配置虚拟环境，https://docs.djangoproject.com/en/2.1/intro/contributing/
  - `source ~/.virtualenvs/djangodev/bin/activate`
- 在虚拟环境下安装  
    - $ pip install Django
- 在python3的环境下执行来判断安装是否成功 
    - >>> import django
    - >>> print(django.get_version())
    - 2.1
- 在项目目录下生成后台代码的目录结构
    - $ django-admin startproject mysite
- 进入后台目录，然后运行一个开发环境的server`
    - $ python3 manage.py runserver

## 