from urllib import urlopen
import re
p = re.compile('<a .*? href="(.*?)">(.*?)</a>')
text = urlopen('http://python.org/jobs').read()
#print text
for url, name in p.findall(text):
  print '%s (%s)' % (name, url)
