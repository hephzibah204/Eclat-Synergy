with open("locations.html", "rb") as f:
    data = f.read()

# Let's find b' Scotland</h3>'
marker = b' Scotland</h3>'
idx = data.find(marker)
if idx != -1:
    start = idx - 45
    sub = data[start:idx]
    print("Scotland bytes:", list(sub))
    print("Scotland hex:", [hex(b) for b in sub])

# Let's find b' England</h3>'
marker2 = b' England</h3>'
idx2 = data.find(marker2)
if idx2 != -1:
    start2 = idx2 - 45
    sub2 = data[start2:idx2]
    print("England bytes:", list(sub2))
    print("England hex:", [hex(b) for b in sub2])
