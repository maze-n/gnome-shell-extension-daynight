import os
pwd = os.path.dirname(os.path.realpath(__file__))
os.system("ls /usr/share/themes/ > " + pwd + "/src/themes.txt")