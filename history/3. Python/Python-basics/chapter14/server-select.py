import socket, select

s = socket.socket()

host = socket.gethostname()
port = 1234
s.bind((host, port))

s.listen(5)
inputs = [s]

while True:
  rs, ws, es = select.select(inputs, [], [])
  for r in rs:
    if r is s:
      c, addr = s.accept()
      print 'Got connection from ', addr
    else:
      try:
        data = r.recv(1024)
        disconnected = not data
      except:
        disconnected = True

      if disconnected:
        print r.getpeername(), 'disconnected'
      else:
        print data
