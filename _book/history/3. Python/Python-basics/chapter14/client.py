import socket

s = socket.socket()

host = socket.gethostname()
port = 1234

s.connect((host, port))
s.send('What the fucking thing')
print s.recv(1024)
