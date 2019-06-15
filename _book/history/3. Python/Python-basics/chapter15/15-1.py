from urllib import urlopen

import re

p = re.compile('<span class="listing-company-name">\s+<span class="listing-new">.+<\/span>\s+<a href="(.+)">(.+)<\/a>')

text = urlopen('https://www.python.org/jobs/').read()

for link, name in p.findall(text):
    print link, name
