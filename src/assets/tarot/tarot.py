import urllib.request

for n in range(1, 22):
    urllib.request.urlretrieve(f"https://gfx.tarot.com/images/site/decks/8-bit/full_size/{n}.jpg", f"{n}.jpg")

    