def lines(file):
  for line in file: yield line
  yield '\n'

def blocks(file):
  blocks = []
  for line in lines(file):
    if line.strip():
      blocks.append(line)
    elif blocks:
      yield ''.join(blocks).strip()
      blocks = []