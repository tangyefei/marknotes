import sys
reload(sys)
sys.setdefaultencoding('utf8')
from urllib import urlopen
from HTMLParser import HTMLParser
ss= set(list([
    "BYVoid https://github.com/BYVoid",
    "JacksonTian https://github.com/JacksonTian",
    "astaxie https://github.com/astaxie",
    "laruence https://github.com/laruence",
    "sofish https://github.com/sofish",
    "JeffreyZhao https://github.com/JeffreyZhao",
    "chenshuo https://github.com/chenshuo",
    "huacnlee https://github.com/huacnlee",
    "lepture https://github.com/lepture",
    "fengmk2 https://github.com/fengmk2",
    "ruanyf https://github.com/ruanyf",
    "RubyLouvre https://github.com/RubyLouvre",
    "wintercn https://github.com/wintercn",
    "daimajia https://github.com/daimajia",
    "chloerei https://github.com/chloerei",
    "rogerwang https://github.com/rogerwang",
    "zcbenz https://github.com/zcbenz",
    "yyx990803 https://github.com/yyx990803",
    "lifesinger https://github.com/lifesinger",
    "BYVoid https://github.com/BYVoid",
    "JacksonTian https://github.com/JacksonTian",
    "astaxie https://github.com/astaxie",
    "laruence https://github.com/laruence",
    "sofish https://github.com/sofish",
    "JeffreyZhao https://github.com/JeffreyZhao",
    "chenshuo https://github.com/chenshuo",
    "huacnlee https://github.com/huacnlee",
    "lepture https://github.com/lepture"
]))
for s in ss:
    print s


class Scraper(HTMLParser):

	in_h3 = False
	in_link = False

	def handle_starttag(self, tag, attrs):
		attrs = dict(attrs)
		if tag == 'strong':
			self.in_h3 = True
		if tag == 'a' and 'href' in attrs:
			self.in_link = True
			self.chunks = []
			self.url = attrs['href']
	def handle_data(self, data):
		if self.in_link:
			self.chunks.append(data)
	def handle_endtag(self, tag):
		if self.in_h3 and self.in_link:
			print '%s (%s)' % (''.join(self.chunks), self.url)
		self.in_link = False
text = urlopen('http://blog.csdn.net/yaoxtao/article/details/38518933').read()
parser = Scraper()
parser.feed(text)
parser.close()
