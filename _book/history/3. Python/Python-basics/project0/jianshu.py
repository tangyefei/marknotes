
import os, re

# local_names = []
# server_names = []
# for filename in os.listdir(os.path.expanduser("~/Documents/docs/Flask Web Development/images/")):
#     local_names.append(filename)

f, des, count, index = open('image_source.txt'), [], 0, 0
while True:
    line = f.readline()
    if not line:
        break
    elif len(line) > 20:
        des.append(line)
        count = len(des)

f.close()

f, f2= open('temp.md'), open(r'new_temp.md', 'w')

while True:
    line = f.readline()
    if not line:
        break
    elif re.search(r'\!\[.+\]\(.+\.png\)', line):
        # print line
         f2.write(re.sub(r'\!\[.+\]\(.+\.png\)', des[index], line))
         index = index + 1
         # print line
         # print re.sub(r'\!\[.+\]\(.+\.png\)', des[index], line)
    else:
        f2.write(line)

f.close()
f2.close()
