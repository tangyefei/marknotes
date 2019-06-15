import re

source, destination, destination2, id, items = open('source.md'), open('destination.md', 'w'), open('destination2.md', 'w'), 0, []

while True:
    line = source.readline()
    if not line:
        break
    elif re.search(r'^((\#+)\s[^\.].+)', line):
        id = id + 1
        m = re.match(r'^((\#+)\s[^\.].+)', line)
        if m.group(2) and len(m.group(2)):
            destination.write(len(m.group(2)) * '#' + ' <i id="' + str(id) + '">' + re.sub(r'\#+\s(.+)', r'\1</i>' , line))
            items.append(len(m.group(2)) * '--' + ' <a href="#' + str(id) + '">' + re.sub(r'\#+\s(.+)', r'\1</a>' , line))

    else:
        destination.write(line)

for item in items:
    destination2.write(item)

# while True:
#     line = destination.readline()
#     destination2.write(line)

source.close()
destination.close()
# destination2.close()
